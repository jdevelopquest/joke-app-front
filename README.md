# Blagues pas ouf!

Petite application web qui récupère une blague aléatoire et permet d’en révéler ou masquer la chute.

## Démo

[Ouvrir Blagues pas ouf!](https://jdevelopquest.github.io/joke-app-front/index.html)

## Fonctionnalités

- Chargement automatique d’une blague à l’ouverture et génération d’une nouvelle blague avec le bouton dédié.
- Révélation et masquage de la chute.
- Thème clair ou sombre, avec préférence enregistrée dans le navigateur. Sans préférence enregistrée, le thème du système est utilisé.
- Mise en page responsive.

## Démarrage local

Le projet est statique et ne nécessite pas d’installation de dépendances pour être exécuté. Depuis la racine du dépôt, démarrez un serveur HTTP local :

```bash
python3 -m http.server 8000
```

Puis ouvrez <http://localhost:8000> dans votre navigateur. Une connexion Internet est nécessaire pour récupérer les blagues.

## Styles Sass

Le navigateur charge `styles/style.css`. Après une modification de `styles/style.scss`, régénérez ce fichier avec Sass :

```bash
sass --no-source-map styles/style.scss styles/style.css
```

Cette commande nécessite le compilateur Sass (`sass`) installé sur votre système.

## API

Les blagues sont récupérées avec `GET /v1/jokes/random` :

<https://joke-app-api-js43.onrender.com/v1/jokes/random>

La réponse attendue contient les propriétés `premise` et `punchline`. La documentation complète de l’API est disponible à l’adresse suivante :

<https://joke-app-api-js43.onrender.com/v1/jokes/api-docs>

## Technologies

- HTML
- Sass et CSS
- JavaScript natif avec modules ES
