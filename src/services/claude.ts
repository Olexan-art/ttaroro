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

export async function generatePersonalizedReading(
  cards: CardInput[],
  user: UserInfo,
  spreadLabel = 'Три карти'
): Promise<TarotReading> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY as string | undefined;

  if (!apiKey) {
    throw new Error(
      'API ключ Anthropic не налаштовано. Додайте VITE_ANTHROPIC_API_KEY до файлу .env'
    );
  }

  const birthDate = new Date(user.birthDate);
  const zodiac = getZodiacSign(birthDate);
  const age = new Date().getFullYear() - birthDate.getFullYear();

  const cardsText = cards
    .map(
      (c) =>
        `• ${c.position}: «${c.name}» (${c.isReversed ? 'перевернута' : 'пряма'}) — ${c.meaning}`
    )
    .join('\n');

  const prompt = `Ти — мудрий і досвідчений таролог, що читає карти українською мовою з глибиною, теплотою та інтуїцією.

Людина: ${user.name}, приблизний вік ${age} років, знак зодіаку ${zodiac}.
Її запит / ситуація: ${user.question}

Розклад «${spreadLabel}» (${cards.length} карт${cards.length === 1 ? 'а' : 'и'}):
${cardsText}

Зроби глибоке, щире й персоналізоване трактування цього розкладу. Враховуй:
• характер знаку зодіаку та вік людини;
• конкретне питання або ситуацію;
• взаємодію між картами як єдину розповідь;
• чи карта пряма чи перевернута;
• часовий вектор: минуле → сьогодення → майбутнє.

Відповідай ВИКЛЮЧНО у форматі JSON без будь-яких пояснень поза ним:
{
  "overallTheme": "Загальна тема розкладу — одне ємне речення",
  "cardInterpretations": [
    ${cards.map(c => `{
      "position": "${c.position}",
      "cardName": "${c.name}",
      "interpretation": "Персоналізоване трактування 3–4 речення з урахуванням питання"
    }`).join(',\n    ')}
  ],
  "synthesis": "Як усі карти пов'язані між собою і що говорять про ситуацію загалом — 3–4 речення",
  "advice": "Конкретна порада та напрям дій для ${user.name} — 2–3 речення"
}`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text().catch(() => String(response.status));
    throw new Error(`Помилка API: ${err}`);
  }

  const data = await response.json() as { content: { text: string }[] };
  const text = data.content[0]?.text ?? '';

  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('Не вдалося розпарсити відповідь від AI');

  return JSON.parse(match[0]) as TarotReading;
}
