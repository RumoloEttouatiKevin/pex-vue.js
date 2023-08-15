# Projet 5 - VueX - Vue Router

## Vue Router

Le fichier de configuration de Vue Router se trouve généralement dans le dossier **router**.

Il est très explicite et permet de définir toutes les routes du projet, chaque page fait référence à un composant.

Les composants de page sont généralement dans le dossier **views** tandis que les petits composants factorisés sont généralement dans le dossier **components**.

Vue Router étant importé de manière générale à l'application dans **main.js**, il n'est donc pas nécessaire de l'important partout où nous souhaitons s'en servir.

```js
import router from './router'

createApp(App).use(store).use(router).mount('#app')
```

Pour s'en servir facilement, nous pouvons créer des liens et faire appel à nos vues depuis **App.vue**

```js
<template>
  <div id="nav">
    <router-link to="/">Home</router-link> -
    <router-link to="/basket">Shopping Bag (0)</router-link>
  </div>

  <router-view></router-view>
</template>
```

Voir la [documentation officielle](https://router.vuejs.org/)

## VueX

VueX va nous permettre d'avoir un store global à l'application, celui-ci se trouve dans **store/index.js**.

Dans le **state** nous mettons les propriétés de donnée.

```js
export default createStore({
  state: {
    products: [1, 2, 3],
  },
})
```

Elles sont ensuite accessibles depuis n'importe quel endroit du projet.

```js
products = this.$store.state.products
```

!! ATTENTION, ceci n'est valable que pour des données en dur qui ne changeront pas dans le state !

Voir la [documentation officielle](https://vuex.vuejs.org/)

Il n'est pas possible de modifier les valeurs du state depuis les view, pour cela, il faut passer par des actions qui effectueront une mutation. Le cycle est donc **State -> View/Components -> Actions -> Mutations -> State**

Une action est une méthode de la propriété **actions** de notre store.

```js
export default createStore({
  actions: {
    loadProductsAction() {
      console.log('Test');
    },
  },
})
```

Pour déclencher une action de notre store, nous utilisons l'événement **dispatch** en lui fournissant le nom de l'action.

```js
this.$store.dispatch('loadProductsAction');
```

Il est important de noter que les actions sont asynchrone et que les mutations sont synchrone.

Pour interagir avec notre state nous allons donc passer par une mutation depuis l'action en utilisant l'événement **commit** une fois l'action asynchrone terminée.

La mutation est donc appelée en utilisant la fonction **commit** qui est passé en paramètre de notre méthode action.

```js
export default createStore({
  actions: {
    loadProductsAction({ commit }) {
      commit('loadProductsMutation', [5, 6, 7]);
    },
  },
})
```

Une mutation est une méthode de la propriété **mutations** de notre store, elle prend comme premier paramètre le state et en second la valeur que l'on reçoit de l'action, le state peut ensuite être facilement modifié.

```js
export default createStore({
  mutations: {
    loadProductsMutation(state, newProducts) {
      state.products = newProducts;
    }
  },
})
```

Pour avoir accès dans nos composants aux données de propriété dynamique, il faut utiliser une propriété calculée.

```js
export default {
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
}
```

## mapState Helper

Si nous avons beaucoup de propriétés calculées qui viennent du state, nous pouvons raccourcir leurs définitions pour éviter la redondance.

```js
export default {
  computed: {
    test1() {
      return this.$store.state.test1;
    },
    test2() {
      return this.$store.state.test2;
    },
    test3() {
      return this.$store.state.test3;
    },
    test4() {
      return this.$store.state.test4;
    },
    test5() {
      return this.$store.state.test5;
    },
  },
}

// Devient
import { mapState } from 'vuex'

export default {
  computed: mapState([
    'test1',
    'test2',
    'test3',
    'test4',
    'test5',
  ]),
}
```
