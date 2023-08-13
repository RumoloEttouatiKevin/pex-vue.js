# Projet 3 - Défi Todo List / Cycle de vie - Hooks

## Défi

Le projet commence par un défi, tout ce qui a été vu dans les projets 1 et 2 seront utilisé, pas de nouvelle notion à chercher pour le défi.

## Utilisation du Local Storage

L'utilisation du Local Storage est identique au JS Vanilla

- Écriture

    ```js
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
    ```

- Lecture

    ```js
    todoList = JSON.parse(localStorage.getItem('todoList'));
    ```

## Cycle de vie / Hooks

La documentation présente un [diagramme](https://vuejs.org/guide/essentials/lifecycle.html#registering-lifecycle-hooks) très explicite.

L'utilisation de ces Hooks est une fois de plus dans notre objet logique et ils sont instanciés comme fonctions de cet objet. Ces fonctions permettent d'exécuter du code JS à un moment précis du cycle de vie de notre application.

```js
logicObject = {
    data() {},
    methods: {},
    beforeCreate() {
        console.log('Before create');
    },
    created() {
        console.log('Created');
    },
    beforeUpdate() {
        console.log('Before update');
    },
}
```

## Utilisation des Hooks ou des méthodes

Tout dépend du besoin, l'utilisation du hook `updated()` est déclenché à chaque fois qu'il y aura la moindre modification sur la page.

Pour de petits besoins ciblés, il est préférable d'utiliser des méthodes.

Encore une fois, tout dépend du besoin !
