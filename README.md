# OOHTML

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![License][license-src]][license-href]

**[On the Agenda](#on-the-agenda) • [Modular HTML](#modular-html) • [HTML Imports](#html-imports) • [Data Binding](#data-binding) • [Data Plumbing](#data-plumbing) • [Polyfill](#polyfill) • [Examples](#examples) • [License](#license)**

Object-Oriented HTML (OOHTML) is a set of features that extend standard HTML and the DOM to enable authoring modular, reusable and reactive markup - with a "buildless", web-native workflow as design goal! This project presents what "modern HTML" could look like at its best!

Building Single Page Applications? OOHTML is a special love letter!

<details><summary>Versions</summary>

*This is documentation for `OOHTML@2.x`. (Looking for [`OOHTML@1.x`](https://github.com/webqit/oohtml/tree/v1.10.4)?)*

</details>

## Motivation

Vanilla HTML is surprisingly becoming a compelling option for an increasing number of developers! But the current authoring experience still leaves much to be desired in how the language lacks modularity, reusability, and other fundamental capabilities like data binding! Authors still have to rely on tools - or, to say the least, do half of the work in HTML and half in JS - to get even basic things working!

This project pursues an object-oriented approach to HTML and implicitly revisits much of what inhibits the idea of a *component* architecture for HTML!

└ [See more in the introductory blog post](https://dev.to/oxharris/the-web-native-equations-1m1p-temp-slug-6661657?preview=ba70ad2c17f05b5761bc74516dbde8c9eff8b581a0420d87334fd9ef6bab9d6e6d3ab6aaf3fe02542bb9e7250d0a88a6df91dae40919aabcc9a07320)<sup>draft</sup>

## On the Agenda

+ [Modular HTML](#modular-html)
+ [HTML Imports](#html-imports)
+ [Data Binding](#data-binding)
+ [Data Plumbing](#data-plumbing)

## Modular HTML

Modular HTML is a markup pattern that lets us write arbitrary markup as self-contained objects - with each *encapsulating* its own structure, styling and logic - as against the regular idea of having everything converge and conflict on one global scope!

OOHTML makes this possible in just simple conventions - via two new attributes: `namespace` and `scoped`!

### Namespacing

The `namespace` attribute for designating an element as own naming context for identifiers - i.e. the `id` and `name` attributes:

```html
<div id="user" namespace>
  <a id="url" href="https://example.org">
    <span id="name">Joe Bloggs</span>
  </a>
  <a id="email" href="mailto:joebloggs@example.com" >joebloggs@example.com</a>
</div>
```
 
*which translates really well to an object model*:

```html
user
 ├── url
 ├── name
 └── email
```

*with a corresponding API that exposes said structure to JavaScript applications*:

```js
// The document.namespace API
let { user } = document.namespace;
// The Element.prototype.namespace API
let { url, name, email } = user.namespace;
```

<details><summary>Learn more</summary>

You want to see how IDs are otherwise exposed as global variables:

```html
<div id="foo"><div>
```

```js
console.log(window.foo); // div
```

[Read more](https://stackoverflow.com/questions/6381425/is-there-a-spec-that-the-id-of-elements-should-be-made-global-variable)

</details>

└ A Namespace API that reflects the real-DOM&trade; in real-time, in conjunction with the general-purpose object observability API - [Observer API](https://github.com/webqit/observer):

```js
// Observing the addition or removal of elements with an ID
Observer.observe(document.namespace, changeCallback);

const paragraph = document.createElement('p');
paragraph.setAttribute('id', 'bar');
document.body.appendChild(paragraph); // Reported synchronously
```

```js
// Observing the addition or removal of elements with an ID
paragraph.toggleAttribute('namespace', true);
Observer.observe(paragraph.namespace, changeCallback);

const span = document.createElement('span');
span.setAttribute('id', 'baz');
paragraph.appendChild(span); // Reported synchronously
```

```js
function changeCallback(changes) {
    console.log(changes[0].type, changes[0].key, changes[0].value, changes[0].oldValue);
}
```

### Style and Script Scoping

The `scoped` attribute for *scoping* element-specific stylesheets and scripts:

```html
<div>

  <style scoped>
    :scope { color: red }
  </style>

  <script scoped>
    console.log(this) // div
  </script>

</div>
```

*with a corresponding API that exposes said assets to JavaScript applications*:

```js
let { styleSheets, scripts } = user; // APIs that are analogous to the document.styleSheets, document.scripts properties
```

└ [Modular HTML examples](#modular-html-examples)

## HTML Imports

HTML Imports is a realtime module system for *templating and reusing* HTML in HTML, and optionally in JavaScript! Something like it is the [`<defs>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs) and [`<use>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use) system in SVG.

OOHTML makes this possible in just simple conventions - via a new `def` attribute and a complementary new `<import>` element!

### Module Definition

The `def` attribute for defining reusable markup - either as whole *module* or as *fragment*:

```html
<head>

  <template def="foo">
    <div def="fragment1">A module fragment that can be accessed independently</div>
    <div def="fragment2">Another module fragment that can be accessed independently</div>
    <p>An element that isn't explicitly exposed.</p>
  </template>

</head>
```

└ Module nesting for code organization:

```html
<head>

  <template def="foo">
    <div def="fragment1"></div>

    <template def="nested">
      <div def="fragment2"></div>
    </template>
  </template>

</head>
```

### Remote Modules

The `<template src>` element for remote modules:

```html
<template def="foo" src="/foo.html"></template>
<!-- which links to the file below -->
```

```html
-- file: /foo.html --
<div def="fragment1"></div>
<template def="nested" src="/nested.html"></template>
<!-- which itself links to the file below -->
```

```html
-- file: /nested.html --
<div def="fragment2"></div>
--
```

*which extends how elements like images already work; terminating with either a `load` or an `error` event*:

```js
foo.addEventListener('load', loadCallback);
foo.addEventListener('error', errorCallback);
```

### Declarative Module Imports

The `<import>` element for declarative module import:

```html
<body>
  <import ref="/foo#fragment1"></import> <!-- Pending resolution -->
  <import ref="/foo/nested#fragment2"></import> <!-- Pending resolution -->
</body>
```

```html
<body>
  <div def="fragment1"></div> <!-- After resolution -->
  <div def="fragment2"></div> <!-- After resolution -->
</body>
```

<details><summary>All in Realtime</summary>

As a realtime module system, `<import> `elements maintain a live relationship with given module definition `<template def>` elements and are resolved again in the event that:
+ the `<import>` element points to another module — either by `ref` change or by a change in `importscontext` (below).
+ the module definition `<template def>` element has had its contents updated, either programmatically or automatically from having loaded.

Conversely, an `<import>` element that has been resolved will self-restore in the event that:
+ the `<import>` element no longer points to a module; or the module has been emptied or removed.
+ the previously slotted contents have been programmatically removed and slot is empty.

</details>

<details><summary>With SSR Support</summary>

On the server, these `<import>` elements would retain their place in the DOM, but this time, serialized into comment nodes, while having their output rendered just above them as siblings.

The above resolved imports would thus give us something like:

```html
<body>
  <div def="fragment1"></div>
  <!--&lt;import ref="/foo#fragment1"&gt;&lt;/import&gt;-->
  <div def="fragment2"></div>
  <!--&lt;import ref="/foo/nested#fragment2"&gt;&lt;/import&gt;-->
</body>
```

But they also have to remember the exact imported nodes that they manage so as to be able to re-establish that relationship on getting to the client. This information is automatically encoded as part of the serialised element itself, in something like:

```html
<!--&lt;import ref="/foo/nested#fragment2" nodecount="1"&gt;&lt;/import&gt;-->
```

Now that extra bit of information gets decoded and original relationships are formed again on getting to the client and "hydrating" the `<import>` element. But, the `<import>` element itself stays invisible in the DOM while still continuing to kick as above!

> Note: We know we're on the server when `window.webqit.env === 'server'`. This flag is automatically set by OOHTML's current SSR engine: [OOHTML-SSR](https://github.com/webqit/oohtml-ssr)

</details>

### Programmatic Module Imports

The *HTMLImports* API for programmatic module import:

```js
const moduleObject1 = document.import('/foo#fragment1');
console.log(moduleObject1.value); // divElement
```

```js
const moduleObject2 = document.import('/foo/nested#fragment2');
console.log(moduleObject2.value); // divElement
```

*with an observable `moduleObject.value` property for working asynchronously; e.g. awaiting and handling remote modules*:

```js
Observer.observe(moduleObject2, 'value', e => {
    console.log(e.value); // divElement
});
```

*with an equivalent `callback` option on the `import()` method itself*:

```js
document.import('/foo#fragment1', divElement => {
    console.log(divElement);
});
```

└ An optional `live` parameter for staying subscribed to any mutations made to source module elements:

```js
const moduleObject2 = document.import('/foo/nested#fragment2', true/*live*/);
console.log(moduleObject2.value);
Observer.observe(moduleObject2, 'value', e => {
    console.log(e.value);
});
```

```js
document.import('/foo#fragment1', true/*live*/, divElement => {
    console.log(divElement); // To be received after remote module has been loaded
});
```

*both of which would get notified on doing the below*:

```js
document.querySelector('template[def="foo"]').content.firstElementChild.remove();
```

└ An optional `AbortSignal` parameter for aborting module mutation events:

```js
const abortController = new AbortController;
```

```js
const moduleObject2 = document.import('/foo/nested#fragment2', { live: true, signal: abortController.signal });
```

```js
document.import('/foo#fragment1', { live: true, signal: abortController.signal }, divElement => {
    console.log(divElement); // To be received after remote module has been loaded
});
```

```js
setTimeout(() => abortController.abort(), 1000);
```

<details><summary>Extended Imports concepts</summary>

### Lazy-Loading Modules

Remote modules with lazy-loading - which has modules loading on first time access:

```html
<!-- Loading doesn't happen until the first time this is being accessed -->
<template def="foo" src="/foo.html" loading="lazy"></template>
```

```html
<body>
  <import ref="/foo#fragment1"></import> <!-- Triggers module loading and resolves on load success -->
</body>
```
```js
const moduleObject2 = document.import('/foo#fragment1'); // Triggers module loading and resolves at moduleObject2.value on load success
```

### Scoped Modules

The `scoped` attribute for an *object-scoped* module system:

```html
<section> <!-- object with own modules -->

  <template def="foo" scoped> <!-- Scoped to host object and not available globally -->
    <div def="fragment1"></div>
  </template>

  <div>
    <import ref="foo#fragment1"></import> <!-- Relative path (beginning without a slash), resolves to the local module: foo#fragment1 -->
    <import ref="/foo#fragment1"></import> <!-- Absolute path, resolves to the global module: /foo#fragment1 -->
  </div>

</section>
```

*with an equivalent `Element.prototype.import()` API for accessing said scoped modules*:

```js
// Using the HTMLImports API
const moduleHost = document.querySelector('div');
const localImport1 = moduleHost.import('foo#fragment1'); // the local module: foo#fragment1
console.log(localImport1); // { value: div }
```

```js
// Using the HTMLImports API
const moduleHost = document.querySelector('div');
const globalImport1 = moduleHost.import('/foo#fragment1'); // the global module: foo#fragment1
console.log(globalImport1); // { value: div }
```

### Module Inheritance

Module nesting with inheritance:

```html
<template def="foo">

  <header def="header"></header>
  <footer def="footer"></footer>

  <template def="nested1" inherits="header footer"> <!-- Using the "inherits" attribute -->
    <main def="main"></main>
  </template>

  <template def="nested2" inherits="header footer"> <!-- Using the "inherits" attribute -->
    <main def="main"></main>
  </template>

</template>
```

```html
<template def="foo">

  <template def="common">
    <header def="header"></header>
    <footer def="footer"></footer>
  </template>

  <template def="nested1" extends="common"> <!-- Using the "extends" attribute -->
    <main def="main"></main>
  </template>

  <template def="nested2" extends="common"> <!-- Using the "extends" attribute -->
    <main def="main"></main>
  </template>

</template>
```

```html
<body>
  <import ref="/foo/nested1#header"></import>
</body>
```

### Imports Contexts

"Imports Contexts" for context-based *import resolution*:

```html
<body importscontext="/foo">
  <section>
    <import ref="#fragment1"></import> <!-- Relative path (beginning without a slash), resolves to: /foo#fragment1 -->
  </section>
</body>
```

```html
<body importscontext="/foo/nested">
  <section>
    <import ref="#fragment2"></import> <!-- Relative path (beginning without a slash), resolves to: /foo/nested#fragment2 -->
  </section>
</body>
```

```js
// Using the HTMLImports API
const moduleHost = document.querySelector('section');
const globalImport2 = moduleHost.import('#fragment2'); // module:/foo/nested#fragment2
console.log(globalImport2); // { value: div }
```

└ "Imports Contexts" with named contexts:

```html
<body contextname="context1" importscontext="/foo/nested">

  <import ref="#fragment2"></import> <!-- Relative path (beginning without a slash), resolves to: /foo/nested#fragment2 -->

  <section importscontext="/foo">
    <import ref="#fragment1"></import> <!-- Relative path (beginning without a slash), resolves to: /foo#fragment1 -->
    <div>
      <import ref="@context1#fragment2"></import> <!-- Context-relative path (beginning with a context name), resolves to: /foo/nested#fragment2 -->
    </div>
  </section>

</body>
```

```js
// Using the HTMLImports API
const moduleHost = document.querySelector('div');
const globalImport2 = moduleHost.import('@context1#fragment2'); // module:/foo/nested#fragment2
console.log(globalImport2); // { value: div }
```

└ "Imports Contexts" with context inheritance:

```html
<body importscontext="/foo">

  <import ref="#fragment1"></import> <!-- Relative path (beginning without a slash), resolves to: /foo#fragment1 -->

  <section importscontext="nested"> <!-- Relative path (beginning without a slash), resolves to: /foo/nested -->
    <import ref="#fragment2"></import> <!-- Relative path (beginning without a slash), resolves to: /foo/nested#fragment2 -->
  </section>

</body>
```

### Scoped Modules and Imports Contexts

Object-scoped module system with context inheritance:

```html
<body contextname="context1" importscontext="/bar">
  <section importscontext="nested"> <!-- object with own modules, plus inherited context: /bar/nested -->

    <template def="foo" scoped> <!-- Scoped to host object and not available globally -->
      <div def="fragment1"></div>
      <div def="fragment2"></div>
    </template>

    <div>
      <import ref="foo#fragment2"></import> <!-- Relative path (beginning without a slash), resolves to the local module: foo#fragment2, and if not found, resolves from context to the module: /bar/nested/foo#2 -->
      <import ref="/foo#fragment1"></import> <!-- Absolute path, resolves to the global module: /foo#fragment1 -->
      <import ref="@context1#fragment1"></import> <!-- Resolves to the global module: /bar#fragment1 -->
    </div>

  </section>
</body>
```

```js
// Using the HTMLImports API
const moduleHost = document.querySelector('div');
const localOrGlobalImport2 = moduleHost.import('#fragment2'); // the local module: foo#fragment2, and if not found, resolves from context to the module: /bar/nested#fragment2
console.log(localOrGlobalImport2); // { value: div }
```

</details>

└ [HTML Imports examples](#html-imports-examples)

## Data Binding

Data binding is the concept of declaratively driving the UI with application-level data. It comes as mechanism that sits between the UI and the application itself, ensuring that the relevant parts of the UI are *automatically* updated as application state changes.

OOHTML makes this possible in just simple conventions - via a new comment-based data-binding syntax `<?{ }?>` and a complementary new `binding` attribute!

### Comment-Based Data-Binding

A web-native, comment-based data-binding syntax `<?{ }?>` which works like regular comment but stay "data-charged":

```js
<html>
  <head>
    <title><?{ app.title }?></title>
  </head>
  <body>
    Hi, I'm <?{ app.name ?? 'Default name' }?>!
    and here's another way to write the same comment: <!--?{ app.cool }?-->
  </body>
</html>
```

<details><summary>With SSR Support</summary>

On the server, these data-binding tags would retain their place in the DOM while having their output rendered to their right in a text node.

The following: `<?{ 'Hello World' }?>` would thus give us: `<?{ 'Hello World' }?>Hello World`.

But they also have to remember the exact text node that they manage, so as to be able to re-establish that relationship on getting to the client. That information is automatically encoded as part of the declaration itself, and that brings us to having a typical server-rendered binding look like this:

```html
<?{ 'Hello World'; [=11] }?>Hello World
```

Now that extra bit of information gets decoded and original relationships are forned again on getting to the client. But the binding tag itself graciously disappears from the DOM, while the now "hydrated" text node continues to kick!

> Note: We know we're on the server when `window.webqit.env === 'server'`. This flag is automatically set by OOHTML's current SSR engine: [OOHTML-SSR](https://github.com/webqit/oohtml-ssr)

</details>

### Directives-Based Data-Binding

The `binding` attribute for a declarative and neat, key/value data-binding syntax:

```html
<div binding="<type><parameter>: <argument>;"></div>
```

*where*:

+ *`<type>` is the binding type, which is always a symbol*
+ *`<directive>` is the binding directive, which could be any of CSS property, class name, attribute name, Structural Directive*
+ *`<argument>` is the bound value or expression*

*which would give us the following for a CSS property*:

```html
<div binding="&color: someColor; &backgroundColor: 'red'"></div>
```

*with enough liberty to separate the binding type from the directive itself*:

```html
<div binding="& color: someColor; & backgroundColor: 'red'"></div>
```

*all of which can be seen here*:

| Symbol | Meaning | Usage |
| :---- | :---- | :---- |
| `&`  | CSS Property | `<div binding="&color: someColor;"></div>` |
| `%`  | Class Name | `<div binding="%active: app.isActive;"></div>` |
| `~`  | Attribute Name | `<a binding="~href: person.profileUrl + '#bio';"></a>` |
| `@`  | Structural Directive: | *See next table* |

<details><summary>Structural Directives</summary>

| Directive | Meaning | Usage |
| :---- | :---- | :---- |
| `@text`   | For rendering plain text content | `<span binding="@text: firstName + ' ' + lastName;"></span>` |
| `@html`   | For rendering markup content | `<span binding="@html: '<i>' + firstName + '</i>';"></span>` |
|  `@items`  | For rendering a list, with argument in the following format:<br>`<declaration> <of\|in> <iterable> / <importRef>` | *See next two tables* |

<details><summary>"For ... Of" Loops</summary>

|  Idea | Usage |
| :---- | :---- |
| Loop over an array/iterable | `<ul binding="@items: value of [1,2,3] / 'foo#fragment';"></ul>` |
| Same as above but with a `key` declaration  | `<ul binding="@items: (value, key) of [1,2,3] / 'foo#fragment';"></ul>` |
| Same as above but with different variable names  | `<ul binding="@items: (product, id) of store.products / 'foo#fragment';"></ul>` |
| Same as above but with a dynamic `importRef`  | `<ul binding="@items: (product, id) of store.products / store.importRef;"></ul>` |

</details>

<details><summary>"For ... In" Loops</summary>

| Idea | Usage |
| :---- | :---- |
| Loop over an object | `<ul binding="@items: key in { a: 1, b: 2 } / 'foo#fragment';"></ul>` |
| Same as above but with a `value` and `index` declaration | `<ul binding="@items: (key, value, index) in { a: 1, b: 2 } / 'foo#fragment';"></ul>` |

</details>

</details>

<details><summary>Example</summary>

```html
<section>

  <!-- The "items" template -->
  <template def="item" scoped>
    <li binding="@text: key + ': ' + name;"></li>
  </template>

  <!-- The loop -->
  <ul binding="@items: (name, key) of ['dog','cat','ram'] / 'item';"></ul>

</section>
```

</details>

<details><summary>All in Realtime</summary>

Lists are rendered in realtime, which means that in-place mutations - additions and removals - on the *iteratee* will be automatically reflected on the UI!

</details>

<details><summary>With SSR Support</summary>

Generated item elements are automatically assigned a corresponding index with a `data-index` attribute! This helps in remapping generated item nodes to their respective entry in *iteratee* - universally.

</details>

## Data Plumbing

*[TODO]: The Context API and Bindings API*

<!--
The last set of features covers the concept of "state", "bindings", and "reactivity" for those objects at the DOM level - in the most exciting form of the terms and as an upgrade path! This comes factored into the design as something intrinsic to the problem.

└ *The [Observer API](https://github.com/webqit/observer) for general-purpose object observability*:

```js
function changeCallback(changes) {
    console.log(changes[0].type, changes[0].key, changes[0].value, changes[0].oldValue);
}
```

```js
const obj = {};
Observer.observe(obj, changeCallback);
```

```js
Observer.set(obj, 'prop1', 'value1'); // Reported synchronously
```

```js
Observer.deleteProperty(obj, 'prop1'); // Reported synchronously
```

└ *A Bindings API for binding application-level state to an object*:

```js
// Observing document-level bindings
Observer.observe(document.bindings, changeCallback);

// Set state
document.bindings.userSignedIn = true;

// Set data object
document.bindings.data = { prop1: 'value1' };
Observer.set(document.bindings.data, 'prop2', 'value2');
```

```js
// Observing element-level bindings
Observer.observe(element.bindings, changeCallback);

// Set state
element.bindings.isCollapsed = true;

// Set data object
element.bindings.data = { prop1: 'value1' };
Observer.set(element.bindings.data, 'prop2', 'value2');
```

└ *"Stateful Scripts" for reactive scripting*:

```html
<script stateful>
  console.log(this) // window

  console.log(window.liveProperty) // live expression
  console.log(liveProperty) // live expression; technically same as above

  if (document.bindings.userSignedIn) {
      // Live block
      console.log('User signed in!');
  }
</script>
```

```js
Observer.set(window, 'liveProperty'); // Live expressions rerun
```

```html
<div>
  <script stateful scoped>
    console.log(this) // div

    console.log(this.liveProperty) // live expression

    if (this.bindings.isCollapsed) {
        // Live block
        console.log('Section collapsed!');
    }
  </script>
</div>
```

```js
Observer.set(element, 'liveProperty'); // Live expressions rerun
```

└ [Reactive HTML concepts](#)

-->

## Polyfill

OOHTML is being developed as something to be used today - via a polyfill.

<details><summary>Load from a CDN<br>
└───────── <a href="https://bundlephobia.com/result?p=@webqit/oohtml"><img align="right" src="https://img.shields.io/bundlephobia/minzip/@webqit/oohtml?label=&style=flat&colorB=black"></a></summary>

```html
<script src="https://unpkg.com/@webqit/oohtml/dist/main.js"></script>
```

└ This is to be placed early on in the document and should be a classic script without any `defer` or `async` directives!

└ For the Scoped Styles feature, you'd also need something like the [samthor/scoped](https://github.com/samthor/scoped) polyfill (more details below):

```html
<head>
  <script src="https://unpkg.com/style-scoped/scoped.min.js"></script>
</head>
```

</details>

<details><summary>Extended usage concepts</summary>

To use the polyfill on server-side DOM instances as made possible by libraries like [jsdom](https://github.com/jsdom/jsdom), simply install and initialize the library `@webqit/oohtml` with the DOM instance:

```bash
npm i @webqit/oohtml
```

```js
// Import
import init from '@webqit/oohtml';

// Initialize the lib
init.call( window[, options = {} ]);
```

But all things "SSR" for OOHTML are best left to the [`@webqit/oohtml-ssr`](https://github.com/webqit/oohtml-ssr) package!

Also, if you'll be going ahead to build a real app to see OOHTML in action, you may want to consider also using:

+ the [`@webqit/oohtml-cli`](https://github.com/webqit/oohtml-cli) package for operating a file-based templating system.

+ the modest, OOHTML-based [Webflo](https://github.com/webqit/webflo) framework to greatly streamline your application development process!

</details>

<details><summary>Implementation Notes</summary>

+ **Loading Requirements**. As specified above, the OOHTML script tag is to be placed early on in the document and should be a classic script without any `defer` or `async` directives!
    
    If you must load the script "async", one little trade-off has to be made for `<script scoped>` and `<script stateful>` elements to have them ignored by the browser until the polyfill comes picking them up: *employing a custom MIME type in place of the standard `text/javascript` and `module` types*, in which case, a `<meta name="scoped-js">` element is used to configure the polyfill to honor the custom MIME type:

    ```html
    <head>
      <meta name="scoped-js" content="script.mimeType=some-mime">
      <script async src="https://unpkg.com/@webqit/oohtml/dist/main.js"></script>
    </head>
    <body>
      <script type="some-mime" scoped>
        console.log(this); // body
      </script>
    </body>
    ```

    The custom MIME type strategy also comes in as a "fix" for when in a browser or other runtime where the polyfill is not able to intercept `<script scoped>` and `<script stateful>` elements ahead of the runtime - e.g. where...

    ```html
    <body>
      <script scoped>
        console.log(this); // body
      </script>
    </body>
    ```

    ...still gives the `window` object in the console.

+ **Scoped/Stateful Scripts**. This feature is an extension of [Stateful JS](https://github.com/webqit/stateful-js). The default OOHTML build is based on the [Stateful JS Lite APIs](https://github.com/webqit/stateful-js#stateful-js-lite) and this means that `<script stateful></script>` and `<script scoped></script>` elements are parsed "asynchronously", in the same timing as `<script type="module"></script>`!

    This timing works perfectly generally, but if you have a requirment to have classic scripts follow their [native synchronous timing](https://html.spec.whatwg.org/multipage/parsing.html#scripts-that-modify-the-page-as-it-is-being-parsed), then you need to the *realtime* OOHTML build:

    ```html
    <head>
      <script src="https://unpkg.com/@webqit/oohtml/dist/main.realtime.js"></script>
    </head>
    ```

+ **Scoped CSS**. This feature is only in "concept" implementation and doesn't work right now as is. The current implementation simply wraps `<style scoped>` blocks in an `@scope {}` block - which itself isn't supported in any browser. To try this "concept" implementation, set the `style.strategy` config to `@scope`:

    ```html
    <head>
      <meta name="scoped-css" content="style.strategy=@scope"> <!-- Must come before the polyfil -->
      <script src="https://unpkg.com/@webqit/oohtml/dist/main.js"></script>
    <head>
    ```

    Now the following `<style scoped>`...

    ```html
    <style scoped>
      h2 { color: red; }
    </style>
    ```
    
    ...will be wrapped to something like:

    ```html
    <style ref="scoped8eff" scoped>
      @scope from (:has(> style[ref="scoped8eff"])) {
        h2 { color: red; }
      }
    </style>
    ```

    A working implementation may be coming soon, but in the meantime, you could try one of the polyfills for `<style scoped>` out there; e.g. [samthor/scoped](https://github.com/samthor/scoped):

    ```html
    <script src="https://unpkg.com/style-scoped/scoped.min.js"></script>
    ```

+ **HTML Imports**. The attribute names for exposing reusable modules and for referencing them - the `def` and `ref` keywords, respectively - aren't finalized. While the principle of operation remains, these attributes may be renamed in subsequent iterations. But the polyfill is designed to always defer to any syntax that has been explicitly specified using a meta tag. Here's an example:

    ```html
    <head>
      <meta name="html-imports" content="template.attr.moduledef=def; template.attr.fragmentdef=def; import.attr.moduleref=ref;"> <!-- Must come before the polyfil -->
      <script src="https://unpkg.com/@webqit/oohtml/dist/main.js"></script>
    <head>
    ```

    Now, even when the default attribute names change, your `def` and `ref` implementation will still work:
 
</details>

## Examples

Here are a few examples in the wide range of use cases these features cover.

+ [Example 1: *Single Page Application*](#example-1-single-page-application)
+ [Example 2: *Multi-Level Namespacing*](#example-2-multi-level-namespacing)
+ [Example 3: *Dynamic Shadow DOM*](#example-3-dynamic-shadow-dom)
+ [Example 4: *List Items*](#example-4-list-items)
+ [Example 5: *Live List*](#example-4-live-list)

### Example 1: *Single Page Application*

The following is how something you could call a Single Page Application ([SPA](https://en.wikipedia.org/wiki/Single-page_application)) could be made - with zero tooling:

+ *First, two components that are themselves analogous to a Single File Component ([SFC](https://vuejs.org/guide/scaling-up/sfc.html))*:

    <details><summary>Code</summary>

    ```html
    <template def="pages">

      <template def="layout">
        <header def="header"></header>
        <footer def="footer"></footer>
      </template>

      <!-- Home Page -->
      <template def="home" extends="layout">
        <main def="main" namespace>
          <h1 id="banner">Home Page</h1>
          <a id="cta" href="#/products">Go to Products</a>
          <template scoped></template>
          <style scoped></style>
          <script scoped></script>
        </main>
      </template>

      <!-- Products Page -->
      <template def="products" extends="layout">
        <main def="main" namespace>
          <h1 id="banner">Products Page</h1>
          <a id="cta" href="#/home">Go to Home</a>
          <template scoped></template>
          <style scoped></style>
          <script scoped></script>
        </main>
      </template>

    </template>
    ```

    </details>

+ *Then a 2-line router that alternates the view based on the URL hash*:

    <details><summary>Code</summary>

    ```html
    <body importscontext="/pages/home">

      <import ref="#header"></import>
      <import ref="#main"></import>
      <import ref="#footer"></import>
      
      <script>
      const route = () => { document.body.setAttribute('importscontext', '/pages' + location.hash.substring(1)); };
      window.addEventListener('hashchange', route);
      </script>
      
    </body>
    ```

    </details>

### Example 2: *Multi-Level Namespacing*

The following is a Listbox component lifted directly from the [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-grouped/#sc_label) but with IDs effectively "contained" at different levels within the component using the `namespace` attribute.

<details><summary>Code</summary>

```html
<div namespace class="listbox-area">
  <div>
    <span id="ss_elem" class="listbox-label">
      Choose your animal sidekick
    </span>
    <div id="ss_elem_list"
         tabindex="0"
         role="listbox"
         aria-labelledby="ss_elem">
      <ul role="group" aria-labelledby="cat" namespace>
        <li role="presentation" id="cat">
          Land
        </li>
        <li id="ss_elem_1" role="option">
          Cat
        </li>
        <li id="ss_elem_2" role="option">
          Dog
        </li>
        <li id="ss_elem_3" role="option">
          Tiger
        </li>
        <li id="ss_elem_4" role="option">
          Reindeer
        </li>
        <li id="ss_elem_5" role="option">
          Raccoon
        </li>
      </ul>
      <ul role="group" aria-labelledby="cat" namespace>
        <li role="presentation" id="cat">
          Water
        </li>
        <li id="ss_elem_6" role="option">
          Dolphin
        </li>
        <li id="ss_elem_7" role="option">
          Flounder
        </li>
        <li id="ss_elem_8" role="option">
          Eel
        </li>
      </ul>
      <ul role="group" aria-labelledby="cat" namespace>
        <li role="presentation" id="cat">
          Air
        </li>
        <li id="ss_elem_9" role="option">
          Falcon
        </li>
        <li id="ss_elem_10" role="option">
          Winged Horse
        </li>
        <li id="ss_elem_11" role="option">
          Owl
        </li>
      </ul>
    </div>
  </div>
</div>
```

</details>

### Example 3: *Dynamic Shadow DOM*

The following is a custom element that derives its Shadow DOM from an imported `<tenplate>` element. The idea is to have different Shadow DOM layouts defined and let the "usage" context decide which variant is imported!

+ *First, two layout options defined for the Shadow DOM*:

    <details><summary>Code</summary>

    ```html
    <template def="vendor1">

      <template def="components-layout1">
        <template def="magic-button">
          <span id="icon"></span> <span id="text"></span>
        </template>
      </template>

      <template def="components-layout2">
        <template def="magic-button">
          <span id="text"></span> <span id="icon"></span>
        </template>
      </template>

    </template>
    ```

    </details>

+ *Next, the Shadow DOM creation that imports its layout from context*:

    <details><summary>Code</summary>

    ```js
    customElements.define('magic-button', class extends HTMLElement {
      connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        this.import('@vendor1/magic-button', template => {
          shadowRoot.appendChild( template.content.cloneNode(true) );
        });
      }
    });
    ```

    </details>

+ *Then, the part where we just drop the component in "layout" contexts*:

    <details><summary>Code</summary>

    ```html
    <div contextname="vendor1" importscontext="/vendor1/components-layout1">

      <magic-button></magic-button>

      <aside contextname="vendor1" importscontext="/vendor1/components-layout2">
        <magic-button></magic-button>
      </aside>

    </div>
    ```

    </details>

### Example 4: *List Items*

The following is a "component" that derives its list items and other reusable snippets from "scoped" `<tenplate>` elements. The idea is to have a "self-contained" component that's all markup-based, not class-based!

<details><summary>Code</summary>

```html
<div namespace>

  <ul id="list"></ul>

  <template def="item" scoped>
    <li><a>Item</a></li>
  </template>

  <script scoped>
    // Import item template
    let itemImport = this.import('item');
    let itemTemplate = itemImport.value;

    // Iterate
    [ 'Item 1', 'Item 2', 'Item 3' ].forEach(entry => {
      const currentItem = itemTemplate.content.cloneNode(true);
      // Add to DOM
      this.namespace.list.appendChild(currentItem);
      // Render
      currentItem.innerHTML = entry;
    });
  </script>

</div>
```

</details>

### Example 4: *Live List*

The following is the same list as above but implemented as a live list! Here, we make a few changes: the script element is Stateful; the loop itself now uses the literal `for ... of` construct, [which is capable of rendering live lists](https://github.com/webqit/stateful-js/wiki#with-control-structures), so that any additions and removals on the original list is statically reflected!

<details><summary>Code</summary>

```html
<div namespace>

  <ul id="list"></ul>

  <template def="item" scoped>
    <li><a>Item</a></li>
  </template>

  <script scoped>
    // Import item template
    let itemImport = this.import('item');
    let itemTemplate = itemImport.value;

    // Iterate
    let items = [ 'Item 1', 'Item 2', 'Item 3' ];
    for (let entry of items) {
      const currentItem = itemTemplate.content.cloneNode(true);
      // Add to DOM
      this.namespace.list.appendChild(currentItem);
      // Remove from DOM whenever corresponding entry is removed
      if (typeof entry === 'undefined') {
        currentItem.remove();
        continue;
      }
      // Render
      currentItem.innerHTML = entry;
    }

    // Add a new entry
    setTimeout(() => items.push('Item 4'), 1000);
    // Remove an new entry
    setTimeout(() => items.pop(), 2000);
  </script>

</div>
```

</details>

## Getting Involved

All forms of contributions are welcome at this time. For example, syntax and other implementation details are all up for discussion. Also, help is needed with more formal documentation. And here are specific links:

+ [Project](https://github.com/webqit/oohtml)
+ [Documentation](https://github.com/webqit/oohtml/wiki)
+ [Discusions](https://github.com/webqit/oohtml/discussions)
+ [Issues](https://github.com/webqit/oohtml/issues)

## License

MIT.

[npm-version-src]: https://img.shields.io/npm/v/@webqit/oohtml?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/@webqit/oohtml
[npm-downloads-src]: https://img.shields.io/npm/dm/@webqit/oohtml?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/@webqit/oohtml
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@webqit/oohtml?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=@webqit/oohtml
[license-src]: https://img.shields.io/github/license/webqit/oohtml.svg?style=flat&colorA=18181B&colorB=F0DB4F
[license-href]: https://github.com/webqit/oohtml/blob/master/LICENSE
