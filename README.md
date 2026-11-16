# KANTO WEAR

Boutique de vêtements de démonstration pour Madagascar, développée en HTML5, CSS3 et JavaScript ES modules. Les produits sont des données locales et le panier ainsi que les favoris sont conservés dans le navigateur.

## Lancer le site

Les modules ES doivent être servis via HTTP(S), et non ouverts directement avec `file://`.

Depuis le dossier du projet, lancez par exemple :

```bash
python -m http.server 8000
```

Puis ouvrez `http://localhost:8000`. Le projet peut aussi être publié tel quel sur un hébergement statique (Netlify ou GitHub Pages).

## Pages

- `index.html` — accueil et sélections éditoriales
- `pages/shop.html` — catalogue, recherche, filtres et tri
- `pages/product.html?id=tee-soleil` — fiche produit, galerie et variantes
- `pages/cart.html` — panier avec quantités et variantes
- `pages/favorites.html` — favoris enregistrés
- `pages/checkout.html` — formulaire de commande de démonstration
- `pages/confirmation.html` — récapitulatif fictif

## Fonctionnalités

- 24 produits de démonstration avec tailles, couleurs, disponibilités et promotions éventuelles.
- Recherche et filtres par catégorie et prix, tri par nouveauté ou prix.
- Panier identifié par produit, taille et couleur, avec calcul des montants en ariary.
- Favoris et panier conservés dans `localStorage`.
- Validation de formulaire côté navigateur et confirmation fictive.
- Mise en page responsive et navigation mobile accessible au clavier.

Les photos et les polices sont chargées depuis Unsplash et Google Fonts ; une connexion internet est nécessaire pour ces ressources. Une image produit indisponible reçoit un fallback visuel. Le site reste une démonstration : il n’y a ni backend, ni transmission des formulaires, ni transaction réelle, ni collecte de coordonnées bancaires. Le formulaire de commande n’enregistre pas les coordonnées client.
