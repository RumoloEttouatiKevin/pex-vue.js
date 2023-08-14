# Projet 4 - Vue CLI - npm - node.js - Axios - Composant

## Création d'un nouveau projet avec Vue CLI

Pour créer un projet Vue.js en partant de zéro, nous pouvons utiliser Vue CLI qui va nous faciliter le travail.

- `vue create nom_du_projet`
  - Suivre les instructions.
    - Pour commencer un projet de zéro sans composant particulier, choisir **Manually select features**.
    - Sélectionner les composants que l'on souhaite importer lors de l'initialisation du projet.
    - Choisir la version de Vue.js à utiliser.
    - Choisir le préprocesseur CSS.
    - Choisir l'ESLint que l'on souhaite.
    - Choisir quand le linter prévient des erreurs.
    - Choisir où sauvegarder les préférences de configuration de Babel, ESLint, etc.
    - Choisir si l'on souhaite sauvegarder ce réglage de projet pour l'utiliser de nouveau à la prochaine création de projet.

Vue CLI va donc s'occuper de créer toute la base/structure de notre nouveau projet.

Il y a également un [README.md](./README-Vue.js.md) qui est automatiquement créé, avec des informations utiles pour l'installation et l'utilisation du projet.

## Serveur de dev

Utiliser la commande suivante pour lancer le serveur de dev, ceci est très pratique pour avoir une actualisation automatique de notre navigateur à chaque sauvegarde d'un fichier du projet.

- `npm run serve`

Deux URL seront fournis pour se connecter à l'application, utiliser généralement la **localhost**.

## Installation de Axios

Comme pour tout composant, nous passons par **npm**

- `npm install vue-axios`

Cette commande installe axios et tout ce qui va bien pour vue.js.

Importer les dépendances dans le projet.

```js
// Dans le fichier main.js pour le fournir à l'ensemble de l'application
import axios from 'axios'
import VueAxios from 'vue-axios'

// Permet d'instancier au projet l'utilisation de ces composants avant le montage du projet
createApp(App)
.use(VueAxios, axios)
.mount('#app')
```

## La directive v-html

Pour faire en sorte que du HTML venant d'une variable soit interprété, il faut utiliser la directive `v-html=""` et laisser le contenu de la balise vide.

```vue
<h1 v-html="this.question"></h1>
```

!! ATTENTION aux injections !!

## Propriétés calculé

Les propriétés de données sont comme des méthodes, ils sont instanciés dans une propriété nommée **computed**

```js
export default {
  computed: {
    answers() {
      let answers = this.incorrectAnswers;
      answers.push(this.correctAnswers);

      return answers;
    }
  },
}
```

La récupération de données de notre `data()` sera bidirectionnelle.

```js
export default {
  data() {
    return {
      question: undefined,
      incorrectAnswers: undefined,
      correctAnswers: undefined,
    }
  },
  computed: {
    // Dans cet exemple `this.incorrectAnswers` et `answers` seront liés de façon bidirectionnelle tout changement dans l'un impactera l'autre
    answers() {
      let answers = this.incorrectAnswers;
      answers.push(this.correctAnswers);

      return answers;
    }
    // Il est possible avec un petit tricks de palier à cela si besoin, le fait de transformer en JSON la valeur de notre logique de donnée réalise une copie dans lier les deux.
    answers() {
      let answers = JSON.parse( JSON.stringify(this.incorrectAnswers) );
      answers.push(this.correctAnswers);

      return answers;
    }
  },
```

## v-bind:key

Il est recommandé à chaque fois que l'on fait une itération sur un tableau d'indexer par une clé unique le rendu pour gagner en performance lors des rendus dynamique.

```vue
<!-- L'utilisation de l'index est une bonne manière d'avoir une clé unique, perso, j'aime bien préfixer ou suffixer pour ajouter une touche d'unicité. -->
<template v-for="(answer, index) in this.answers" :key="'answer_' + index">
  <input
    type="radio"
    name="options"
    value="answer"
  >
  <label v-html="answer"></label>
  <br>
</template>
```

## Création d'un composant

Un composant a la même forme que notre fichier principale App.vue qui est fait un composant.

```vue
<template>

</template>

<script>

</script>

<style lang="scss">

</style>
```

Ce nouveau composant est appelable par n'importe quel autre composant pour en faire un composant enfant, il est à placer dans le template du parent.

```vue
<template>
  <ScoreBoard />
</template>

<!-- Il doit être importé dans le composant parent. -->
<script>
import ScoreBoard from './components/ScoreBoard.vue';

// Il doit également est déclaré dans la propriété components.
export default {
  components: {
    ScoreBoard
  },
}
</script>
```

## Transmission de donnée aux composants enfant

Il faut déclarer dans le composant enfant les **props** que nous souhaitons recevoir.

```vue
<script>
export default {
  // On peut passer nos props en les listant dans un tableau.
  props: ['title', 'likes']

  // On peut également les lister en leur attribuant un typage fort dans un objet.
  props: {
    title: String,
    likes: Number,
    isPublished: Boolean,
    commentIds: Array,
    author: Object,
    callback: Function,
    contactsPromise: Promise
  }
}
</script>
```

Dans le composant parent, nous allons transmettre les données dans ce composant.

```vue
<template>
  <ScoreBoard
    :winCount="this.winCount"
    :loseCount="this.loseCount"
  />
</template>
```

On peut s'en servir comme valeur dans le template avec un rendu déclaratif.

```vue
<template>
    <section class="score">
      Player <span>{{ this.winCount }}</span> x <span>{{ this.loseCount }}</span> Computer
    </section>
</template>
```
