import { renderSiteShell, bindSharedInteractions } from "./modules/ui.js";
import { initHome } from "./pages/home.js";
import { initShop } from "./pages/shop.js";
import { initProduct } from "./pages/product.js";
import { initCart } from "./pages/cart.js";
import { initFavorites } from "./pages/favorites.js";
import { initCheckout } from "./pages/checkout.js";
import { initConfirmation } from "./pages/confirmation.js";

renderSiteShell();
bindSharedInteractions();

const pageInitializers = {
  home: initHome,
  shop: initShop,
  product: initProduct,
  cart: initCart,
  favorites: initFavorites,
  checkout: initCheckout,
  confirmation: initConfirmation
};

const initializePage = pageInitializers[document.body.dataset.page];
if (initializePage) initializePage();
