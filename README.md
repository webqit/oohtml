# OOHTML

<!-- BADGES/ -->

<span class="badge-npmversion"><a href="https://npmjs.org/package/@webqit/oohtml" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@webqit/oohtml.svg" alt="NPM version" /></a></span> <span class="badge-npmdownloads"><a href="https://npmjs.org/package/@webqit/oohtml" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/@webqit/oohtml.svg" alt="NPM downloads" /></a></span>

<!-- /BADGES -->

**[Motivation](#motivation) • [Overview](#an-overview) • [Polyfill](#the-polyfill) • [Documentation](#documentation) • [Getting Involved](#getting-involved) • [License](#license)**

Object-Oriented HTML (OOHTML) is a set of language features for authoring modular, reusable markup, and translating that to functional DOM-level objects! Everything comes together as a delightful holistic component architecture for the modern UI!

OOHTML is an upcoming proposal!

> **Warning**
> <br>The syntax on this page isn't finalized. You may need to keep tabs with us.

## Motivation

The web has generally outgrown HTML's idea of a monolith architecture which has held to the document as the unit of abstraction for scripts, style sheets, and element identifiers (the `id` attribute, and in some scenarios, the `name` attribute). You realize that while you're trying to *model things* in markup and are thinking in objects, components, logical building blocks, reusable units of abstraction - as we have of things like [Vue's SFC](https://vuejs.org/api/sfc-spec.html), [Svelte component format](https://svelte.dev/docs#component-format-script), [11ty's WebC](https://www.11ty.dev/docs/languages/webc/#css-and-js-(bundler-mode)) - the language for the job is posing a "per document" constraint!

As a consequence, much of this oldish monolith-oriented language by design don't come any useful beyond the global scope in the modern application architecture; **scripts, style sheets and standard identifiers just don't participate in UI modular architectures**! But they're also not harmless! In fact, **it is the sheer global forces that these things constitute that makes it extremely difficult to write even basic modular, reusable markup**! Until we move away from the global scope, **the amount of precision and coordination that must happen at the global level in the typical web page is just too unrealistic without tooling**! UI development may forever invite undue tooling!

We need a new standards work that will coexist with seemingly related efforts like Web Components to address the language-level problems that cause all the community-based wizardry around *naming things*, *containing styles*, *containing scripts*, and *reusing things* to proliferate! HTML's vocabulary will need to be extended, and much of its "per document" constraints will need to be relaxed! New APIs that provide an upgrade path from markup to JavaScript will need to be factored in!

└ [See more in the introductory blog post](https://dev.to/oxharris/the-web-native-equations-1fragment1p-temp-slug-6661657?preview=ba70ad2c17f05b5761bc74516dbde8c9eff8b581a0420d87334fd9ef6bab9d6e6d3ab6aaf3fe02542bb9e7250d0a88a6df91dae40919aabcc9a07320)<sup>draft</sup>

## An Overview

OOHTML comes in three sets of features. (You may jump to sections.)

+ [Modular HTML](#modular-html)
+ [HTML Imports](#html-imports)
+ [Reactive HTML](#reactive-html)
+ [Put Together](#put-together)

### Modular HTML

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
let { styleSheets, scripts } = user; // Analogous to the document.styleSheets, document.scripts properties
```

└ [Modular HTML concepts](#)

### HTML Imports

The next set of features covers *templating and reusing objects* - in both *declarative* and *programmatic* terms! It extends the language with the *module identifier* attribute `as`, and introduces a complementary new `<import>` element; and everything fits together as a real-time module system.

└ *The `as` attribute for exposing reusable modules*:

```html
<head>

  <template as="foo">
    <div as="fragment1"></div>
    <div as="fragment2"></div>
  </template>

</head>
```

└ *Module nesting for code organization*:

```html
<head>

  <template as="foo">
    <div as="fragment1"></div>

    <template as="nested">
      <div as="fragment2"></div>
    </template>
  </template>

</head>
```

└ *The `<template src>` element for remote modules*:

```html
<template as="foo" src="/foo.html"></template>
```

```html
-- file: /foo.html --
<div as="fragment1"></div>
<template as="nested" src="/nested.html"></template>
```

```html
-- file: /nested.html --
<div as="fragment2"></div>
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
  <div as="fragment1"></div> <!-- After resolution -->
  <div as="fragment2"></div> <!-- After resolution -->
</body>
```

└ *The HTMLImports API for programmatic module import*:

```js
// Using the HTMLImport API for event-based module import
document.import('foo#fragment2', docFragment => {
    console.log(docFragment); // DucmentFragment:/foo#fragment2, received synchronously
});
```

```js
// Using the HTMLImports API
document.import('/foo/nested#fragment2', docFragment => {
    console.log(docFragment); // DucmentFragment:/foo/nested#fragment2;
});
```

└ *Scoped templates for object-scoped module system*:

```html
<section> <!-- object with own modules -->

  <template as="foo" scoped> <!-- Scoped to host object and not available globally -->
    <div as="fragment1"></div>
  </template>

  <div>
    <import ref="foo#fragment1"></import> <!-- Relative path (beginning without a slash), resolves to the local module: foo#fragment1 -->
    <import ref="/foo#fragment1"></import> <!-- Absolute path, resolves to the global module: /foo#fragment1 -->
  </div>

</section>
```

```js
// Using the HTMLImports API
document.querySelector('div').import('foo#fragment1', docFragment => {
    console.log(docFragment); // the local module: foo#fragment1
});
```

```js
// Using the HTMLImports API
document.querySelector('div').import('/foo#fragment1', docFragment => {
    console.log(docFragment); // the global module: foo#fragment1
});
```

<details><summary>
Extended Imports concepts
</summary>

└ *Module nesting with inheritance*:

```html
<template as="foo">

  <header as="header"></header>
  <footer as="footer"></footer>

  <template as="nested1" inherits="header footer"> <!-- Using the "inherits" attribute -->
    <main as="main"></main>
  </template>

  <template as="nested2" inherits="header footer"> <!-- Using the "inherits" attribute -->
    <main as="main"></main>
  </template>

</template>
```

```html
<template as="foo">

  <template as="common">
    <header as="header"></header>
    <footer as="footer"></footer>
  </template>

  <template as="nested1" extends="common"> <!-- Using the "extends" attribute -->
    <main as="main"></main>
  </template>

  <template as="nested2" extends="common"> <!-- Using the "extends" attribute -->
    <main as="main"></main>
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
<template as="foo" src="/foo.html" loading="lazy"></template>
```

```html
<body>
  <import ref="/foo#fragment1"></import> <!-- Triggers and awaits module loading -->
</body>
```

```js
// Using the HTMLImports API
document.import('foo#fragment1', docFragment => {
    console.log(docFragment); // First-time import? Triggers and awaits module loading! Subsequently? Accesses modules immediately
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
document.querySelector('section').import('#fragment2', docFragment => {
    console.log(docFragment); // module:/foo/nested#fragment2
});
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
document.querySelector('div').import('@context1#fragment2', docFragment => {
    console.log(docFragment); // module:/foo/nested#fragment2
});
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

    <template as="foo" scoped> <!-- Scoped to host object and not available globally -->
      <div as="fragment1"></div>
      <div as="fragment2"></div>
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
document.querySelector('div').import('#fragment2', docFragment => {
    console.log(docFragment); // the local module: foo#fragment2, and if not found, resolves from context to the module: /bar/nested#fragment2
});
```

</details>

└ [HTML Imports concepts](#)

### Reactive HTML

The last set of features covers the concept of "state", "bindings", and "reactivity" for those objects at the DOM level - in the most exciting form of the terms and as an upgrade path! This comes factored into the design as something intrinsic to the problem.

└ *The Observer API for general-purpose object observability*:

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

└ *"Contract Scripts" for reactive scripting*:

```html
<script contract>
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
  <script contract scoped>
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

### Put Together

All of OOHTML brings to the platform much of the modern UI development paradigms that community-based tools have encoded for years, and that just opens up new ways to leverage the web platform and bank less on abstractions! For example, the following is how something you could call a Single Page Application ([SPA](https://en.wikipedia.org/wiki/Single-page_application)) could be made - with zero tooling:

└ *First, two components that are themselves analogous to a Single File Component ([SFC](https://vuejs.org/guide/scaling-up/sfc.html))*:

```html
<template as="pages">

  <template as="layout">
    <header as="header"></header>
    <footer as="footer"></footer>
  </template>

  <!-- Home Page -->
  <template as="home" extends="layout">
    <main as="main" namespace>
      <h1 id="banner">Home Page</h1>
      <a id="cta" href="#/products">Go to Products</a>
      <template scoped></template>
      <style scoped></style>
      <script scoped></script>
    </main>
  </template>

  <!-- Products Page -->
  <template as="products" extends="layout">
    <main as="main" namespace>
      <h1 id="banner">Products Page</h1>
      <a id="cta" href="#/home">Go to Home</a>
      <template scoped></template>
      <style scoped></style>
      <script scoped></script>
    </main>
  </template>

</template>
```

└ *Then a 2-line router that alternates the view based on the URL hash*:

```html
<body importscontext="/pages/home">

  <import module="#header"></import>
  <import module="#main"></import>
  <import module="#footer"></import>
  
  <script>
  const route = () => { document.body.setAttribute('importscontext', '/pages' + location.hash.substring(1)); };
  window.addEventListener('hashchange', route);
  </script>
  
</body>
```

As another example - being that a wide range of use cases exists beyond the above, the following is a Listbox component lifted directively from [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-grouped/#sc_label) but with IDs effectively "contained" at different levels within the component using the `namespace` attribute.

└ *A Listbox with namespaced IDs*:

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

## The Polyfill

OOHTML is being developed as something to be used today - via a polyfill. This has been helping to facilitate the "release - iterations" loop and its overall evolution.

The polyfill can be loaded from the `unpkg.com` CDN, and should be placed early on in the document - before any OOHTML-specific features are used - and should be a classic script without any `defer` or `async` directives:

```html
<head>
  <script src="https://unpkg.com/@webqit/oohtml/dist/main.js"></script>
</head>
```

> 22.75KB min+gzipped | 76.53KB min

<details><summary>
Extended usage concepts
</summary>

If you must load the script "async", one little trade-off has to be made for `<script scoped>` and `<script contract>` elements to have them ignored by the browser until the polyfill comes picking them up: *employing a custom MIME type in place of the standard `text/javascript` and `module` types*, in which case, a `<meta name="scoped-js">` element is used to configure the polyfill to honor the custom MIME type:

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

The custom MIME type strategy also comes in as a "fix" for older browsers (in macOS, typical) where the polyfill is not able to intercept `<script scoped>` and `<script contract>` elements ahead of the browser - e.g. where...

```html
<body>
  <script scoped>
    console.log(this); // body
  </script>
</body>
```

...still gives the `window` object in the console.

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

But all things "SSR" for OOHTML is best left to the [`@webqit/oohtml-ssr`](https://github.com/webqit/oohtml-ssr) package!

Also, if you'll be going ahead to build a real world app to see OOHTML in action, you may want to consider also using:

+ the [`@webqit/oohtml-cli`](https://github.com/webqit/oohtml-cli) package for operating a file-based templating system.

+ the modest, OOHTML-based [Webflo](https://github.com/webqit/webflo) framework to greatly streamline your application development process!

</details>

<details><summary>
Notes
</summary>

Here are the performance-specific notes for this polyfill:

+ By default, the Contract Functions compiler (43.15KB min+gzipped | 157KB min) is excluded from the polyfill build and fetched separately on demand - on the first encounter with a Contract Script. This is loaded into a [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) and all compilations are able to happen off the main thread! This ensures near-zero cost to your application loading and runtime performance!

    Note that this lazy-loading approach means that all Contract Scripts will behave "async" just like module scripts; i.e. scripts are defered until the compiler has been loaded. In other words, the following two scripts will have the same timing semantics:

    ```html
    <script contract></script>
    <script type="module" contract></script>
    ```

    This isn't necessarily bad unless there is a requirment to have classic scripts follow their [native synchronous timing](https://html.spec.whatwg.org/multipage/parsing.html#scripts-that-modify-the-page-as-it-is-being-parsed), in which case the Contract Functions compiler will need to be explicitly and synchronously loaded ahead of any encounter with classic Contract Scripts:

    ```html
    <head>
      <script src="https://unpkg.com/@webqit/subscript@next/dist/compiler.js"></script> <!-- Must come before the polyfil -->
      <script src="https://unpkg.com/@webqit/oohtml/dist/main.js"></script>
    </head>
    ```

+ Whether loaded lazily or eaderly, the compiler also factors in additional optimizations. For example, identical scripts are handled only first time, and only ever have once Contract Function instance!

</details>

## Documentation

A more detailed documentation for OOHTML is underway in the [project wiki](https://github.com/webqit/oohtml/wiki).

> **Note**
> <br>This is documentation for `OOHTML@2.x`. (Looking for [`OOHTML@1.x`](https://github.com/webqit/oohtml/tree/v1.10.4)?)

<details>
<summary>Changes in v2:</summary>

> + HTML Modules <sup>(overhauled)</sup>
> + HTML Imports <sup>(overhauled)</sup>
> + Namespace API <sup>(overhauled)</sup>
> + Context API <sup>(new)</sup>
> + <ins>Bindings API</ins> <del>The State API</del>
> + <ins>Scoped JS</ins> <del>Subscript</del>
> + Scoped CSS <sup>new</sup>

</details>

## Getting Involved

All forms of contributions are welcome at this time. For example, syntax and other implementation details are all up for discussion. Also, help is needed with more formal documentation. And here are specific links:

+ [Project](https://github.com/webqit/oohtml)
+ [Documentation](https://github.com/webqit/oohtml/wiki)
+ [Discusions](https://github.com/webqit/oohtml/discussions)
+ [Issues](https://github.com/webqit/oohtml/issues)

## License

MIT.
