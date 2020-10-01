# Scoped HTML

Scoped HTML is a DOM feature that let's an element establish its own naming context for descendant elements. It makes it possible to keep IDs out of HTML's global namespace and gives us a document that is structured as a hierarchy of *scopes* and *subscopes*.

## On this page:
+ [Convention](#convention)
+ [Scope API](#scope-api)
  + [Scope Observability](#scope-observability)

## Convention

Scopes are designated with the `namespace` Boolean attribute.

The following ID is scoped:

```html
<div namespace>
    <div>
        <div scoped:id="some-id"></div>
    </div>
</div>
```

At scale, what we get is a **hierarchy of *scopes* and *subscopes***.

```html
<article namespace>
    <section scoped:id="europe" namespace>
        <div scoped:id="about">About Europe</b></div>
        <div scoped:id="countries">Countries in Europe</div>
    </section>
    <section scoped:id="asia" namespace>
        <div scoped:id="about">About Asia</b></div>
        <div scoped:id="countries">Countries in Asia</div>
    </section>
</article>
```

A mental model of the hierarchy would be:

```html
continents
|- europe
|   |- about
|   |- countries
|- asia
    |- about
    |- countries
```

#### The Namespace Tree API

Scoped HTML comes with a *namespace API* that models scope hierarchies.

```js
// Get the "continents" article
let continents = document.querySelector('#continents');

// Access scoped IDs with the new "namespace" DOM property
let europe = continents.namespace.europe;
let asia = continents.namespace.asia;

// And for deeply-nested IDs...
let aboutAfrica = continents.namespace.asia.namespace.about;
```

This gives an application a more bankable tree than the DOM tree as it lets a UI block hide its implementation details while exposing its relevant parts by role.

### Scope Observability

An element's `.namespace` property is implemented as a live object that reflects the element's namespace tree in real time. CHTML also supports the [Observer API](https://docs.web-native.dev/observer) for change detection; [`Obs.observe()`](https://docs.web-native.dev/observer/api/observe) can thus be used to observe when IDs enter or exit the namespace.

```js
Obs.observe(continents.namespace, changes => {
    console.log(changes.map(change => change.name));
});
```

With the code below, our observer above should report having added a new ID `africa` to the namespace.

```js
continents.append('<section id="africa"></section>');
```
