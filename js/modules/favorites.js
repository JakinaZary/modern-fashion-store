import { readStorage, writeStorage } from "./storage.js";
import { getProduct } from "../data/products.js";

export function getFavorites() {
  const stored = readStorage("favorites", []);
  return Array.isArray(stored) ? stored.filter((id) => typeof id === "string" && getProduct(id)) : [];
}

export function hasFavorite(productId) {
  return getFavorites().includes(productId);
}

export function toggleFavorite(productId) {
  const favorites = getFavorites();
  const exists = favorites.includes(productId);
  const next = exists ? favorites.filter((id) => id !== productId) : [...favorites, productId];
  writeStorage("favorites", next);
  document.dispatchEvent(new CustomEvent("kanto:favorites-updated"));
  return !exists;
}

export function removeFavorite(productId) {
  writeStorage("favorites", getFavorites().filter((id) => id !== productId));
  document.dispatchEvent(new CustomEvent("kanto:favorites-updated"));
}
