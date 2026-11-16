import { getProduct, getCurrentPrice } from "../data/products.js";
import { getCartCount } from "./cart.js";
import { getFavorites, hasFavorite, toggleFavorite } from "./favorites.js";

export function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

export function formatMoney(amount) {
  return `${new Intl.NumberFormat("fr-FR").format(amount)} Ar`;
}

export function isNestedPage() {
  return window.location.pathname.includes("/pages/");
}

export function pageURL(file) {
  return isNestedPage() ? file : `pages/${file}`;
}

export function productURL(id) {
  return `${pageURL("product.html")}?id=${encodeURIComponent(id)}`;
}

function icon(name) {
  const paths = {
    search: '<circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"></path>',
    bag: '<path d="M5 8h14l1 13H4L5 8Z"></path><path d="M9 8V6a3 3 0 0 1 6 0v2"></path>'
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
}

export function renderSiteShell() {
  const header = document.querySelector("#site-header");
  const footer = document.querySelector("#site-footer");
  if (!header || !footer) return;
  const home = isNestedPage() ? "../index.html" : "index.html";
  header.innerHTML = `
    <div class="promo-bar">Une nouvelle saison, un nouveau regard — livraison offerte dès 300 000 Ar</div>
    <header class="site-header">
      <div class="page-width nav-inner">
        <button class="menu-toggle" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="primary-nav"><span></span><span></span><span></span></button>
        <a class="brand" href="${home}" aria-label="KANTO WEAR, accueil">KANTO WEAR<small>LE STYLE, NATURELLEMENT</small></a>
        <nav class="primary-nav" id="primary-nav" aria-label="Navigation principale">
          <a href="${pageURL("shop.html")}">La boutique</a><a href="${pageURL("shop.html?category=homme")}">Homme</a><a href="${pageURL("shop.html?category=femme")}">Femme</a><a href="${pageURL("shop.html?category=accessoires")}">Accessoires</a>
        </nav>
        <div class="nav-actions">
          <form class="header-search" role="search" aria-label="Rechercher dans la boutique"><label class="sr-only" for="header-search-input">Rechercher un produit</label><input id="header-search-input" name="q" type="search" placeholder="Rechercher"><button type="submit" aria-label="Lancer la recherche">${icon("search")}</button></form>
          <a href="${pageURL("favorites.html")}" aria-label="Favoris"><span class="action-label">Favoris</span>${icon("heart")}<span class="count-badge" id="favorite-count">0</span></a>
          <a href="${pageURL("cart.html")}" aria-label="Panier"><span class="action-label">Panier</span>${icon("bag")}<span class="count-badge" id="cart-count">0</span></a>
        </div>
      </div>
    </header>`;
  footer.innerHTML = `
    <footer class="site-footer">
      <div class="page-width">
        <div class="footer-top">
          <div><a class="brand footer-brand" href="${home}">KANTO WEAR<small>LE STYLE, NATURELLEMENT</small></a><p class="footer-about">Une sélection de vêtements et d'essentiels choisis pour vous accompagner, ici à Madagascar.</p></div>
          <div class="footer-column"><h2>Explorer</h2><a href="${pageURL("shop.html")}">La boutique</a><a href="${pageURL("shop.html?sort=newest")}">Nouveautés</a><a href="${pageURL("shop.html?category=femme")}">Collection femme</a><a href="${pageURL("shop.html?category=homme")}">Collection homme</a></div>
          <div class="footer-column"><h2>Votre espace</h2><a href="${pageURL("favorites.html")}">Vos favoris</a><a href="${pageURL("cart.html")}">Votre panier</a><a href="${pageURL("checkout.html")}">Commande démo</a></div>
          <div class="footer-column"><h2>À propos</h2><p>Une boutique de démonstration portfolio.</p><p>Aucun achat ni paiement réel.</p><a href="${pageURL("shop.html")}">Découvrir KANTO →</a></div>
        </div>
        <div class="footer-bottom"><span>© ${new Date().getFullYear()} KANTO WEAR · Madagascar</span><span>Projet de démonstration — toutes les commandes sont fictives.</span></div>
      </div>
    </footer>`;
  updateHeaderCounts();
  document.querySelector(".menu-toggle")?.addEventListener("click", (event) => {
    const button = event.currentTarget;
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    button.setAttribute("aria-label", expanded ? "Ouvrir le menu" : "Fermer le menu");
    document.querySelector("#primary-nav")?.classList.toggle("is-open", !expanded);
  });
  document.querySelectorAll(".primary-nav a").forEach((link) => link.addEventListener("click", () => {
    document.querySelector(".menu-toggle")?.setAttribute("aria-expanded", "false");
    document.querySelector("#primary-nav")?.classList.remove("is-open");
  }));
  document.querySelector(".header-search")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get("q")?.toString().trim();
    if (query) window.location.href = `${pageURL("shop.html")}?q=${encodeURIComponent(query)}`;
  });
}

