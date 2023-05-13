# OOHTML

<!-- BADGES/ -->

<span class="badge-npmversion"><a href="https://npmjs.org/package/@webqit/oohtml" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@webqit/oohtml.svg" alt="NPM version" /></a></span> <span class="badge-npmdownloads"><a href="https://npmjs.org/package/@webqit/oohtml" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/@webqit/oohtml.svg" alt="NPM downloads" /></a></span>

<!-- /BADGES --> 

**[Motivation](#motivation) • [Overview](#an-overview) • [Polyfill](#the-polyfill) • [Design Discussion](#design-discussion) • [Getting Involved](#getting-involved) • [License](#license)**

Object-Oriented HTML (OOHTML) is a set of language features for authoring modular, reusable markup, and translating that to functional DOM-level objects! Everything comes together as a delightful holistic component architecture for the modern UI!

OOHTML is an upcoming proposal!

## Motivation

The web has generally outgrown HTML's idea of a monolith architecture which has held to the document as the unit of abstraction for scripts, style sheets, and element identifiers (the `id` attribute, and in some scenarios, the `name` attribute). Whereas you're trying to *model things* in markup and are thinking in objects, components, logical building blocks, reusable units of abstraction - as we have of things like [Vue's SFC](https://vuejs.org/api/sfc-spec.html), [Svelte component format](https://svelte.dev/docs#component-format-script), [11ty's WebC](https://www.11ty.dev/docs/languages/webc/#css-and-js-(bundler-mode)) - the language for the job is imposing a global namespace constraint!

With all of scripts, style sheets and standard identifiers being "unuseable" beyond the global scope, and in fact, tied to the global scope, **the amount of precision and coordination that must happen at the global level in the typical web page is just too unrealistic to go by hand**! This is one more thing that retains unecessary tooling in the modern application development story!

This project is a proposal for a new standards work that revisits much of the oldish monolith-oriented constraints in HTML that cause all the community-based wizardry around a *component* architecture to proliferate!

└ [See more in the introductory blog post](https://dev.to/oxharris/the-web-native-equations-1fragment1p-temp-slug-6661657?preview=ba70ad2c17f05b5761bc74516dbde8c9eff8b581a0420d87334fd9ef6bab9d6e6d3ab6aaf3fe02542bb9e7250d0a88a6df91dae40919aabcc9a07320)<sup>draft</sup>

## An Overview

OOHTML comes in three sets of features, and the following is an overview. A more detailed documentation for OOHTML is underway in the [project wiki](https://github.com/webqit/oohtml/wiki).

+ [Modular HTML](#modular-html)
+ [HTML Imports](#html-imports)
+ [Reactive HTML](#reactive-html)
+ [Put Together](#put-together)

> **Note**
> <br>This is documentation for `OOHTML@2.x`. (Looking for [`OOHTML@1.x`](https://github.com/webqit/oohtml/tree/v1.10.4)?)

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
let { styleSheets, scripts } = user; // APIs that are analogous to the document.styleSheets, document.scripts properties
```

└ [Modular HTML concepts](#)

### HTML Imports

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
document.import('/foo#fragment1', divElement => {
    console.log(divElement); // module:/foo#fragment2, received synchronously
});
```

```js
document.import('/foo/nested#fragment2', divElement => {
    console.log(divElement); // module:/foo/nested#fragment2;
});
```

└ *Scoped templates for object-scoped module system*:

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
document.querySelector('div').import('foo#fragment1', divElement => {
    console.log(divElement); // the local module: foo#fragment1
});
```

```js
// Using the HTMLImports API
document.querySelector('div').import('/foo#fragment1', divElement => {
    console.log(divElement); // the global module: foo#fragment1
});
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
document.querySelector('section').import('#fragment2', divElement => {
    console.log(divElement); // module:/foo/nested#fragment2
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
document.querySelector('div').import('@context1#fragment2', divElement => {
    console.log(divElement); // module:/foo/nested#fragment2
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
document.querySelector('div').import('#fragment2', divElement => {
    console.log(divElement); // the local module: foo#fragment2, and if not found, resolves from context to the module: /bar/nested#fragment2
});
```

</details>

└ [HTML Imports concepts](#)

### Reactive HTML

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

All of OOHTML brings to the platform much of the modern UI development paradigms that community-based tools have long encoded, and that just opens up new ways to leverage the web platform and bank less on abstractions! Here are a few examples in the wide range of use cases these features cover.

**--> Example 1:** The following is how something you could call a Single Page Application ([SPA](https://en.wikipedia.org/wiki/Single-page_application)) could be made - with zero tooling:

└ *First, two components that are themselves analogous to a Single File Component ([SFC](https://vuejs.org/guide/scaling-up/sfc.html))*:

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

**--> Example 2:** The following is a Listbox component lifted directively from [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-grouped/#sc_label) but with IDs effectively "contained" at different levels within the component using the `namespace` attribute.

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

**--> Example 3:** The following is a custom element that derives its Shadow DOM from an imported `<tenplate>` element. The idea is to have different Shadow DOM layouts defined and let the "usage" context decide which variant is imported!

└ *First, two layout options defined for the Shadow DOM*:

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

└ *Next, the Shadow DOM creation that imports its layout from context*:

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

└ *Then, the part where we just drop the component in "layout" contexts*:

```html
<div contextname="vendor1" importscontext="/vendor1/components-layout1">

  <magic-button></magic-button>

  <aside contextname="vendor1" importscontext="/vendor1/components-layout2">
    <magic-button></magic-button>
  </aside>

</div>
```

**--> Example 4:** The following is a "component" that derives its list items and other reusable snippets from "scoped" `<tenplate>` elements. The idea is to have a "self-contained" component that's all markup-based, not class-based!

└ *A list component with scoped module system*:

```html
<div namespace>

  <import ref="other"></import>
  <ul id="list"></ul>
  <import ref="other"></import>

  <template def="item" scoped>
    <li>
      <a></a>
    </li>
  </template>

  <template def="other" scoped>
    <button>Call to Action >><button>
  </template>

  <script scoped>
    this.import('item', template => {
      const clone = template.content.cloneNode(true);
      this.namespace.list.appendChild(clone);
    });
  </script>

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

> 23.54 KB min+compressed | 76.53KB min

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

The custom MIME type strategy also comes in as a "fix" for when in a browser or other runtime where the polyfill is not able to intercept `<script scoped>` and `<script contract>` elements ahead of the runtime - e.g. where...

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

But all things "SSR" for OOHTML are best left to the [`@webqit/oohtml-ssr`](https://github.com/webqit/oohtml-ssr) package!

Also, if you'll be going ahead to build a real world app to see OOHTML in action, you may want to consider also using:

+ the [`@webqit/oohtml-cli`](https://github.com/webqit/oohtml-cli) package for operating a file-based templating system.

+ the modest, OOHTML-based [Webflo](https://github.com/webqit/webflo) framework to greatly streamline your application development process!

</details>

<details><summary>
Implementation Notes
</summary>

Here are some performance-specific notes for this polyfill:

+ By default, the Contract Functions compiler (44.31 KB min+compressed | 157KB min) is excluded from the polyfill build and fetched separately on demand - on the first encounter with a Contract Script. This is loaded into a [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) and all compilations are able to happen off the main thread! This ensures near-zero cost to your application loading and runtime performance!

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

+ Whether loaded lazily or eagerly, the compiler also factors in additional optimizations. For example, identical scripts are handled only first time, and only ever have once Contract Function instance!

Here are other notes:

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

    A working implementation may be coming soon, but in the meantime, you could try one of the polyfills for `<style scoped>` out there; e.g. [samthor/scoped](https://github.com/samthor/scoped).

+ **HTML Imports**. The attribute names for exposing reusable modules and for referencing them - the `def` and `ref` keywords, respectively - aren't finalized. While the principle of operation remains, these attributes may be renamed in subsequent iterations. But the polyfill is designed to always defer to any syntax that has been explicitly specified using a meta tag. Here's an example:

    ```html
    <head>
      <meta name="html-imports" content="template.attr.moduledef=def; template.attr.fragmentdef=def; import.attr.moduleref=ref;"> <!-- Must come before the polyfil -->
      <script src="https://unpkg.com/@webqit/oohtml/dist/main.js"></script>
    <head>
    ```

    Now, even when the default attribute names change, your `def` and `ref` implementation will still work:
 
</details>

## Design Discussion

*[TODO]*

## Getting Involved

All forms of contributions are welcome at this time. For example, syntax and other implementation details are all up for discussion. Also, help is needed with more formal documentation. And here are specific links:

+ [Project](https://github.com/webqit/oohtml)
+ [Documentation](https://github.com/webqit/oohtml/wiki)
+ [Discusions](https://github.com/webqit/oohtml/discussions)
+ [Issues](https://github.com/webqit/oohtml/issues)

## License

MIT.
