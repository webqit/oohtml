# OOHTML

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![License][license-src]][license-href]

**[Overview](#overview) • [Modular HTML](#modular-html) • [HTML Imports](#html-imports) • [Reactive HTML](#reactive-html) • [Polyfill](#polyfill) • [Examples](#examples) • [License](#license)**

Object-Oriented HTML (OOHTML) is a set of language features for authoring modular, reusable markup, and for translating that to functional DOM-level objects! Everything comes together as a delightful holistic component architecture for the modern UI!

OOHTML is an upcoming proposal!

## Motivation

<details><summary>Show</summary>

The web has generally outgrown the idea of a monolith architecture on the UI! But enter HTML; the current authoring experience is one where an author is trying to think out one thing but forced to work out everything, in how the language for the job poses one global scope as the unit of abstraction for styles, scripts and element identifiers — enforcing many global dependencies; inflicting much global thinking!

Think too of how authors often have to do half of the work in HTML and half in JS just to have reusable markup!

This project is a proposal for a new standards work that revisits much of the oldish monolith-oriented constraints in HTML that inhibit the idea of a *component* architecture in HTML!

└ [See more in the introductory blog post](https://dev.to/oxharris/the-web-native-equations-1m1p-temp-slug-6661657?preview=ba70ad2c17f05b5761bc74516dbde8c9eff8b581a0420d87334fd9ef6bab9d6e6d3ab6aaf3fe02542bb9e7250d0a88a6df91dae40919aabcc9a07320)<sup>draft</sup>

</details>

## Overview

OOHTML comes in three sets of features, and the following is an overview. A more detailed documentation for OOHTML is underway in the [project wiki](https://github.com/webqit/oohtml/wiki).

+ [Modular HTML](#modular-html)
+ [HTML Imports](#html-imports)
+ [Reactive HTML](#reactive-html)
+ [Put Together](#put-together)

> **Note**  This is documentation for `OOHTML@2.x`. (Looking for [`OOHTML@1.x`](https://github.com/webqit/oohtml/tree/v1.10.4)?)

## Modular HTML

The first set of features covers authoring objects with self-contained structure, styling and *scripting*! This simply gets identifiers, style sheets and scripts to serve *at the object level* exactly as they do *at the document (object) level*.

└ *Namespaced IDs for modelling structure*:

```html
<div id="user" namespace>
  <a id="url" href="https://example.org">
    <span id="name">Joe Bloggs</span>
  </a>
  <a id="email" href="mailto:joebloggs@example.com" >joebloggs@example.com</a>
</div>
```
 
```html
user
 ├── url
 ├── name
 └── email
```

```js
// The namespace API
let { user } = document.namespace;
let { url, name, email } = user.namespace;
```

└ *Scoped styles and scripts for styling and functionality*:

```html
<div id="user">

  <style scoped>
    :scope { color: red }
  </style>

  <script scoped>
    console.log(this) // div
  </script>

</div>
```

```js
let { styleSheets, scripts } = user; // APIs that are analogous to the document.styleSheets, document.scripts properties
```

└ [Modular HTML concepts](#)

## HTML Imports

The next set of features covers *templating and reusing objects* - in both *declarative* and *programmatic* terms! It extends the language with the *module identifier* attribute `def`, and introduces a complementary new `<import>` element, and has everything working together as a real-time module system.

└ *The `def` attribute for reusable "module" and "fragment" definitions*:

```html
<head>

  <template def="foo">
    <div def="fragment1">A module fragment that can be accessed independently</div>
    <div def="fragment2">Another module fragment that can be accessed independently</div>
    <p>An element that isn't explicitly exposed.</p>
  </template>

</head>
```

└ *Module nesting for code organization*:

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

└ *The `<template src>` element for remote modules*:

```html
<template def="foo" src="/foo.html"></template>
```

```html
-- file: /foo.html --
<div def="fragment1"></div>
<template def="nested" src="/nested.html"></template>
```

```html
-- file: /nested.html --
<div def="fragment2"></div>
--
```

```js
foo.addEventListener('load', loadedCallback);
```

└ *The `<import>` element for declarative module import*:

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

└ *The HTMLImports API  for programmatic module import*:

```js
const import1 = document.import('/foo#fragment1');
console.log(import1); // { value: div }
```

```js
const import2 = document.import('/foo/nested#fragment2');
console.log(import2); // { value: div }
```

└ *Scoped templates for object-scoped module system*:
> With an equivalent `Element.prototype.import()` API for accessing scoped modules

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

<details><summary>
Extended Imports concepts
</summary>

└ *Module nesting with inheritance*:

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

└ *Remote modules with lazy-loading*:

```html
<!-- Loading doesn't happen until the first time this is being accessed -->
<template def="foo" src="/foo.html" loading="lazy"></template>
```

```html
<body>
  <import ref="/foo#fragment1"></import> <!-- To be resolved after remote module has been loaded -->
</body>
```

```js
document.import('/foo#fragment1', divElement => {
    console.log(divElement); // To be received after remote module has been loaded
});
```

```js
const import1 = document.import('/foo#fragment1', true);
console.log(import1); // { value: undefined }
Observer.observe(import1, 'value', divElement => {
    console.log(divElement); // To be received after remote module has been loaded
});
```

└ *"Imports Contexts" for context-based imports resolution*:

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

└ *"Imports Contexts" with named contexts*:

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

└ *"Imports Contexts" with context inheritance*:

```html
<body importscontext="/foo">

  <import ref="#fragment1"></import> <!-- Relative path (beginning without a slash), resolves to: /foo#fragment1 -->

  <section importscontext="nested"> <!-- Relative path (beginning without a slash), resolves to: /foo/nested -->
    <import ref="#fragment2"></import> <!-- Relative path (beginning without a slash), resolves to: /foo/nested#fragment2 -->
  </section>

</body>
```

└ *Object-scoped module system with context inheritance*:

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

└ [HTML Imports concepts](#)

## Reactive HTML

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

└ *A Namespace API that reflects the real-DOM&trade; in real-time*:

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