export function updateHeaderCounts() {
  const cartCount = document.querySelector("#cart-count");
  const favoriteCount = document.querySelector("#favorite-count");
  if (cartCount) cartCount.textContent = String(getCartCount());
  if (favoriteCount) favoriteCount.textContent = String(getFavorites().length);
}

export function showToast(message, type = "success") {
  const region = document.querySelector("#toast-region");
  if (!region) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.setAttribute("role", "status");
  toast.textContent = message;
  region.append(toast);
  window.setTimeout(() => {
    toast.classList.add("toast-leave");
    window.setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function productBadge(product) {
  if (product.promotion) return `<span class="product-badge">-${escapeHTML(product.promotion)}%</span>`;
  if (product.isNew) return '<span class="product-badge">Nouveau</span>';
  return "";
}

export function renderProductCard(product) {
  const price = getCurrentPrice(product);
  const activeFavorite = hasFavorite(product.id);
  return `
    <article class="product-card">
      <div class="product-media">
        ${productBadge(product)}
        <a href="${productURL(product.id)}" tabindex="-1" aria-hidden="true"><img src="${escapeHTML(product.images[0])}" alt="${escapeHTML(product.name)}" loading="lazy"></a>
        <button class="favorite-toggle${activeFavorite ? " is-active" : ""}" type="button" data-favorite-toggle="${escapeHTML(product.id)}" aria-label="${activeFavorite ? "Retirer des" : "Ajouter aux"} favoris : ${escapeHTML(product.name)}" aria-pressed="${activeFavorite}">${icon("heart")}</button>
      </div>
      <div class="product-info">
        <p class="product-category">${escapeHTML(product.category)} · ${escapeHTML(product.audience)}</p>
        <div class="product-meta"><a class="product-title" href="${productURL(product.id)}">${escapeHTML(product.name)}</a></div>
        <p class="product-price">${formatMoney(price)}${product.promotion ? `<span class="old-price">${formatMoney(product.price)}</span>` : ""}</p>
      </div>
      <a class="button button-dark product-quick-add" href="${productURL(product.id)}">Choisir les options <span aria-hidden="true">→</span></a>
    </article>`;
}

export function renderProductGrid(container, productList, emptyTitle = "Aucun article pour le moment") {
  if (!container) return;
  container.setAttribute("aria-busy", "false");
  container.innerHTML = productList.length
    ? productList.map(renderProductCard).join("")
    : `<div class="empty-state"><h2>${escapeHTML(emptyTitle)}</h2><p>Essayez une autre recherche ou découvrez toute la sélection.</p><a class="button button-dark" href="${pageURL("shop.html")}">Voir la boutique <span aria-hidden="true">→</span></a></div>`;
}

export function bindSharedInteractions() {
  document.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-favorite-toggle]");
    if (!toggle) return;
    const isFavorite = toggleFavorite(toggle.dataset.favoriteToggle);
    toggle.classList.toggle("is-active", isFavorite);
    toggle.setAttribute("aria-pressed", String(isFavorite));
    toggle.setAttribute("aria-label", `${isFavorite ? "Retirer des" : "Ajouter aux"} favoris : ${getProduct(toggle.dataset.favoriteToggle)?.name ?? "produit"}`);
    showToast(isFavorite ? "Ajouté à vos favoris." : "Retiré de vos favoris.");
    updateHeaderCounts();
  });
  document.addEventListener("error", (event) => {
    if (event.target instanceof HTMLImageElement) {
      const image = event.target;
      image.hidden = true;
      if (image.classList.contains("hero-image")) image.closest(".hero")?.classList.add("image-fallback");
      else if (image.classList.contains("cart-thumb")) {
        const fallback = document.createElement("div");
        fallback.className = "cart-thumb image-fallback";
        fallback.setAttribute("role", "img");
        fallback.setAttribute("aria-label", image.alt);
        image.replaceWith(fallback);
      } else image.closest(".product-media, .gallery-main, .gallery-thumb-wrap")?.classList.add("image-fallback");
    }
  }, true);
  document.addEventListener("kanto:cart-updated", updateHeaderCounts);
  document.addEventListener("kanto:favorites-updated", updateHeaderCounts);
}
