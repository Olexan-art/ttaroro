export interface NewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
}

export interface NewsResponse {
  totalArticles: number;
  articles: NewsArticle[];
}

export async function fetchNewsForDate(date: Date): Promise<string> {
  const apiKey = import.meta.env.VITE_GNEWS_API_KEY as string | undefined;

  if (!apiKey) {
    console.warn('GNews API key is not set. Falling back to mock news data.');
    return "Новини недоступні (немає API ключа).";
  }

  // GNews expects dates in ISO 8601 format (YYYY-MM-DDThh:mm:ssZ)
  // Let's create a range for the specific day
  const startOfDay = new Date(date);
  startOfDay.setUTCHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setUTCHours(23, 59, 59, 999);

  const fromDate = startOfDay.toISOString();
  const toDate = endOfDay.toISOString();

  // "World" OR "USA" news to give context
  const query = 'world OR usa';

  try {
    const response = await fetch(
      `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=uk&max=3&from=${fromDate}&to=${toDate}&apikey=${apiKey}`
    );

    if (!response.ok) {
      console.error(`GNews API error: ${response.status}`);
      return "Не вдалося завантажити новини для цієї дати.";
    }

    const data = await response.json() as NewsResponse;

    if (data.articles && data.articles.length > 0) {
      return data.articles.map(article => `- ${article.title}: ${article.description}`).join('\n');
    } else {
      return "Значних новин у цей день не знайдено.";
    }
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return "Помилка завантаження новин.";
  }
}
