import { getProduct, getCurrentPrice } from "../data/products.js";
import { readStorage, writeStorage } from "./storage.js";

function lineKey(productId, size = "", color = "") {
  return `${productId}::${size}::${color}`;
}

export function getCart() {
  const stored = readStorage("cart", []);
  return Array.isArray(stored) ? stored.filter((item) => item && getProduct(item.productId) && Number.isInteger(item.quantity) && item.quantity > 0) : [];
}

function saveCart(cart) {
  writeStorage("cart", cart);
  document.dispatchEvent(new CustomEvent("kanto:cart-updated"));
}

export function addToCart(product, { size = "", color = "", quantity = 1 } = {}) {
  const cart = getCart();
  const key = lineKey(product.id, size, color);
  const existing = cart.find((item) => item.key === key);
  const amount = Math.max(1, Math.min(Number(quantity) || 1, product.stock));
  if (existing) existing.quantity = Math.min(existing.quantity + amount, product.stock);
  else cart.push({ key, productId: product.id, size, color, quantity: amount });
  saveCart(cart);
}

export function updateCartQuantity(key, quantity) {
  const cart = getCart();
  const item = cart.find((line) => line.key === key);
  if (!item) return;
  const product = getProduct(item.productId);
  const amount = Math.min(product.stock, Math.max(1, Number(quantity) || 1));
  item.quantity = amount;
  saveCart(cart);
}

export function removeFromCart(key) {
  saveCart(getCart().filter((item) => item.key !== key));
}

export function clearCart() {
  saveCart([]);
}

export function getCartTotals(cart = getCart()) {
  const subtotal = cart.reduce((total, item) => {
    const product = getProduct(item.productId);
    return total + getCurrentPrice(product) * item.quantity;
  }, 0);
  const shipping = subtotal === 0 || subtotal >= 300000 ? 0 : 15000;
  return { subtotal, shipping, total: subtotal + shipping };
}

export function getCartCount() {
  return getCart().reduce((total, item) => total + item.quantity, 0);
}
