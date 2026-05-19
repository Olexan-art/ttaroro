export interface TarotCard {
  id: string;
  name: string;
  nameShort: string;
  type: 'major' | 'minor';
  suit?: string;
  value: string;
  meaning_up: string;
  meaning_rev: string;
  desc: string;
  image: string;
}

export const tarotDeck: TarotCard[] = [
  {
    "id": "ma00",
    "name": "Блазень",
    "nameShort": "ar00",
    "type": "major",
    "value": "0",
    "meaning_up": "Невинність, нові починання, вільний дух",
    "meaning_rev": "Безрозсудність, використання, неуважність",
    "desc": "Молодий чоловік йде до краю обриву, здавалося б, не підозрюючи про небезпеку.",
    "image": "https://upload.wikimedia.org/wikipedia/en/9/90/RWS_Tarot_00_Fool.jpg"
  },
  {
    "id": "ma01",
    "name": "Маг",
    "nameShort": "ar01",
    "type": "major",
    "value": "1",
    "meaning_up": "Сила волі, бажання, творення, прояв",
    "meaning_rev": "Обман, ілюзії, відірваність від реальності",
    "desc": "Маг вказує однією рукою на небо, а іншою на землю, показуючи свій зв'язок між духовним і фізичним світами.",
    "image": "https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg"
  },
  {
    "id": "ma02",
    "name": "Верховна Жриця",
    "nameShort": "ar02",
    "type": "major",
    "value": "2",
    "meaning_up": "Інтуїція, несвідоме, внутрішній голос",
    "meaning_rev": "Втрата центру, втрачений внутрішній голос, пригнічені почуття",
    "desc": "Верховна Жриця сидить між колонами храму Соломона, Боаз і Яхін.",
    "image": "https://upload.wikimedia.org/wikipedia/en/8/88/RWS_Tarot_02_High_Priestess.jpg"
  },
  {
    "id": "ma03",
    "name": "Імператриця",
    "nameShort": "ar03",
    "type": "major",
    "value": "3",
    "meaning_up": "Материнство, родючість, природа",
    "meaning_rev": "Залежність, задуха, порожнеча, настирливість",
    "desc": "Імператриця сидить на троні в оточенні природи, уособлюючи Матір-Землю.",
    "image": "https://upload.wikimedia.org/wikipedia/en/c/c2/RWS_Tarot_03_Empress.jpg"
  },
  {
    "id": "ma04",
    "name": "Імператор",
    "nameShort": "ar04",
    "type": "major",
    "value": "4",
    "meaning_up": "Авторитет, структура, контроль, батьківство",
    "meaning_rev": "Тиранія, жорсткість, холодність",
    "desc": "Імператор сидить на троні, прикрашеному баранами, що символізує владу, авторитет і чоловічу енергію.",
    "image": "https://upload.wikimedia.org/wikipedia/en/c/c3/RWS_Tarot_04_Emperor.jpg"
  },
  {
    "id": "ma05",
    "name": "Ієрофант",
    "nameShort": "ar05",
    "type": "major",
    "value": "5",
    "meaning_up": "Традиції, конформізм, мораль, етика",
    "meaning_rev": "Бунтарство, підривна діяльність, нові підходи",
    "desc": "Ієрофант діє як міст між людством і божественним.",
    "image": "https://upload.wikimedia.org/wikipedia/en/8/8d/RWS_Tarot_05_Hierophant.jpg"
  },
  {
    "id": "ma06",
    "name": "Закохані",
    "nameShort": "ar06",
    "type": "major",
    "value": "6",
    "meaning_up": "Партнерство, подвійність, вибір",
    "meaning_rev": "Втрата рівноваги, однобічність, дисгармонія",
    "desc": "Закохані уособлюють свідомі зв'язки та значущі стосунки.",
    "image": "https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg"
  },
  {
    "id": "ma07",
    "name": "Колісниця",
    "nameShort": "ar07",
    "type": "major",
    "value": "7",
    "meaning_up": "Напрямок, контроль, сила волі",
    "meaning_rev": "Відсутність контролю, відсутність напрямку, агресія",
    "desc": "Колісниця уособлює подолання викликів завдяки рішучості та контролю.",
    "image": "https://upload.wikimedia.org/wikipedia/en/9/9b/RWS_Tarot_07_Chariot.jpg"
  },
  {
    "id": "ma08",
    "name": "Сила",
    "nameShort": "ar08",
    "type": "major",
    "value": "8",
    "meaning_up": "Внутрішня сила, хоробрість, співчуття, зосередженість",
    "meaning_rev": "Сумніви в собі, слабкість, невпевненість",
    "desc": "Сила уособлює приборкання наших внутрішніх пристрастей і тваринних інстинктів.",
    "image": "https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg"
  },
  {
    "id": "ma09",
    "name": "Відлюдник",
    "nameShort": "ar09",
    "type": "major",
    "value": "9",
    "meaning_up": "Споглядання, пошук істини, внутрішнє керівництво",
    "meaning_rev": "Самотність, ізоляція, втрачений шлях",
    "desc": "Відлюдник стоїть один на вершині гори з ліхтарем, що вказує шлях.",
    "image": "https://upload.wikimedia.org/wikipedia/en/4/4d/RWS_Tarot_09_Hermit.jpg"
  },
  {
    "id": "ma10",
    "name": "Колесо Фортуни",
    "nameShort": "ar10",
    "type": "major",
    "value": "10",
    "meaning_up": "Зміни, цикли, неминуча доля",
    "meaning_rev": "Відсутність контролю, чіпляння за контроль, невдача",
    "desc": "Колесо Фортуни нагадує нам, що життя перебуває у стані постійних змін.",
    "image": "https://upload.wikimedia.org/wikipedia/en/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg"
  },
  {
    "id": "ma11",
    "name": "Справедливість",
    "nameShort": "ar11",
    "type": "major",
    "value": "11",
    "meaning_up": "Причина і наслідок, ясність, істина",
    "meaning_rev": "Нечесність, безвідповідальність, несправедливість",
    "desc": "Справедливість уособлює пошук істини та справедливості.",
    "image": "https://upload.wikimedia.org/wikipedia/en/e/e0/RWS_Tarot_11_Justice.jpg"
  },
  {
    "id": "ma12",
    "name": "Повішений",
    "nameShort": "ar12",
    "type": "major",
    "value": "12",
    "meaning_up": "Жертва, звільнення, мучеництво",
    "meaning_rev": "Зупинка, непотрібна жертва, страх жертви",
    "desc": "Повішений висить догори ногами, дивлячись на світ з іншої перспективи.",
    "image": "https://upload.wikimedia.org/wikipedia/en/2/2b/RWS_Tarot_12_Hanged_Man.jpg"
  },
  {
    "id": "ma13",
    "name": "Смерть",
    "nameShort": "ar13",
    "type": "major",
    "value": "13",
    "meaning_up": "Кінець циклу, початки, зміни, метаморфози",
    "meaning_rev": "Страх змін, тримання, застій, розпад",
    "desc": "Смерть уособлює кінець циклу і початок нового.",
    "image": "https://upload.wikimedia.org/wikipedia/en/d/d7/RWS_Tarot_13_Death.jpg"
  },
  {
    "id": "ma14",
    "name": "Помірність",
    "nameShort": "ar14",
    "type": "major",
    "value": "14",
    "meaning_up": "Серединний шлях, терпіння, пошук сенсу",
    "meaning_rev": "Крайнощі, надмірність, відсутність балансу",
    "desc": "Помірність уособлює баланс, поміркованість і терпіння.",
    "image": "https://upload.wikimedia.org/wikipedia/en/f/f8/RWS_Tarot_14_Temperance.jpg"
  },
  {
    "id": "ma15",
    "name": "Диявол",
    "nameShort": "ar15",
    "type": "major",
    "value": "15",
    "meaning_up": "Залежність, матеріалізм, грайливість",
    "meaning_rev": "Свобода, звільнення, відновлення контролю",
    "desc": "Диявол уособлює ілюзії, що прив'язують нас до матеріального світу.",
    "image": "https://upload.wikimedia.org/wikipedia/en/5/55/RWS_Tarot_15_Devil.jpg"
  },
  {
    "id": "ma16",
    "name": "Вежа",
    "nameShort": "ar16",
    "type": "major",
    "value": "16",
    "meaning_up": "Раптовий переворот, зломлена гордість, катастрофа",
    "meaning_rev": "Уникнення катастрофи, відтермінування катастрофи, страх страждань",
    "desc": "Вежа уособлює раптову, руйнівну і деструктивну зміну.",
    "image": "https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg"
  },
  {
    "id": "ma17",
    "name": "Зірка",
    "nameShort": "ar17",
    "type": "major",
    "value": "17",
    "meaning_up": "Надія, віра, омолодження",
    "meaning_rev": "Втрата віри, зневіра, невпевненість",
    "desc": "Зірка уособлює надію, натхнення і відчуття спокою після бурі.",
    "image": "https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_17_Star.jpg"
  },
  {
    "id": "ma18",
    "name": "Місяць",
    "nameShort": "ar18",
    "type": "major",
    "value": "18",
    "meaning_up": "Несвідоме, ілюзії, інтуїція",
    "meaning_rev": "Плутанина, страх, неправильне тлумачення",
    "desc": "Місяць уособлює страхи та ілюзії, але також і глибоку інтуїцію.",
    "image": "https://upload.wikimedia.org/wikipedia/en/7/7f/RWS_Tarot_18_Moon.jpg"
  },
  {
    "id": "ma19",
    "name": "Сонце",
    "nameShort": "ar19",
    "type": "major",
    "value": "19",
    "meaning_up": "Радість, успіх, свято, позитив",
    "meaning_rev": "Негатив, депресія, сум",
    "desc": "Сонце уособлює успіх, радість і реалізацію власних цілей.",
    "image": "https://upload.wikimedia.org/wikipedia/en/1/17/RWS_Tarot_19_Sun.jpg"
  },
  {
    "id": "ma20",
    "name": "Суд",
    "nameShort": "ar20",
    "type": "major",
    "value": "20",
    "meaning_up": "Роздуми, розплата, пробудження",
    "meaning_rev": "Відсутність самоусвідомлення, сумніви, ненависть до себе",
    "desc": "Суд уособлює пробудження і заклик до вищого рівня свідомості.",
    "image": "https://upload.wikimedia.org/wikipedia/en/d/dd/RWS_Tarot_20_Judgement.jpg"
  },
  {
    "id": "ma21",
    "name": "Світ",
    "nameShort": "ar21",
    "type": "major",
    "value": "21",
    "meaning_up": "Здійснення, гармонія, завершення",
    "meaning_rev": "Незавершеність, відсутність закриття",
    "desc": "Світ уособлює успішне завершення циклу.",
    "image": "https://upload.wikimedia.org/wikipedia/en/f/ff/RWS_Tarot_21_World.jpg"
  }
];

export const getRandomCards = (count: number): TarotCard[] => {
  const shuffled = [...tarotDeck].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
