import { readStorage } from "../modules/storage.js";
import { formatMoney, escapeHTML } from "../modules/ui.js";

export function initConfirmation() {
  const root = document.querySelector("#confirmation-content");
  root.setAttribute("aria-busy", "false");
  const order = readStorage("order", null);
  if (!order || !order.id || !Array.isArray(order.items)) {
    root.innerHTML = `<div class="confirmation-card"><div class="confirmation-mark" aria-hidden="true">i</div><p class="eyebrow">Aucune commande récente</p><h1>Tout commence par une pièce.</h1><p>Vous n’avez pas encore validé de commande de démonstration.</p><a class="button button-dark" href="shop.html">Retour à la boutique <span aria-hidden="true">→</span></a></div>`;
    return;
  }
  const date = new Date(order.createdAt);
  const readableDate = Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  root.innerHTML = `
    <section class="confirmation-card">
      <div class="confirmation-mark" aria-hidden="true">✓</div>
      <p class="eyebrow">C’est noté — simulation terminée</p>
      <h1>Merci pour votre sélection.</h1>
      <p>Votre commande de démonstration a bien été préparée. Elle n’a pas été transmise à une boutique et aucun paiement n’a été effectué.</p>
      <div class="order-reference">${escapeHTML(order.id)}</div>
      ${readableDate ? `<p>Créée le ${escapeHTML(readableDate)}</p>` : ""}
      <div class="order-summary">
        ${order.items.map((item) => `<p><span>${escapeHTML(item.name)} × ${Number(item.quantity)}${item.size ? ` · ${escapeHTML(item.size)}` : ""}${item.color ? ` · ${escapeHTML(item.color)}` : ""}</span><strong>${formatMoney(Number(item.price) * Number(item.quantity))}</strong></p>`).join("")}
        <p><span>Sous-total</span><strong>${formatMoney(Number(order.subtotal) || 0)}</strong></p>
        <p><span>Livraison</span><strong>${Number(order.shipping) ? formatMoney(Number(order.shipping)) : "Offerte"}</strong></p>
        <p><span><strong>Total de démonstration</strong></span><strong>${formatMoney(Number(order.total) || 0)}</strong></p>
      </div>
      <a class="button button-dark" href="shop.html">Retour à la boutique <span aria-hidden="true">→</span></a>
    </section>`;
}
