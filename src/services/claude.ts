export interface UserInfo {
  name: string;
  birthDate: string;
  question: string;
}

export interface CardReading {
  position: string;
  cardName: string;
  interpretation: string;
}

export interface TarotReading {
  overallTheme: string;
  cardInterpretations: CardReading[];
  synthesis: string;
  advice: string;
}

interface CardInput {
  name: string;
  position: string;
  isReversed: boolean;
  meaning: string;
  desc: string;
}

function getZodiacSign(date: Date): string {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return 'Овен ♈';
  if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return 'Телець ♉';
  if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return 'Близнюки ♊';
  if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return 'Рак ♋';
  if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return 'Лев ♌';
  if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return 'Діва ♍';
  if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return 'Терези ♎';
  if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return 'Скорпіон ♏';
  if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return 'Стрілець ♐';
  if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return 'Козеріг ♑';
  if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return 'Водолій ♒';
  return 'Риби ♓';
}

const MODEL = 'openrouter/free';

export async function generatePersonalizedReading(
  cards: CardInput[],
  user: UserInfo,
  spreadLabel = 'Три карти'
): Promise<TarotReading> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined;

  if (!apiKey) {
    throw new Error(
      'API ключ OpenRouter не налаштовано. Додайте VITE_OPENROUTER_API_KEY до файлу .env'
    );
  }

  const birthDate = new Date(user.birthDate);
  const zodiac = getZodiacSign(birthDate);
  const age = new Date().getFullYear() - birthDate.getFullYear();

  const cardsText = cards
    .map((c) => `${c.position}: ${c.name} (${c.isReversed ? 'перевернута' : 'пряма'}) — ${c.meaning}`)
    .join('\n');

  const positionsList = cards.map((c) => c.position).join(', ');

  const prompt = `Ти — мудрий таролог, що читає карти українською мовою з глибиною та інтуїцією.

Людина: ${user.name}, вік ~${age} років, знак зодіаку ${zodiac}.
Запит: ${user.question}

Розклад "${spreadLabel}":
${cardsText}

Зроби персоналізоване трактування враховуючи знак зодіаку, вік, питання, взаємодію карт та їх положення.

Поверни ТІЛЬКИ JSON (без markdown, без пояснень, без тексту поза JSON):
{"overallTheme":"...","cardInterpretations":[{"position":"...","cardName":"...","interpretation":"..."}],"synthesis":"...","advice":"..."}

Масив cardInterpretations повинен мати ${cards.length} елемент(и) для позицій: ${positionsList}.
Кожен рядок значення — без переносів рядків всередині рядка.`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Mystic Tarot',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2048,
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    const err = await response.text().catch(() => String(response.status));
    throw new Error(`Помилка OpenRouter API: ${err}`);
  }

  const data = await response.json() as { choices: { message: { content: string } }[] };
  let text = data.choices[0]?.message?.content ?? '';

  // strip markdown fences and <think> blocks (DeepSeek etc.)
  text = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '');
  text = text.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();

  return parseReading(text);
}

function extractStr(text: string, key: string): string {
  const m = text.match(new RegExp(`"${key}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*?)"`));
  return m ? m[1].replace(/\\n/g, ' ').replace(/\\"/g, '"') : '';
}

function parseReading(text: string): TarotReading {
  // 1. try standard JSON parse on the first {...} block
  const block = text.match(/\{[\s\S]*\}/)?.[0];
  if (block) {
    try {
      return JSON.parse(block) as TarotReading;
    } catch {
      // fall through to field-by-field extraction
    }
  }

  // 2. extract each field individually with regex — survives broken JSON
  const overallTheme = extractStr(text, 'overallTheme');
  const synthesis    = extractStr(text, 'synthesis');
  const advice       = extractStr(text, 'advice');

  const cardInterpretations: CardReading[] = [];
  const cardRe = /"position"\s*:\s*"([^"]+)"\s*,\s*"cardName"\s*:\s*"([^"]+)"\s*,\s*"interpretation"\s*:\s*"((?:[^"\\]|\\.)*)"/g;
  let m: RegExpExecArray | null;
  while ((m = cardRe.exec(text)) !== null) {
    cardInterpretations.push({
      position: m[1],
      cardName: m[2],
      interpretation: m[3].replace(/\\n/g, ' ').replace(/\\"/g, '"'),
    });
  }

  if (!overallTheme && cardInterpretations.length === 0) {
    throw new Error('Не вдалося розпарсити відповідь від AI');
  }

  return { overallTheme, cardInterpretations, synthesis, advice };
}

