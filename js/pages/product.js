import { getProduct, getCurrentPrice, products } from "../data/products.js";
import { addToCart } from "../modules/cart.js";
import { renderProductGrid, formatMoney, escapeHTML, showToast } from "../modules/ui.js";
import { toggleFavorite, hasFavorite } from "../modules/favorites.js";

const colorValues = {
  "Noir": "#222222", "Blanc": "#fff", "Écru": "#eee7da", "Ivoire": "#eee7da",
  "Terracotta": "#b86f54", "Sable": "#c7b89f", "Beige": "#d8c8ad", "Kaki": "#74765c",
  "Olive": "#6d7050", "Bleu ciel": "#a7c7da", "Bleu marine": "#27354a",
  "Bleu nuit": "#263144", "Bleu": "#6689a3", "Charbon": "#484746", "Brun": "#684a36",
  "Cognac": "#a96f43", "Camel": "#b78b61", "Miel": "#c69856", "Vert sauge": "#8f9a81",
  "Crème": "#e9e1d3", "Gris": "#a3a3a3", "Écaille": "#79523c"
};

function optionButtons(values, name, className = "") {
  if (!values.length) return "";
  return `<div class="variant-group"><div class="variant-heading"><span>${name}</span><span class="selection-hint" data-hint="${name}">À sélectionner</span></div><div class="variant-options">${values.map((value) => `
    <button class="variant-button ${className}" type="button" data-variant="${name.toLowerCase()}" data-value="${escapeHTML(value)}" aria-pressed="false">
      ${name === "Couleur" ? `<span class="color-dot" style="background:${colorValues[value] || "#ddd"}"></span>` : ""}${escapeHTML(value)}
    </button>`).join("")}</div></div>`;
}

function renderDetail(product) {
  const gallery = product.images.map((image, index) => `
    <button type="button" class="gallery-thumb-wrap" data-gallery-image="${escapeHTML(image)}" aria-label="Afficher l’image ${index + 1} de ${escapeHTML(product.name)}">
      <img class="gallery-thumb" src="${escapeHTML(image)}" alt="${escapeHTML(product.name)} — vue ${index + 1}" loading="lazy">
    </button>`).join("");
  return `
    <div class="product-detail">
      <div class="product-gallery">
        <div class="gallery-main"><img id="main-product-image" class="gallery-image" src="${escapeHTML(product.images[0])}" alt="${escapeHTML(product.name)}" fetchpriority="high"></div>${gallery}
      </div>
      <div class="detail-info">
        <p class="eyebrow">${escapeHTML(product.category)} · ${escapeHTML(product.audience)}</p>
        <h1>${escapeHTML(product.name)}</h1>
        <p class="detail-price">${formatMoney(getCurrentPrice(product))}${product.promotion ? `<span class="old-price">${formatMoney(product.price)}</span>` : ""}</p>
        <p class="detail-description">${escapeHTML(product.description)}</p>
        ${optionButtons(product.sizes, "Taille")}
        ${optionButtons(product.colors, "Couleur", "color-button")}
        <div class="variant-group"><div class="variant-heading"><span>Quantité</span></div><div class="quantity-control"><button type="button" data-quantity-step="-1" aria-label="Diminuer la quantité">−</button><output id="detail-quantity">1</output><button type="button" data-quantity-step="1" aria-label="Augmenter la quantité">+</button></div></div>
        <p class="stock-note">${product.stock > 0 ? `Disponibilité indicative : ${product.stock} en stock` : "Indisponible actuellement"}</p>
        <div class="detail-actions"><button class="button button-dark" id="detail-add-cart" type="button" ${product.stock < 1 ? "disabled" : ""}>Ajouter au panier <span aria-hidden="true">→</span></button><button class="button button-outline favorite-toggle${hasFavorite(product.id) ? " is-active" : ""}" type="button" data-favorite-toggle="${escapeHTML(product.id)}" aria-label="Ajouter aux favoris : ${escapeHTML(product.name)}" aria-pressed="${hasFavorite(product.id)}">♡</button></div>
      </div>
    </div>`;
}

export function initProduct() {
  const id = new URLSearchParams(window.location.search).get("id");
  const product = getProduct(id);
  const root = document.querySelector("#product-detail");
  if (!product) {
    root.setAttribute("aria-busy", "false");
    root.innerHTML = `<div class="empty-state"><h2>Cette pièce est introuvable</h2><p>Elle a peut-être quitté la sélection.</p><a class="button button-dark" href="shop.html">Retour à la boutique <span aria-hidden="true">→</span></a></div>`;
    renderProductGrid(document.querySelector("#related-products"), products.slice(0, 4));
    return;
  }
  document.title = `${product.name} — KANTO WEAR`;
  document.querySelector("#breadcrumb-product").textContent = product.name;
  root.innerHTML = renderDetail(product);
  root.setAttribute("aria-busy", "false");
  renderProductGrid(document.querySelector("#related-products"), products.filter((item) => item.id !== product.id && (item.category === product.category || item.audience === product.audience)).slice(0, 4));

  const selected = { taille: "", couleur: "" };
  root.addEventListener("click", (event) => {
    const variant = event.target.closest("[data-variant]");
    if (variant) {
      const name = variant.dataset.variant;
      selected[name] = variant.dataset.value;
      root.querySelectorAll(`[data-variant="${name}"]`).forEach((button) => button.setAttribute("aria-pressed", String(button === variant)));
      root.querySelector(`[data-hint="${name === "taille" ? "Taille" : "Couleur"}"]`).textContent = variant.dataset.value;
      return;
    }
    const step = event.target.closest("[data-quantity-step]");
    if (step) {
      const output = root.querySelector("#detail-quantity");
      output.value = String(Math.max(1, Math.min(product.stock, Number(output.value) + Number(step.dataset.quantityStep))));
      output.textContent = output.value;
      return;
    }
    const imageButton = event.target.closest("[data-gallery-image]");
    if (imageButton) {
      const mainImage = root.querySelector("#main-product-image");
      mainImage.src = imageButton.dataset.galleryImage;
      mainImage.alt = `${product.name} — détail`;
    }
  });
  root.querySelector("#detail-add-cart")?.addEventListener("click", () => {
    if (product.sizes.length && !selected.taille) return showToast("Veuillez sélectionner une taille.", "error");
    if (product.colors.length && !selected.couleur) return showToast("Veuillez sélectionner une couleur.", "error");
    addToCart(product, { size: selected.taille, color: selected.couleur, quantity: Number(root.querySelector("#detail-quantity").value) });
    showToast(`${product.name} a été ajouté à votre panier.`);
  });
}
