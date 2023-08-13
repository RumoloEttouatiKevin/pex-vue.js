# Projet 1 - Les bases

## Logique d'application Vue.js

La logique de l'application est contenue dans un objet qui sera instancié à Vue.js via sa méthode `createApp()`.

La méthode `mount()` permet de définir à quel endroit de notre page HTML nous attacherons notre application Vue.js.

## Données de l'application

Dans Vue.js, les données sont stockées dans une fonction `data()` qui elle-même se trouve dans notre objet de logique d'application.

## Rendu déclaratif

Pour afficher une donnée, il faut entourer de double accolade l’élément JS que l'on souhaite `{{ dataToDisplay }}`, toute action JS est également possible, calcul, concaténation, appel d'une méthode, etc... Il n'est pas possible de définir les fonctions ou tout autre élément qui prendrait plusieurs lignes ; pour rappel, la logique de l'application doit ce trouver dans l'objet de logique.

Pour fournir le contenu d'un paramètre dans les doubles cotes d'un attribut HTML, les doubles accolades ne fonctionnent pas, il faut passer par la syntaxe `:src="product.photo"`.

## Les directives

En Vue.js, on utilise beaucoup les directives implémentées directement dans le code HTML, elles permettent de condition les événements, l'affichage, etc...

- `v-for="currentElement in elements"` permet de boucler sur un "tableau" et d'en afficher autant que l'élément qu'il contient, si un élément est ajouté à ce "tableau" le rendu HTML sera immédiatement mis à jour, voilà la force de Vue.js
- `v-on:click="product.active = !product.active"` ou abrégé `@click=""` permet de poser un écouteur d'événement, voir tous les événements disponibles sur la doc officielle de Vue.js, il est possible de faire appel à une méthode ou comme dans l'exemple, de modifier la valeur d'une donnée.
- `v-bind:class="{ selected: product.active }"` ou abrégé `:class="{ product.active ? 'selected' : ''}"` est une liaison de données, utilisées pour les classes ou pour les styles, généralement utilisés avec des ternaires ou une syntaxe particulière à vue.js comme dans le premier exemple.
- `v-if="product.active"` permet de conditionner l'affichage d'un élément.

!! Point important, les directives ne peuvent effectuer qu'une seul action, appel d'une méthode ou modification d'une valeur.

## Liaison d'attribut

Certains attributs HTML sont uniques, type disabled, selected, etc...

Il est possible d’interagir avec eux de cette manière `:disabled="product.quantity <= 1"` le résultat de la condition définira l'utilisation de l'attribut ou non.

## Les templates

Pour limiter la répétition de code et rentrer dans une démarche DRY (Don't Repeat Yourself), il est possible de mettre en place des `<template></template>` pour regrouper plusieurs éléments sans ajouter réellement d'élément HTML et donc de potentiellement casser le CSS.

```vue
<!-- Pour éviter -->
<tr v-for="product in products">
    <td v-if="product.active">{{ product.quantity + 'x ' + product.name }}</td>
    <td v-if="product.active">{{ (product.quantity * product.price).toFixed(2) }}</td>
</tr>

<!-- On peut faire -->
<tr v-for="product in products">
    <template v-if="product.active">
        <td>{{ product.quantity + 'x ' + product.name }}</td>
        <td>{{ (product.quantity * product.price).toFixed(2) }}</td>
    </template>
</tr>
```

Alors, oui, ça fait deux lignes de plus, mais il est important en Vue.js de limiter les directives quand c'est possible.

## Les méthodes

Nous retrouverons dans notre objet de donnée logique les différentes méthodes qui sont appelées par le HTML

```vue
<!-- HTML -->
<p>{{ total() }}</p>
```

```js
// JS
objetLogique = {
    methods: {
        total: function() {
            let total = 0;

            this.products.forEach(item => {
                if (item.active) {
                    total += item.price * item.quantity;
                }
            });

            return total.toFixed(2);
        }
    }
}
```

## Gestion de la propagation

Pour arrêter la propagation d'un événement `@click.stop="product.quantity++"`, plusieurs modificateurs d'événement sont disponibles, voir la doc officielle de vue.js.
