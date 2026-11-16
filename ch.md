# CAHIER DES CHARGES
## Projet : KANTO WEAR — Site E-commerce de vêtements

**Version :** 1.0  
**Type :** Application web E-commerce  
**Technologies :** HTML5, CSS3, JavaScript  
**Objectif :** Projet de portfolio professionnel  
**Marché cible :** Madagascar (démonstration)

---

## 1. Contexte du projet

KANTO WEAR est un projet de boutique en ligne spécialisée dans la vente de vêtements et d'accessoires de mode.

L'application doit proposer une expérience d'achat moderne, intuitive et adaptée aux ordinateurs, tablettes et smartphones.

Dans sa première version, l'application fonctionnera uniquement côté navigateur. Les produits seront fournis par un catalogue JavaScript et les informations temporaires seront sauvegardées avec LocalStorage.

## 2. Objectifs du projet

### Objectif général

Concevoir et développer un site E-commerce de vêtements fonctionnel, responsive et professionnel.

### Objectifs spécifiques

- Créer une interface moderne et attractive.
- Afficher un catalogue de vêtements.
- Permettre la recherche et le filtrage des articles.
- Présenter les détails des produits.
- Gérer un panier d'achat dynamique.
- Permettre une simulation de commande.
- Sauvegarder localement le panier et les favoris.
- Garantir une navigation fluide sur mobile.
- Publier le projet en ligne pour le portfolio.

## 3. Public cible

Le site s'adresse aux personnes souhaitant consulter et acheter des vêtements en ligne.

Deux rôles sont envisagés :

**Visiteur / Client :** consulte les produits, recherche des vêtements, utilise les favoris et prépare une commande.

**Administrateur :** gère les produits, les stocks et les commandes. Cette fonctionnalité sera développée dans une version ultérieure avec un backend.

## 4. Fonctionnalités principales

### F01 — Page d'accueil

La page d'accueil doit contenir :

- Un logo et une barre de navigation.
- Une bannière principale avec un bouton « Découvrir la collection ».
- Une section des catégories.
- Une section « Nouveautés ».
- Une section « Meilleures ventes ».
- Une présentation des avantages de la boutique.
- Un pied de page avec les liens utiles.

### F02 — Catalogue de produits

Le système doit afficher les articles sous forme de cartes comprenant :

- Photo du produit.
- Nom.
- Prix en ariary.
- Catégorie.
- Badge promotionnel éventuel.
- Bouton d'ajout au panier.
- Bouton favoris.

Catégories initiales : T-shirts, chemises, pantalons, robes, vestes, chaussures et accessoires.

### F03 — Recherche et filtres

Le client pourra :

- Rechercher un produit par son nom.
- Filtrer les articles par catégorie.
- Filtrer selon une fourchette de prix.
- Trier par prix croissant ou décroissant.
- Trier par nouveauté.

### F04 — Détail d'un produit

La page de détail devra afficher :

- Plusieurs images.
- Description du vêtement.
- Prix.
- Tailles disponibles (XS, S, M, L, XL).
- Couleurs disponibles.
- Disponibilité indicative.
- Sélecteur de quantité.
- Bouton « Ajouter au panier ».

Une taille et une couleur doivent être sélectionnées avant l'ajout au panier lorsque ces variantes sont requises.

### F05 — Gestion du panier

Le visiteur pourra :

- Ajouter un vêtement.
- Modifier la quantité.
- Supprimer un article.
- Consulter le sous-total.
- Voir le montant total.
- Conserver son panier après actualisation de la page.

Les montants seront calculés automatiquement en JavaScript.

### F06 — Liste de favoris

Le visiteur pourra enregistrer les produits qui l'intéressent, les consulter dans une page dédiée et les retirer des favoris.

La liste sera conservée dans LocalStorage.

### F07 — Simulation de commande

Le site proposera un formulaire de validation de commande contenant :

- Nom du client (données de démonstration).
- Coordonnées fictives de livraison.
- Ville.
- Mode de livraison simulé.
- Récapitulatif de commande.
- Bouton de confirmation.

Après validation, l'application affichera un numéro de commande fictif et une page de confirmation.

**Important :** aucune transaction bancaire réelle, aucun paiement Mobile Money et aucun enregistrement de commande sur un serveur ne seront réalisés dans cette version.

### F08 — Design responsive

Le site devra fonctionner sur :

- Ordinateur.
- Tablette.
- Smartphone.

Le menu de navigation devra s'adapter aux petits écrans.

## 5. Pages à développer

