# OOHTML

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![License][license-src]][license-href]

**[Explainer](#explainer) • [On the Agenda](#on-the-agenda) • [Modular HTML](#modular-html) • [HTML Imports](#html-imports) • [Data Binding](#data-binding) • [Data Plumbing](#data-plumbing) • [Polyfill](#polyfill) • [Examples](#examples) • [License](#license)**

Object-Oriented HTML (OOHTML) is a set of features that extend standard HTML and the DOM to enable authoring modular, reusable and reactive markup - with a "buildless" and intuitive workflow as design goal! This project revisits the HTML problem space to solve for an object-oriented approach to HTML!

Building Single Page Applications? OOHTML is a special love letter! Writing Web Components? Now you can do so with zero tooling! Love vanilla HTML but can't go far with that? Well, now you can!

<details><summary>Versions</summary>

*This is documentation for `OOHTML@4`. (Looking for [`OOHTML@1`](https://github.com/webqit/oohtml/tree/v1.10.4)?)*

</details>

## Status

+ Working implementation via a polyfill
+ Actively developed
+ Open to contributions

## Polyfill

OOHTML is being developed as something to be used today. This implementation adheres closely to the spec and helps evolve the proposal through a practice-driven process.

<details><summary>Load from a CDN<br>
└───────── <a href="https://bundlephobia.com/result?p=@webqit/oohtml"><img align="right" src="https://img.shields.io/badge/21.8%20kB-black"></a></summary>

```html
<script src="https://unpkg.com/@webqit/oohtml/dist/main.lite.js"></script>
```

└ This is to be placed early on in the document and should be a classic script without any `defer` or `async` directives!

> For `@webqit/oohtml@3.1` and below, you would need an external polyfill - like the [samthor/scoped](https://github.com/samthor/scoped) polyfill - for the Scoped Styles feature:
>
> ```html
> <head>
>   <script src="https://unpkg.com/style-scoped/scoped.min.js"></script>
> </head>
> ```

</details>

<details><summary>Install from NPM<br>
└───────── <a href="https://npmjs.com/package/@webqit/oohtml"><img align="right" src="https://img.shields.io/npm/v/@webqit/oohtml?style=flat&label=&colorB=black"></a></summary>

```bash
npm i @webqit/oohtml @webqit/quantum-js
```

```js
// Import
import * as Quantum from '@webqit/quantum-js/lite'; // Or from '@webqit/quantum-js'; See implementation notes below
import init from '@webqit/oohtml/src/init.js';

// Initialize the lib
init.call(window, Quantum[, options = {}]);
```

└ To use the polyfill on server-side DOM instances as made possible by libraries like [jsdom](https://github.com/jsdom/jsdom), simply install and initialize the library with the DOM instance as above.

└ But all things "SSR" for OOHTML are best left to the [`@webqit/oohtml-ssr`](https://github.com/webqit/oohtml-ssr) package!

</details>

<details><summary>Extended usage concepts</summary>

If you'll be going ahead to build a real app with OOHTML, you may want to consider also using:

+ the [`@webqit/oohtml-cli`](https://github.com/webqit/oohtml-cli) package for operating a file-based templating system.

+ the modest, OOHTML-based [Webflo](https://github.com/webqit/webflo) framework to greatly streamline your workflow!

</details>

<details><summary>Implementation Notes</summary>

+ **Scoped/Quantum Scripts**. This feature is an extension of [Quantum JS](https://github.com/webqit/quantum-js). While the main OOHTML build is based on the main Quantum JS APIs, a companion "OOHTML Lite" build is also available based on the [Quantum JS Lite](https://github.com/webqit/quantum-js#quantum-js-lite) edition. The trade-off is in the execution timing of `<script quantum></script>` and `<script scoped></script>` elements: being "synchronous/blocking" with the former, and "asynchronous/non-blocking" with the latter! (See [`async`/`defer`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attributes).)

    Of the two, the "OOHTML Lite" edition is the recommend option on web pages (as used above) for faster load times unless there's a requirment to emulate the [native synchronous timing](https://html.spec.whatwg.org/multipage/parsing.html#scripts-that-modify-the-page-as-it-is-being-parsed) of classic scripts, in which case you'd need the main OOHTML build:

    ```html
    <head>
      <script src="https://unpkg.com/@webqit/oohtml/dist/main.js"></script>
    </head>
    ```

    └─ <a href="https://bundlephobia.com/result?p=@webqit/oohtml"><img align="right" src="https://img.shields.io/bundlephobia/minzip/@webqit/oohtml?label=&style=flat&colorB=black"></a>

+ **Loading Requirements**. As specified above, the OOHTML script tag is to be placed early on in the document and should be a classic script without any `defer` or `async` directives!
    
    If you must load the script "async", one little trade-off would have to be made for `<script scoped>` and `<script quantum>` elements to have them ignored by the browser until the polyfill comes picking them up: *employing a custom MIME type in place of the standard `text/javascript` and `module` types*, in which case, a `<meta name="scoped-js">` element is used to configure the polyfill to honor the custom MIME type:

    ```html
    <head>
      <meta name="scoped-js" content="script.mimeType=some-mime">
      <script async src="https://unpkg.com/@webqit/oohtml/dist/main.lite.js"></script>
    </head>
    <body>
      <script type="some-mime" scoped>
        console.log(this); // body
      </script>
    </body>
    ```

    The custom MIME type strategy also comes in as a "fix" for when in a browser or other runtime where the polyfill is not able to intercept `<script scoped>` and `<script quantum>` elements ahead of the runtime - e.g. where...

    ```html
    <body>
      <script scoped>
        console.log(this); // body
      </script>
    </body>
    ```

    ...still gives the `window` object in the console.

+ **Syntax**. The syntax for attribute names and API names across features - e.g. the `def` and `ref` attributes, the `render` attribute - isn't finalized, and may change on subsequent iterations, albeit with same principle of operation. But the polyfill is designed to be configurable via meta tags, and to honour any such "overrides". Here's an example:

    ```html
    <head>
      <!-- Configurations come before the polyfil -->
      <meta name="data-binding" content="attr.render=render;">
      <meta name="namespaced-html" content="attr.id=id;">
      <meta name="html-imports" content="attr.def=def; attr.ref=ref;">
      <script src="https://unpkg.com/@webqit/oohtml/dist/main.js"></script>
    <head>
    ```

    Now, even when the default syntax change, your `def`, `ref`, etc. overrides will keep your implementation intact.

    Additionally, you could employ a global prefix in your implementation:

    ```html
    <meta name="webqit" content="prefix=wq;">
    ```

    ...which automatically applies to all `webqit` attributes and APIs (with the exception of the `scoped`, `quantum`, and `data-*` attributes), such that:

    + `<template def="foo"></template>` now becomes: `<template wq-def="foo"></template>`,
    + `<import ref="foo"></import>` now becomes: `<wq-import wq-ref="foo"></wq-import>`,
    + `document.import()` now becomes: `document.wqImport()`,
    + `document.bind()` now becomes: `document.wqBind()`,
    + `document.bindings` now becomes: `document.wqBindings`,
    + etc.

    <details><summary>Show the full syntax table</summary>

    **Spec: `<meta name="data-binding">`**

    | Config | Default Syntax | Description |
    | :----- | :------------- | :---------- |
    | `attr.render` | `render` | The "render" attribute for inline data binding. ([Docs](#inline-data-binding)) |
    | `attr.itemIndex` | `data-index` | The "item index" attribute for assigning indexes to list items. ([Docs](#inline-data-binding))  |

    **Spec: `<meta name="bindings-api">`**

    | Config | Default Syntax | Description |
    | :----- | :------------- | :---------- |
    | `attr.bindingsreflection` | `bindings` | The attribute for exposing an element's bindings. |
    | `api.bind` | `bind` | The `document.bind()` and `Element.prototype.bind()` methods. ([Docs](#the-bindings-api)) |
    | `api.bindings` | `bindings` | The `document.bindings` and `Element.prototype.bindings` object properties. ([Docs](#the-bindings-api)) |

    **Spec: `<meta name="context-api">`**

    | Config | Default Syntax | Description |
    | :----- | :------------- | :---------- |
    | `attr.contextname` | `contextname` | The "context name" attribute on arbitrary elements. ([Docs](#the-context-api)) |
    | `api.contexts` | `contexts` | The `document.contexts` and `Element.prototype.contexts` object properties. ([Docs](#the-context-api)) |

    **Spec: `<meta name="html-imports">`**

    | Config | Default Syntax | Description |
    | :----- | :------------- | :---------- |
    | `elements.import` | `import` | The tag name for "import" elements. ([Docs](#html-imports)) |
    | `attr.def` | `def` | The "definition" attribute on the `<template>` elements. ([Docs](#module-definition)) |
    | `attr.fragmentdef` | *Inherits the value of `attr.def`* | The "definition" attribute on a `<template>`'s contents. ([Docs](#module-definition)) |
    | `attr.extends` | `extends` | The "extends" attribute for extending definitions. ([Docs](#module-inheritance)) |
    | `attr.inherits` | `inherits` | The "inherits" attribute for inheriting definitions. ([Docs](#module-inheritance)) |
    | `attr.ref` | `ref` | The "import ref" attribute on "import" elements. ([Docs](#declarative-module-imports)) |
    | `attr.importscontext` | `importscontext` | The "importscontext" attribute on arbitrary elements. ([Docs](#imports-contexts)) |
    | `api.def` | `def` | The readonly string property for accessing an element's "def" value. ([Docs](#module-definition)) |
    | `api.defs` | `defs` | The readonly object property for accessing a `<template>`'s list of definitions. ([Docs](#module-definition)) |
    | `api.import` | `import` | The `document.import()` and `Element.prototype.import()` methods. ([Docs](#imperative-module-imports)) |


    **Spec: `<meta name="namespaced-html">`**

    | Config | Default Syntax | Description |
    | :----- | :------------- | :---------- |
    | `attr.namespace` | `namespace` | The "namespace" attribute on arbitrary elements. ([Docs](#namespacing)) |
    | `attr.id` | `id` | The "id" attribute on arbitrary elements. ([Docs](#namespacing)) |
    | `api.namespace` | `namespace` | The "namespace" object property on arbitrary elements. ([Docs](#namespacing)) |

    **Spec: `<meta name="scoped-css">`** (TODO)

    **Spec: `<meta name="scoped-js">`** (TODO)

    </details>

</details>

## Explainer

<details><summary>Show</summary>

Amidst a multitude of approaches, vanilla HTML remains an attractive option for the UI author! But the current authoring experience still leaves much to be desired in how the language lacks modularity, reusability, and certain modern paradigms like data binding! Authors still have to rely on tools - and, for the most part, have to do half of the work in HTML and half in JS - to express even basic concepts!

"As an author, I want to be able to do 'x' *declaratively* in HTML instead of *imperatively* in JavaScript or by means of a special Custom Element!" "As a Web Component author, I want to be able to leverage *conventions* that keep my component logic *concise*!" All such "user stories" represent important developer intuitions that has yet to be met in HTML; much of which belong under a broad subject: an object-oriented markup language! This subject is what we explore with OOHTML!

OOHTML comes, not as a specific technology, but as a conceptual "framework" of features that solves for HTML as an object-oriented language - whether that means re-aligning existing features or introducing new ones! While features may be discussed or explored individually, the one agenda "Object-Oriented HTML" helps us stay aligned with the original problem! Each of these features has been introduced below with a small explainer.

OOHTML is effectively different from Web Components (and from the related Declarative Custom Elements and Declarative Shadow DOM efforts) in its focus on "arbitrary" HTML and the DOM rather than on just the Custom Element or Shadow DOM "subset" of the language. This in turn lets us have a niftier authoring experience in Web Components as the latter actually just relies on the very HTML and DOM.

</details>

## On the Agenda

+ [Modular HTML](#modular-html)
+ [HTML Imports](#html-imports)
+ [Data Binding](#data-binding)
+ [Data Plumbing](#data-plumbing)

## Modular HTML

The modern UI is best approached with a modular architecture (think UI component frameworks) wherein we are able to author in bits and pieces while having each piece *encapsulate* their structure, styling and logic!

OOHTML makes this possible by introducing "namespacing" and style and script scoping!

### Namespacing

Naming things is hard! That's especially so where you have one global namespace and a miriad of potentially conflicting identifiers to coordinate!

<details><summary>Learn more</summary>

You want to see how IDs are, in fact, by default, exposed as global variables:

```html
<div id="foo"><div>
```

```js
console.log(window.foo); // div
```

[Read more](https://stackoverflow.com/questions/6381425/is-there-a-spec-that-the-id-of-elements-should-be-made-global-variable)

</details>

Here, we get a modular naming convention that let's us create a naming context for identifiers in a given subtree - by means of a new `namespace` attribute:

```html
<form>

  <fieldset namespace>
    <legend>Home Address</legend>

    <label for="~address-line">Address</label>
    <input id="address-line">

    <label for="~city">City</label>
    <input id="city">
  <fieldset>

  <fieldset namespace>
    <legend>Delivery Address</legend>

    <label for="~address-line">Address</label>
    <input id="address-line">
    
    <label for="~city">City</label>
    <input id="city">
  <fieldset>

</form>
```

This lets us have repeating structures with identical but non-conflicting identifiers. These identifiers are then referenced locally using "local `IDREFS`" - denoted by the `~` prefix.

Local `IDREFS` are resolved within the namespace where they're used (not globally; not deeply):

```js
// Matches "#city" within the fieldset's namespace; not super namespace, not sub namespace 
const city = fieldset.querySelector('#~city');
```

And when used from the document context, these are resolved against top-level IDs; i.e. IDs in the document namespace itself (not deeply):

```html
<div id="user" namespace>
  <a id="url" href="https://example.org">
    <span id="name">Joe Bloggs</span>
  </a>
  <a id="email" href="mailto:joebloggs@example.com" >joebloggs@example.com</a>
</div>
```

```js
// Namespace aware ID selectors
console.log(document.querySelector('#user')); // div#user
console.log(document.querySelector('#~user')); // div#user

console.log(document.getElementById('user')); // div#user
console.log(document.getElementById('~user')); // div#user

console.log(document.querySelector('#url')); // a#url
console.log(document.querySelector('#~url')); // null... not directly in the "document" namespace

console.log(document.getElementById('url')); // a#url
console.log(document.getElementById('~url')); // null... not directly in the "document" namespace
```

And these also play well as navigation targets, with additional support for path expressions given a hierarchy of namespaces:

```html
<a href="#~user/email">Jump to Email</a>
```

And JavaScript applications are able to consume namespace structures as an object model:

```html
user
 ├── url
 ├── name
 └── email
```

```js
// The document.namespace API
let { user } = document.namespace;
// The Element.prototype.namespace API
let { url, name, email } = user.namespace;
```

<details><summary>All in realtime</summary>

The Namespace API is designed to always reflect the DOM in real-time. This may be observed using the general-purpose object observability API - [Observer API](https://github.com/webqit/observer):

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

</details> 

<details><summary>Implementation details</summary>

In the current implementation, a small random string is automatically prepended to each ID and IDREF token in the DOM to give the browser something "unique" to work with, but without that implementation detail leaking into your application. So, while an element may be seen in the browser console as having a random hash prepended to their ID or IDREF:

```html
<!-- Original -->
<label for="~real-id">Question 1:</label>
<input id="real-id">
```

```html
<!-- Transformed -->
<label for="~hg3j:real-id">Question 1:</label>
<input id="~hg3j:real-id">
```

the values your application sees are the unprefixed IDs and IDREFs:

```js
console.log(label.htmlFor); // ~real-id
console.log(input.id); // real-id

console.log(label.getAttribute('for')); // ~real-id
console.log(input.attributes[0].value); // real-id
```

Now, for URL targets, e.g. `#~user/email`, the "target" element is given a custom `:target` class while it matches the URL fragment, and this may be accessed in CSS as:

```css
.\:target {
  background-color: whitesmoke;
}
```

or, to be more complete:

```css
:target, .\:target {
  background-color: whitesmoke;
}
```

</details>

### Style and Script Scoping

We often need a way to keep component-specific style sheets and scripts [scoped to a component](https://vuejs.org/guide/scaling-up/sfc.html). **This is especially crucial to "page components" in an SPA architecture.**

Here, we get a new `scoped` attribute that lets us do just that:

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

And the special namespace-aware ID selector is supported from within scoped style sheets:

```html
<div namespace>
  <a id="url" href="https://example.org">
    <span id="name">Joe Bloggs</span>
  </a>
  <a id="email" href="mailto:joebloggs@example.com" >joebloggs@example.com</a>

  <style scoped>
    #\~name { color: red }
  </style>
</div>
```

And everything comes with a complementary low-level API that exposes said assets to tools:

```js
let { styleSheets, scripts } = user; // APIs that are analogous to the document.styleSheets, document.scripts properties
```

<details><summary>Learn more</summary>

Here, the `scoped` attribute has two effects on the `<script>` element:

+ The `this` keyword is implicitly bound to the script's host element
+ The `<script>` element is (re)executed on each re-insertion into the DOM

</details>

## HTML Imports

HTML Imports is a realtime *import* system for HTML that's drawn entirely on HTML - and which addresses a different pain point in comparison to [the abandoned `<link type="import">` feature](https://www.w3.org/TR/html-imports/) and the [HTML Modules proposal](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/html-modules-explainer.md)! **Something like it is the [`<defs>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs) and [`<use>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use) system in SVG.**

Here, we get a way to both define and reuse a snippet out of *same* document:

```html
<head>

  <template def="foo">
    <div></div>
  </template>

</head>
<body>

  <import ref="foo"></import>

</body>
```

...while optionally supporting remote content without a change in paradigm:

```html
<head>

  <template def="foo" src="/foo.html"></template>

</head>
<body>

  <import ref="foo"></import>
  
</body>
```


OOHTML makes this possible in a simple new `def` attribute and a complementary new `<import>` element!

### Module Definition

A "module" here is any piece of markup that can be reused.

Here, we get the `def` attribute for defining those - both at the `<template>` element level and at its direct children (*fragments*) level:

```html
<head>

  <template def="foo">
    <div def="fragment1">A module fragment that can be accessed independently</div>
    <div def="fragment2">Another module fragment that can be accessed independently</div>
    <p>An element that isn't explicitly exposed.</p>
  </template>

</head>
```

**-->** *with module nesting for code organization*:

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

We shouldn't need a different mechanism to work with remote content.

Here, OOHTML extends the `<template>` with an `src` attribute that lets us have self-loading `<template>` elements:

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
```

**-->** *which just draws on the existing semantics of `src` in elements like `<img>`; terminating with either a `load` or an `error` event*:

```js
foo.addEventListener('load', loadCallback);
foo.addEventListener('error', errorCallback);
```

### Declarative Module Imports

HTML snippets should be reusable entirely out of HTML! So, we get an `<import>` element that lets us do just that:

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

<details><summary>All in realtime</summary>

Here, import *refs* are live bindings that are sensitive to:

+ changes in the *ref* itself (as to *refs* that are later defined/undefined/redefined)
+ changes in the referenced *defs* themselves (as to these later becoming available/loaded/unavailable)

And an `<import>` element that has been resolved will self-restore in the event that:

+ the above changes invalidate the reference.
+ the previously slotted contents have *all* been programmatically removed and slot is empty.

</details>

<details><summary>With SSR support</summary>

On the server, these `<import>` elements will retain their place in the DOM, but this time, serialized into comment nodes, while having their output rendered just above them as siblings.

The above resolved imports would thus give us something like:

```html
<body>
  <div def="fragment1"></div>
  <!--&lt;import ref="/foo#fragment1"&gt;&lt;/import&gt;-->
  <div def="fragment2"></div>
  <!--&lt;import ref="/foo/nested#fragment2"&gt;&lt;/import&gt;-->
</body>
```

But they also will need to remember the exact imported nodes that they manage so as to be able to re-establish relevant relationships on getting to the client. This information is automatically encoded as part of the serialised element itself, in something like:

```html
<!--&lt;import ref="/foo/nested#fragment2" nodecount="1"&gt;&lt;/import&gt;-->
```

Now, on getting to the client and getting "hydrated" back into an `<import>` element, that extra bit of information is decoded, and original relationships are formed again. But, the `<import>` element itself stays invisible in the DOM while still continuing to kick as above!

> Note: We know we're on the server when `window.webqit.env === 'server'`. This flag is automatically set by OOHTML's current SSR engine: [OOHTML-SSR](https://github.com/webqit/oohtml-ssr)

</details>

### Imperative Module Imports

JavaScript applications will need more than a declarative import mechanism.

Here, we get an *HTMLImports* API for imperative module import:

```js
const moduleObject1 = document.import('/foo#fragment1');
console.log(moduleObject1.value); // divElement
```

```js
const moduleObject2 = document.import('/foo/nested#fragment2');
console.log(moduleObject2.value); // divElement
```

**-->** *with the `moduleObject.value` property being a live property for when results are delivered asynchronously; e.g. in the case of remote modules*:

```js
Observer.observe(moduleObject2, 'value', e => {
    console.log(e.value); // divElement
});
```

**-->** *with an equivalent `callback` option on the `import()` API itself*:

```js
document.import('/foo#fragment1', divElement => {
    console.log(divElement);
});
```

**-->** *with an optional `live` parameter for staying subscribed to live results*:

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

*...both of which get notified on doing something like the below*:

```js
document.querySelector('template[def="foo"]').content.firstElementChild.remove();
```

**-->** *with a `moduleObject.abort()` method for unsubscribing from live updates*:

**-->** *with an optional `signal` parameter for passing in a custom `AbortSignal` instance*:

```js
const abortController = new AbortController;
const moduleObject2 = document.import('/foo/nested#fragment2', { live: true, signal: abortController.signal });
```

```js
setTimeout(() => {
  abortController.abort(); // which would also call moduleObject2.abort()
}, 1000);
```

<!--<details><summary>Extended Imports concepts</summary>-->

### Lazy-Loading Modules

We should be able to defer module loading until we really need them.

Here, we get the `loading="lazy"` directive for that; and loading is only then triggered on the first attempt to import those or their contents:

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

### Module Inheritance

We'll often have repeating markup structures across component layouts.

Here, we get module nesting with inheritance to facilitate more reusability:

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

We should be able to have *relative* import refs that resolve against local contexts in the document tree.

Here, we call these "Imports Contexts", and these could be:

+ Simple Base Path Contexts ([below](#base-path-contexts))
+ Scoped Module Contexts ([below](#scoped-module-contexts))
+ Named Contexts ([below](#named-contexts))
+ Extended Scoped Module Contexts ([below](#extended-scoped-module-contexts))

And to facilitate working with contexts, we also get an `Element.prototype.import()` API that is context-aware.

#### "Base Path" Contexts

Base paths may be defined at arbitrary levels in the page using the `importscontext` attribute:

```html
<body importscontext="/foo">
  <section>
    <import ref="#fragment1"></import> <!-- Relative path (beginning without a slash), resolving to: /foo#fragment1 -->
  </section>
</body>
```

```html
<body importscontext="/foo/nested">
  <main>
    <import ref="#fragment2"></import> <!-- Relative path (beginning without a slash), resolving to: /foo/nested#fragment2 -->
  </main>
</body>
```

**-->** *with said base paths being able to "nest" nicely*:

```html
<body importscontext="/foo">

  <section>
    <import ref="#fragment1"></import> <!-- Relative path (beginning without a slash), resolves to: /foo#fragment1 -->
  </section>

  <div importscontext="nested"> <!-- Relative path (beginning without a slash), resolves to: /foo/nested -->
    
    <main>
      <import ref="#fragment2"></import> <!-- Relative path (beginning without a slash), resolves to: /foo/nested#fragment2 -->
    </main>

  </div>

</body>
```

**-->** *with the `Element.prototype.import()` API for equivalent context-based imports*:

```js
// Using the HTMLImports API to import from context
const contextElement = document.querySelector('section');
const response = contextElement.import('#fragment1'); // Relative path (beginning without a slash), resolving to: /foo#fragment1
```

```js
// Using the HTMLImports API to import from context
const contextElement = document.querySelector('main');
const response = contextElement.import('#fragment2'); // Relative path (beginning without a slash), resolving to: /foo/nested#fragment2
```

#### "Scoped Module" Contexts

Some modules will only be relevant within a specific context in the page, and those wouldn't need to have a business with the global scope.

Here, we get the `scoped` attribute for scoping those to their respective hosts, to give us an *object-scoped* module system (like what Scoped Registries seek to be to Custom Elements):

```html
<section> <!-- Host object -->

  <template def="foo" scoped> <!-- Scoped to host object and not available globally -->
    <div def="fragment1"></div>
  </template>

  <div>
    <import ref="foo#fragment1"></import> <!-- Relative path (beginning without a slash), resolving to the local module: foo#fragment1 -->
    <import ref="/foo#fragment1"></import> <!-- Absolute path, resolving to the global module: /foo#fragment1 -->
  </div>

</section>
```

**-->** *with the `Element.prototype.import()` API for equivalent context-based imports*:

```js
// Using the HTMLImports API for local import
const contextElement = document.querySelector('div');
const localModule = moduleHost.import('foo#fragment1'); // Relative path (beginning without a slash), resolving to the local module: foo#fragment1
```

```js
// Using the HTMLImports API for global import
const contextElement = document.querySelector('div');
const globalModule = contextElement.import('/foo#fragment1'); // Absolute path, resolving to the global module: /foo#fragment1 
```

#### Named Contexts

Imports Contexts may be named for direct referencing:

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

**-->** *with the `Element.prototype.import()` API for equivalent context-based imports*:

```js
// Using the HTMLImports API to import from a named Imports Context
const contextElement = document.querySelector('div');
const result = contextElement.import('@context1#fragment2'); // Resolving to the module:/foo/nested#fragment2
```

#### Extended Scoped Module Contexts

Scoped Module Contexts may also have a Base Path Context that they inherit from:

```html
<body contextname="context1" importscontext="/bar">
  <section importscontext="nested"> <!-- object with Scoped Modules, plus inherited context: /bar/nested -->

    <template def="foo" scoped> <!-- Scoped to host object and not available globally -->
      <div def="fragment1"></div>
      <div def="fragment2"></div>
    </template>

    <div>
      <import ref="foo#fragment2"></import> <!-- Relative path (beginning without a slash), resolving to the local module: foo#fragment2, and if not found, the inherited module: /bar/nested/foo#2 -->
      <import ref="/foo#fragment1"></import> <!-- Absolute path, resolving to the global module: /foo#fragment1 -->
      <import ref="@context1#fragment1"></import> <!-- Relative path with a named context, resolving to the global module: /bar#fragment1 -->
    </div>

  </section>
</body>
```

**-->** *with the `Element.prototype.import()` API for equivalent context-based imports*:

```js
// Using the HTMLImports API
const contextElement = document.querySelector('div');
const result = contextElement.import('foo#fragment2'); // the local module: foo#fragment2, and if not found, the inherited module: /bar/nested#fragment2
```

<!--</details>-->

## Data Binding

Data binding is the idea of declaratively binding the UI to application data, wherein the relevant parts of the UI *automatically* update as application state changes.

OOHTML makes this possible in just simple conventions - via a new comment-based data-binding syntax `<?{ }?>` and a complementary new `render` attribute!

And for when we need to write extensive reactive logic on the UI, a perfect answer: Quantum Scripts!

### Discrete Data-Binding

Here, we get a comment-based data-binding syntax `<?{ }?>` (or `<!--?{ }?-->`), **which works as a regular HTML comment** but also as an insertion point for application data:

```js
<html>
  <head>
    <title></title>
  </head>
  <body>
    <hi><?{ app.title }?></h1>
    Hi, I'm <?{ name ?? 'Default name' }?>!
    and here's another way to write the same comment: <!--?{ cool }?-->
  </body>
</html>
```

<details><summary>Resolution details</summary>

Here, JavaScript references are resolved from the closest node up the document tree that exposes a corresponding *binding* on its Bindings API ([discussed below](#bindings-api)). For the above markup, our underlying data structure could be something like the below:

```js
document.bind({ name: 'James Boye', cool: '100%', app: { title: 'Demo App' } });
document.body.bind({ name: 'John Doe' });
```

```js
document: { name: 'James Boye', cool: '100%', app: { title: 'Demo App' } }
 └── html
  ├── head
  └── body: { name: 'John Doe' }
```

Now, the `name` reference remains bound to the `name` *binding* on the `<body>` element until the meaning of "closest node" changes again:

```js
delete document.body.bindings.name;
```

While the `cool` reference remains bound to the `cool` *binding* on the `document` node until the meaning of "closest node" changes again:

```js
document.body.bindings.cool = '200%';
```

</details>

<details><summary>With SSR support</summary>

On the server, these data-binding tags will retain their place in the DOM while having their output rendered to their right in a text node.

The following expression: `<?{ 'Hello World' }?>` would thus give us: `<?{ 'Hello World' }?>Hello World`.

But they also will need to remember the exact text node that they manage, so as to be able to re-establish relevant relationships on getting to the client. That information is automatically encoded as part of the declaration itself, and that brings us to having a typical server-rendered binding in the following form:

```html
<?{ 'Hello World'; [=11] }?>Hello World
```

Now, on getting to the client, that extra bit of information gets decoded, and original relationships are forned again. But the binding tag itself graciously disappears from the DOM, while the now "hydrated" text node continues to kick!

> Note: We know we're on the server when `window.webqit.env === 'server'`. This flag is automatically set by OOHTML's current SSR engine: [OOHTML-SSR](https://github.com/webqit/oohtml-ssr)

</details>

### Inline Data-Binding

For attribute-based data binding, OOHTML deviates from the usual (and problematic) idea of bringing markup-style bindings into attribute texts: `title="Hello { titleValue }"`, **as though attributes had the same semantics as markup**. Instead, we get a dedicated "render" attribute - `render` - for a nifty, key/value data-binding language:

> Note that in OOHTML <= v3 the `render` attribute was `expr`.

```html
<div render="<directive> <param>: <arg>;"></div>
```

**-->** *where*:

+ *`<directive>` is a directive, which is always a symbol*
+ *`<param>` is the parameter being bound, which could be a CSS property, class name, attribute name, Structural Directive - depending on the givin directive*
+ *`<arg>` is the bound value or expression*

**-->** *which would give us the following for a CSS property*:

```html
<div render="& color:someColor; & backgroundColor:'red'"></div>
```

**-->** *without being space-sensitive*:

```html
<div render="& color:someColor; &backgroundColor: 'red'"></div>
```

**-->** *the rest of which can be seen below*:

| Directive | Type | Usage |
| :---- | :---- | :---- |
| `&`  | CSS Property | `<div render="& color:someColor; & backgroundColor:someBgColor;"></div>` |
| `%`  | Class Name | `<div render="% active:app.isActive; % expanded:app.isExpanded;"></div>` |
| `~`  | Attribute Name | `<a render="~ href:person.profileUrl+'#bio'; ~ title:'Click me';"></a>` |
|   | Boolean Attribute | `<a render="~ ?required:formField.required; ~ ?aria-checked: formField.checked"></a>` |
| `@`  | Structural Directive: | *See below* |
| `@text`   | Plain text content | `<span render="@text:firstName+' '+lastName;"></span>` |
| `@html`   | Markup content | `<span render="@html: '<i>'+firstName+'</i>';"></span>` |
|  `@items`  | A list, of the following format | `<declaration> <of\|in> <iterable> / <importRef>`<br>*See next two tables* |

<details><summary><code>For ... Of</code> Loops</summary>

|  Idea | Usage |
| :---- | :---- |
| A `for...of` loop over an array/iterable | `<ul render="@items: value of [1,2,3] / 'foo#fragment';"></ul>` |
| Same as above but with a `key` declaration  | `<ul render="@items: (value,key) of [1,2,3] / 'foo#fragment';"></ul>` |
| Same as above but with different variable names  | `<ul render="@items: (product,id) of store.products / 'foo#fragment';"></ul>` |
| Same as above but with a dynamic `importRef`  | `<ul render="@items: (product,id) of store.products / store.importRef;"></ul>` |

</details>

<details><summary><code>For ... In</code> Loops</summary>

| Idea | Usage |
| :---- | :---- |
| A `for...in` loop over an object | `<ul render="@items: key in {a:1,b:2} / 'foo#fragment';"></ul>` |
| Same as above but with a `value` and `index` declaration | `<ul render="@items: (key,value,index) in {a:1, b:2} / 'foo#fragment';"></ul>` |

</details>

<details><summary>Resolution details</summary>

Here, JavaScript references are resolved from the closest node up the document tree that exposes a corresponding *binding* on its Bindings API ([discussed below](#bindings-api)). For the above CSS bindings, our underlying data structure could be something like the below:

```js
document.bind({ someColor: 'green', someBgColor: 'yellow' });
document.body.bind({ someBgColor: 'silver' });
```

```js
document: { someColor: 'green', someBgColor: 'yellow' }
 └── html
  ├── head
  └── body: { someBgColor: 'silver' }
```

Now, the `someBgColor` reference remains bound to the `someBgColor` *binding* on the `<body>` element until the meaning of "closest node" changes again:

```js
delete document.body.bindings.someBgColor;
```

While the `someColor` reference remains bound to the `someColor` *binding* on the `document` node until the meaning of "closest node" changes again:

```js
document.body.bindings.someColor = 'brown';
```

</details>

<details><summary>All in realtime</summary>

Bindings are resolved in realtime! And in fact, for lists, in-place mutations - additions and removals - on the *iteratee* are automatically reflected on the UI!

</details>

<details><summary>With SSR support</summary>

For lists, generated item elements are automatically assigned a corresponding key with a `data-key` attribute! This helps in remapping generated item nodes to their corresponding entry in *iteratee* during a rerendering or during hydration.

</details>

### Quantum Scripts

We often still need to write more serious reactive logic on the UI than a declarative data-binding language can provide for. But we shouldn't need to reach for special tooling or some "serious" programming paradigm on top of JavaScript.

Here, from the same `<script>` element we already write, we get a direct upgrade path to reactive programming in just the addition of an attribute: `quantum` - for [Quantum Scripts](https://github.com/webqit/quantum-js):

```html
<script quantum>
  // Code here
  console.log(this); // window
</script>
```

```html
<script type="module" quantum>
  // Code here
  console.log(this); // undefined
</script>
```

**-->** *which gives us fine-grained reactivity on top of literal JavaScript syntax; and which adds up really well with the `scoped` attribute for Single Page Applications*:

```html
<main>

  <script scoped quantum>
    // Code here
    console.log(this); // main
  </script>

</main>
```

```html
<main>

  <script type="module" scoped quantum>
    // Code here
    console.log(this); // main
  </script>

</main>
```

**-->** *with content being whatever you normally would write in a `<script>` element, minus the "manual" work for reactivity*:

```html
<main>

  <script type="module" scoped quantum>
    import { someAPI } from 'some-module';

    let clickCount = 0;
    console.log(clickCount);
    someAPI(clickCount);

    this.addEventListener('click', e => clickCount++);
  </script>

</main>
```

**-->** *within which dynamic application state/data, and even things like the Namespace API above, fit seamlessly*:

```html
<main namespace>

  <script scoped quantum>
    if (this.namespace.specialButton) {
      console.log('specialButton present!');
    } else {
      console.log('specialButton not present!');
    }
    let specialButton = this.namespace.specialButton;
    console.log(specialButton);
  </script>

</main>
```

```js
const main = document.querySelector('main');
const button = document.createElement('button');
button.id = 'specialButton';

const addButton = () => {
  main.appendChild(button);
  setTimeout(removeButton, 5000);
};
const removeButton = () => {
  button.remove();
  setTimeout(addButton, 5000);
};
```

<details><summary>Learn more</summary>

It's Imperative Reactive Programming ([IRP](https://en.wikipedia.org/wiki/Reactive_programming#Imperative)) right there and it's the [Quantum](https://github.com/webqit/quantum-js) runtime extension to JavaScript!

Here, the runtime executes your code in a special execution mode that gets literal JavaScript expressions to statically reflect changes. This makes a lot of things possible on the UI! The [Quantum JS](https://github.com/webqit/quantum-js) documentation has a detailed run down.

Now, in each case above, reactivity terminates on script's removal from the DOM or via a programmatic approach:

```js
const script = document.querySelector('script[quantum]');
// const script = document.querySelector('main').scripts[0];
script.state.dispose();
// which also happens on doing script.remove()
```

But note that while said termination is automatic on script's removal, DOM event handlers bound via `addEventListener()` would still need to be terminated in their own way.

</details>

## Data Plumbing

Components often need to manage, and be driven by, dynamic application state. That could get pretty problematic and messy if all of that should go on DOM nodes as direct properties:

<details><summary>Example</summary>

```js
// Inside a custom element
connectedCallback() {
  this.prop1 = 1;
  this.prop2 = 2;
  this.prop3 = 3;
  this.style = 'tall-dark'; // ??? - conflict with the standard HTMLElement: style property
}
```

```js
// Outside the component
const node = document.querySelector('my-element');
node.prop1 = 1;
node.prop2 = 2;
node.prop3 = 3;
node.normalize = true; // ??? - conflict with the standard Node: normalize() method
```

</details>

This calls for a decent API and some data-flow mechanism!

### The Bindings API

A place to maintain state need not be a complex state machine! Here, that comes as a simple, read/write, data object exposed on the document object and on DOM elements as a readonly `bindings` property. This is the Bindings API.

**-->** *it's an ordinary JavaScript object that can be read and mutated*:

```js
// Read
console.log(document.bindings); // {}
// Modify
document.bindings.app = { title: 'Demo App' };
console.log(document.bindings.app); // { title: 'Demo App' }
```

```js
const node = document.querySelector('div');
// Read
console.log(node.bindings); // {}
// Modify
node.bindings.style = 'tall-dark';
node.bindings.normalize = true;
```

**-->** *with a complementary `bind()` method that lets us make multiple mutations in one batch*:

```js
// ------------
// Set multiple properties
document.bind({ name: 'James Boye', cool: '100%', app: { title: 'Demo App' } });

// ------------
// Replace existing properties with a new set
document.bind({ signedIn: false, hot: '100%' });
// Inspect
console.log(document.bindings); // { signedIn: false, hot: '100%' }

// ------------
// Merge a new set of properties with existing
document.bind({ name: 'James Boye', cool: '100%' }, { merge: true });
// Inspect
console.log(document.bindings); // { signedIn: false, hot: '100%', name: 'James Boye', cool: '100%' }
```

**-->** *which also provides an easy way to pass data down a component tree*:

```js
// Inside a custom element
connectedCallback() {
  this.child1.bind(this.bindings.child1Data);
  this.child2.bind(this.bindings.child2Data);
}
```

**-->** *and with the Observer API in the picture all the way for reactivity*:

```js
Observer.observe(document.bindings, mutations => {
  mutations.forEach(mutation => console.log(mutation));
});
```

```js
// Inside a custom element
connectedCallback() {
  Observer.observe(this.bindings, 'style', e => {
    // Compunonent should magically change style
    console.log(e.value);
  });
}
```

```js
const node = document.querySelector('my-element');
node.bindings.style = 'tall-dark';
```

<details><summary>Implementation details</summary>

In the current OOHTML implementation, the `document.bindings` and `Element.prototype.bindings` APIs are implemented as proxies over their actual bindings interface to enable some interface-level reactivity. This lets us have reactivity over literal property assignments and deletions on these interfaces:

```js
node.bindings.style = 'tall-dark'; // Reactive assignment
delete node.bindings.style; // Reactive deletion
```

For mutations at a deeper level to be reactive, the corresponding Observer API method would need to be used:

```js
Observer.set(document.bindings.app, 'title', 'Demo App!!!');
Observer.deleteProperty(document.bindings.app, 'title');
```

</details>

### The Context API

Component trees on the typical UI often call for more than the normal "top-down" flow of data that the Bindings API facilitates. We still often require the ability to "look up" the component tree to directly access specific data, or in other words, get data from "context". This is where a Context API comes in.

Interestingly, the Context API is the underlying "resolution" infrastructure for the Namespace API and the Data Binding and HTML Imports features in OOHTML!

Here, we simply leverage the DOM's existing event system to fire a "request" event and let an arbitrary "provider" in context fulfill the request. This becomes very simple with the Context API which is exposed on the document object and on element instances as a readonly `contexts` property.

**-->** *with the `contexts.request()` method for firing requests*:

```js
// ------------
// Get an arbitrary
const node = document.querySelector('my-element');

// ------------
// Prepare and fire request event
const requestParams = { kind: 'html-imports', detail: '/foo#fragment1' };
const response = node.contexts.request(requestParams);

// ------------
// Handle response
console.log(response.value); // It works!
```

**-->** *and the `contexts.attach()` and  `contexts.detach()` methods for attaching/detaching providers at arbitrary levels in the DOM tree*:

```js
// ------------
// Define a CustomContext class
class FakeImportsContext extends DOMContext {
  static kind = 'html-imports';
  handle(event) {
    console.log(event.detail); // '/foo#fragment1'
    event.respondWith('It works!');
  }
}

// ------------
// Instantiate and attach to a node
const fakeImportsContext = new FakeImportsContext;
document.contexts.attach(fakeImportsContext);

// ------------
// Detach anytime
document.contexts.detach(fakeImportsContext);
```

<details><summary>Details</summary>

In the current OOHTML implementation, the Context API interfaces are exposed via the global `webqit` object:

```js
const { DOMContext, DOMContextRequestEvent, DOMContextResponse, DuplicateContextError } = window.webqit;
```

Now, by design...

+ a provider will automatically adopt the `contextname`, if any, of its host element:

    ```html
    <div contextname="context1"></div>
    ```

    ```js
    // Instantiate and attach to a node
    const host = document.querySelector('div');
    const fakeImportsContext = new FakeImportsContext;
    host.contexts.attach(fakeImportsContext);
    // Inspect name
    console.log(fakeImportsContext.name); // context1
    ```

    ...which a request could target:

    ```js
    const requestParams = { kind: FakeImportsContext.kind, targetContext: 'context1', detail: '/foo#fragment1' };
    const response = node.contexts.request(requestParams);
    ```

+ and providers of same kind could be differentiated by an extra "detail" - an arbitrary value passed to the constructor:

    ```js
    const fakeImportsContext = new FakeImportsContext('lorem');
    console.log(fakeImportsContext.detail); // lorem
    ```

+ and a provider could indicate to manually match requests where the defualt "kind" matching, and optional "targetContext" matching, don't suffice:

    ```js
    // Define a CustomContext class
    class CustomContext extends DOMContext {
      static kind = 'html-imports';
      matchEvent(event) {
        // The default request matching algorithm + "detail" matching
        return super.matchEvent(event) && event.detail === this.detail;
      }
      handle(event) {
        console.log(event.detail);
        event.respondWith('It works!');
      }
    }
    ```

+ and a request could choose to stay subscribed to changes on the requested data; the request would simply add a `live` flag:

    ```js
    // Set the "live" flag
    const requestParams = { kind: FakeImportsContext.kind, targetContext: 'context1', detail: '/foo#fragment1', live: true };
    ```

    ...then stay alert to said updates on the returned `DOMContextResponse` object or specify a callback function at request time:

    ```js
    // Handle response without a callback
    const response = node.contexts.request(requestParams);
    console.log(response.value); // It works!
    Observer.observe(response, 'value', e => {
      console.log(e.value); // It works live!
    });
    ```

    ```js
    // Handle response with a callback
    node.contexts.request(requestParams, value => {
      console.log(value);
      // It works!
      // It works live!
    });
    ```

    ...while provider simply checks for the `event.live` flag and keep the updates flowing:

    ```js
    // Define a CustomContext class
    class CustomContext extends DOMContext {
      static kind = 'html-imports';
      handle(event) {
        event.respondWith('It works!');
        if (event.live) {
          setTimeout(() => {
            event.respondWith('It works live!');
          }, 5000);
        }
      }
    }
    ```

    ...or optionally implement a `subscribed` and `unsubscribed` lifecycle hook for when a "live" event enters and leaves the instance:

    ```js
    // Define a CustomContext class
    class CustomContext extends DOMContext {
      static kind = 'html-imports';
      subscribed(event) {
        console.log(this.subscriptions.size); // 1
      }
      unsubscribed(event) {
        console.log(this.subscriptions.size); // 0
      }
      handle(event) {
        event.respondWith('It works!');
        if (event.live) {
          setTimeout(() => {
            event.respondWith('It works live!');
          }, 5000);
        }
      }
    }
    ```

+ live requests are terminated via the returned `DOMContextResponse` object...

    ```js
    response.abort();
    ```

    ...or via an initially specified custom `AbortSignal`:

    ```js
    // Add a signal to the original request
    const abortController = new AbortController;
    const requestParams = { kind: FakeImportsContext.kind, targetContext: 'context1', detail: '/foo#fragment1', live: true, signal: abortController.signal };
    ```

    ```js
    abortController.abort(); // Which also calls response.abort();
    ```

+ now, where a node in a provider's subtree is suddenly attached an identical provider, any live requests the super provider may be serving are automatically "claimed" by the sub provider:

    ```js
    document: // 'fake-provider' here
    └── html
      ├── head
      └── body:  // 'fake-provider' here. Our request above is now served from here.
    ```

    And where the sub provider is suddenly detached from said node, any live requests it may have served are automatically hoisted back to super provider.

    ```js
    document: // 'fake-provider' here. Our request above is now served from here.
    └── html
      ├── head
      └── body:
    ```

    While, in all, the requesting code is spared all of that "admin" work!

</details>

**-->** *all of which gives us a standardized API across context-based features in HTML - like HTMLImports and Data Binding*:

```html
<div contextname="vendor1">
  <div contextname="vendor2">
    ...

      <my-element>
        <!-- Declarative import -->
        <import ref="@vendor1/foo#fragment1"></import>
        <!-- Declarative Data Binding -->
        <?{ @vendor2.app.title }?>
      </my-element>

    ...
  </div>
</div>
```

```js
// ------------
// Equivalent import() approach
const response = myElement.import('@vendor1/foo#fragment1');

// ------------
// Equivalent Context API approach
const requestParams = { kind: 'html-imports', targetContext: 'vendor1', detail: 'foo#fragment1' };
const response = myElement.contexts.request(requestParams);

// ------------
// Handle response
console.log(response.value);
```

```js
// ------------
// Context API request for bindings
const requestParams = { kind: 'bindings', targetContext: 'vendor2', detail: 'app' };
const response = myElement.contexts.request(requestParams);

// ------------
// Handle response
console.log(response.value.title);
```

## Examples

Here are a few examples in the wide range of use cases these features cover. While we'll demonstrate the most basic form of these scenarios, it takes roughly the same principles to build an intricate form and a highly interactive UI.

<details><summary>Example 1: <i>Single Page Application</i><br>
└───────── </summary>

The following is how something you could call a Single Page Application ([SPA](https://en.wikipedia.org/wiki/Single-page_application)) could be made - with zero tooling:

**-->** *First, two components that are themselves analogous to a Single File Component ([SFC](https://vuejs.org/guide/scaling-up/sfc.html))*:

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

**-->** *Then a 2-line router that alternates the view based on the URL hash*:

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

<details><summary>Example 2: <i>Multi-Level Namespacing</i><br>
└───────── </summary>

The following is a Listbox component lifted directly from the [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-grouped/#sc_label) but with IDs effectively "contained" at different levels within the component using the `namespace` attribute.

```html
<div namespace class="listbox-area">
  <div>
    <span id="ss_elem" class="listbox-label">
      Choose your animal sidekick
    </span>
    <div id="ss_elem_list"
         tabindex="0"
         role="listbox"
         aria-labelledby="~ss_elem">
      <ul role="group" namespace aria-labelledby="~cat">
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
      <ul role="group" namespace aria-labelledby="~cat">
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
      <ul role="group" namespace aria-labelledby="~cat">
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

<details><summary>Example 3: <i>Dynamic Shadow DOM</i><br>
└───────── </summary>

The following is a custom element that derives its Shadow DOM from an imported `<tenplate>` element. The idea is to have different Shadow DOM layouts defined and let the "usage" context decide which variant is imported!

**-->** *First, two layout options defined for the Shadow DOM*:

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

**-->** *Next, the Shadow DOM creation that imports its layout from context*:

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

**-->** *Then, the part where we just drop the component in "layout" contexts*:

```html
<div contextname="vendor1" importscontext="/vendor1/components-layout1">

  <magic-button></magic-button>

  <aside contextname="vendor1" importscontext="/vendor1/components-layout2">
    <magic-button></magic-button>
  </aside>

</div>
```

</details>

<details><summary>Example 4: <i>Declarative Lists</i><br>
└───────── </summary>

The following is a hypothetical list page!

```html
<section>

  <!-- The "items" template -->
  <template def="item" scoped>
    <li><a render="~href: '/animals#'+name;"><?{ index+': '+name }?></a></li>
  </template>

  <!-- The loop -->
  <ul render="@items: (name,index) of ['dog','cat','ram'] / 'item';"></ul>

</section>
```

</details>

<details><summary>Example 5: <i>Imperative Lists</i><br>
└───────── </summary>

The following is much like the above, but imperative. Additions and removals on the data items are also statically reflected!

```html
<section namespace>

  <!-- The "items" template -->
  <template def="item" scoped>
    <li><a>Item</a></li>
  </template>

  <!-- The loop -->
  <ul id="list"></ul>

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

</section>
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
