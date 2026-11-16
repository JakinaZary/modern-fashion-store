const STORAGE_KEYS = {
  cart: "kanto-wear-cart",
  favorites: "kanto-wear-favorites",
  order: "kanto-wear-last-order"
};

export function readStorage(key, fallback) {
  const raw = window.localStorage.getItem(STORAGE_KEYS[key]);
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Impossible de lire les données locales « ${key} ».`, error);
    return fallback;
  }
}

export function writeStorage(key, value) {
  window.localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value));
}

export function clearStorage(key) {
  window.localStorage.removeItem(STORAGE_KEYS[key]);
}