| Page | Fonction |
|---|---|
| Accueil | Présenter la boutique et les collections |
| Boutique | Afficher tous les vêtements |
| Détail produit | Afficher les informations d'un article |
| Panier | Consulter et modifier les achats |
| Favoris | Retrouver les produits enregistrés |
| Commande | Simuler la validation des achats |
| Confirmation | Afficher la confirmation fictive |

## 6. Technologies et architecture

**HTML5 :** structure sémantique des pages.

**CSS3 :** design, grille de produits, animations, responsive et thème visuel.

**JavaScript ES6 :** manipulation du DOM, événements, gestion des produits, panier et filtres.

**LocalStorage :** conservation du panier, des favoris et des préférences.

**Git / GitHub :** versionnement du projet.

**GitHub Pages ou Netlify :** hébergement de la démonstration.

Les fichiers JavaScript seront organisés par responsabilités avec les modules ES6.

## 7. Modèle de données

### Produit

Chaque produit doit contenir :

- id
- nom
- description
- catégorie
- prix
- images
- tailles disponibles
- couleurs disponibles
- stock indicatif
- date d'ajout
- statut promotionnel

### Article du panier

- identifiant du produit
- taille sélectionnée
- couleur sélectionnée
- quantité

### Commande simulée

- numéro de commande fictif
- informations de démonstration du client
- articles commandés
- montant total
- mode de livraison simulé
- date de confirmation

## 8. Exigences non fonctionnelles

### Performance

- Images optimisées.
- Chargement fluide.
- Code JavaScript organisé.
- Éviter les ressources inutiles.

### Accessibilité

- Contrastes lisibles.
- Textes alternatifs pour les images.
- Navigation au clavier.
- Champs de formulaire correctement identifiés.
- Messages d'erreur compréhensibles.

### Qualité et sécurité

- Validation des entrées du formulaire.
- Affichage sécurisé des données dynamiques.
- Pas de stockage d'informations bancaires.
- Aucune prétention à une sauvegarde serveur.
- Tests dans plusieurs navigateurs.

### Référencement

- Titres de pages pertinents.
- Métadonnées descriptives.
- Structure HTML sémantique.

## 9. Identité visuelle

**Style :** moderne, minimaliste et premium.

**Couleurs proposées :**
- Noir profond : `#171717`
- Blanc : `#FFFFFF`
- Beige clair : `#F5F0E8`
- Gris : `#737373`
- Accent doré : `#B68C5A`

**Typographie :** Inter pour l'interface et Playfair Display pour les grands titres éditoriaux.

Les cartes produits devront présenter des images de grande qualité avec une mise en page régulière.

## 10. Plan de développement

| Phase | Travaux |
|---|---|
| 1 | Architecture et préparation |
| 2 | Intégration HTML des pages |
| 3 | Design CSS et responsive |
| 4 | Catalogue et détails produits |
| 5 | Recherche, filtres et tri |
| 6 | Panier et favoris |
| 7 | Commande simulée |
| 8 | Tests, optimisations et publication |

## 11. Critères de validation

Le projet sera considéré comme terminé lorsque :

- Toutes les pages prévues seront accessibles.
- Au moins 20 produits de démonstration seront disponibles.
- Les filtres et la recherche fonctionneront.
- L'ajout au panier tiendra compte des variantes.
- Les quantités et le total seront correctement calculés.
- Le panier persistera après actualisation.
- Une commande fictive pourra être confirmée.
- L'interface fonctionnera sur mobile et ordinateur.
- Aucune erreur JavaScript bloquante ne sera présente.
- Le site sera accessible à travers une URL publique.

## 12. Évolutions futures — Version 2.0

Après la première version, le projet pourra être enrichi avec :

- Une API backend en Python / FastAPI ou Node.js.
- Une base de données PostgreSQL.
- Une authentification client.
- Un espace administrateur sécurisé.
- Une vraie gestion des stocks.
- Un historique de commandes côté serveur.
- Une intégration de paiement sécurisée via un prestataire.
- Un système de livraison et de suivi.
- Des statistiques de ventes.

Ces fonctionnalités ne font pas partie du périmètre initial.

## 13. Livrables attendus

1. Code source complet et organisé.
2. Site E-commerce responsive fonctionnel.
3. Catalogue de produits de démonstration.
4. Documentation README.md.
5. Tests des fonctionnalités essentielles.
6. Dépôt GitHub public.
7. Démonstration hébergée en ligne.

---

**Résultat attendu :** un site E-commerce de vêtements professionnel, démontrant les compétences en HTML, CSS, JavaScript, interfaces interactives, gestion d'état côté navigateur et développement responsive.