export async function chatAboutReading(
  cards: CardInput[],
  user: UserInfo,
  reading: TarotReading,
  conversation: { role: 'user' | 'assistant'; content: string }[]
): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined;

  if (!apiKey) {
    throw new Error(
      'API ключ OpenRouter не налаштовано. Додайте VITE_OPENROUTER_API_KEY до файлу .env'
    );
  }

  const birthDate = new Date(user.birthDate);
  const zodiac = getZodiacSign(birthDate);
  const age = new Date().getFullYear() - birthDate.getFullYear();

  const cardsText = cards
    .map((c) => `${c.position}: ${c.name} (${c.isReversed ? 'перевернута' : 'пряма'})`)
    .join('\n');

  const systemPrompt = `Ти — мудрий таролог. Твоє завдання відповідати на питання користувача ВИКЛЮЧНО щодо його поточного розкладу.
Людина: ${user.name}, вік ~${age} років, знак зодіаку ${zodiac}.
Запит: ${user.question}
Поточні карти:
${cardsText}

Вже надане трактування:
${JSON.stringify(reading, null, 2)}

Відповідай українською мовою. Будь лаконічним, емпатичним і зосереджуйся на поточних картах. Якщо користувач запитує щось, не пов'язане з розкладом, ввічливо поверни його до теми карт. Не використовуй markdown форматування, відповідай звичайним текстом.`;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...conversation
  ];

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Mystic Tarot',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: messages,
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const err = await response.text().catch(() => String(response.status));
    throw new Error(`Помилка OpenRouter API: ${err}`);
  }

  const data = await response.json() as { choices: { message: { content: string } }[] };
  let text = data.choices[0]?.message?.content ?? '';

  text = text.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();

  return text;
}

export async function generateCardOfTheDayReading(
  card: CardInput,
  user: UserInfo,
  newsContext: string,
  timeframeLabel: string
): Promise<{ text: string }> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined;

  if (!apiKey) {
    throw new Error(
      'API ключ OpenRouter не налаштовано. Додайте VITE_OPENROUTER_API_KEY до файлу .env'
    );
  }

  const birthDate = new Date(user.birthDate);
  const zodiac = getZodiacSign(birthDate);

  const prompt = `Ти — мудрий таролог. Прочитай Карту Дня для користувача.
Людина: ${user.name}, знак зодіаку ${zodiac}.
Період: ${timeframeLabel}.

Випала карта: ${card.name} (${card.isReversed ? 'перевернута' : 'пряма'}) — ${card.meaning}

Ось реальні новини та події у світі за цей день:
${newsContext}

Твоє завдання: Зроби красиве, містичне трактування цієї карти для користувача. Обов'язково вплітай у своє трактування надані новини (або їх відсутність), пов'язуючи загальносвітові або американські події з архетипом карти та життям людини.
Наприклад: "Сьогодні, коли у світі відбуваються такі-то події [з новин], твоя карта вказує на те, що...".
Відповідай українською мовою. Не використовуй markdown форматування, відповідай звичайним текстом.`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Mystic Tarot',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1024,
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    const err = await response.text().catch(() => String(response.status));
    throw new Error(`Помилка OpenRouter API: ${err}`);
  }

  const data = await response.json() as { choices: { message: { content: string } }[] };
  let text = data.choices[0]?.message?.content ?? '';
  text = text.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();

  return { text };
}
