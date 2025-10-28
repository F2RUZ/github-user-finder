const CACHE_PREFIX = "github_finder_cache_";
const CACHE_EXPIRY_MS = 60 * 60 * 1000; // 1 soat

export const getCache = (key) => {
  try {
    const item = localStorage.getItem(CACHE_PREFIX + key);
    if (!item) return null;

    const { data, timestamp } = JSON.parse(item);
    const now = Date.now();

    if (now - timestamp > CACHE_EXPIRY_MS) {
      localStorage.removeItem(CACHE_PREFIX + key); // Muddat tugagan
      return null;
    }

    return data;
  } catch (error) {
    console.error("Cache olishda xato:", error);
    return null;
  }
};

export const setCache = (key, data) => {
  try {
    const item = JSON.stringify({
      data,
      timestamp: Date.now(),
    });
    localStorage.setItem(CACHE_PREFIX + key, item);
  } catch (error) {
    console.error("Cache saqlashda xato:", error);
  }
};
