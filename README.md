# OOHTML

<!-- BADGES/ -->

<span class="badge-npmversion"><a href="https://npmjs.org/package/@webqit/oohtml" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@webqit/oohtml.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/@webqit/oohtml" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/@webqit/oohtml.svg" alt="NPM downloads" /></a></span>

<!-- /BADGES -->

[Object-Oriented HTML (OOHTML)](https://github.com/webqit/oohtml) is a suite of new DOM features that particularly facilitates writing modular HTML, CSS, and JavaScript *natively* and *more conveniently*. It addresses a number of limitions inherent to existing conventions, and welcomes much of the paradigms associated with modern UI development.

> OOHTML is being proposed as a [W3C standard at the Web Platform Incubator Community Group](https://discourse.wicg.io/t/proposal-chtml/4716) based on [this explainer](https://github.com/webqit/docs/tree/master/oohtml/explainer). Consider bringing your ideas to the discussion.

## Features
OOHTML proposes five new features to native web languages to make common UI design terminologies possible natively. These features may be used individually or together to improve how we author UI code.

### HTML Modules
HTML Modules is a new DOM feature that lets us work with `<template>` elements and their contents using the *module*, *import* and *export* paradigm. It introduces a clear naming convention for easy access to these elements and for organizing them *meaningfully* in a document.

```html
<template name="module1" src="/module.html"></template>
```

[Go to HTML Modules](https://webqit.io/tooling/oohtml#html-modules) - Learn more about the convention, API, events, and the polyfill support.

### HTML Imports
HTML Imports are a declarative way to place reusable snippets from HTML Modules just where they are needed across the DOM.

```html
<import name="export1" template="module1"></import>
```

[Go to HTML Imports](https://webqit.io/tooling/oohtml#html-imports) - Learn more about the convention, dynamicity, Slot Inheritance, isomorphic rendering, and the polyfill support.

### Namespaced HTML
Namespacing is a DOM feature that let's an element establish its own naming context for descendant elements. It makes it possible to keep IDs scoped to a context other than the document's global scope.

```html
<div namespace>
    <div id="scoped-id"></div>
</div>
```

[Go to Namespaced HTML](https://webqit.io/tooling/oohtml#namespaced-html) - Learn more about the convention, Namespaced Selectors, API, observability, and the polyfill support.

### The State API
The State API is a DOM feature that lets us maintain application state at both the document level and the individual element level. It makes it easy to think about application state at different levels in the DOM tree and to keep track of changes at each level.

```js
// At the document level
document.state.pageTitle = 'Hello World!';
console.log(document.state.pageTitle); // Hello World!

// At the element level
element.state.collapsed = true;
console.log(element.state.collapsed); // true
```

[Go to the State API](https://webqit.io/tooling/oohtml#the-state-api) - Learn more about the API, deep observability, and the polyfill support.

### Subscript
Subscript is a type of JavaScript runtime that lets us create scoped, *reactive* `<script>` elements across the UI. That gives us a UI binding language and the ability to have UI logic without involving an actual JavaScript file.

```html
<div id="alert">
    <script type="subscript">
        console.log(this.id); // alert
    </script>
</div>
```

[Go to Subscript](https://webqit.io/tooling/oohtml#subscript) - Learn more about the event-based runtime, deep observability, bindings, the API, error handling, and the polyfill support.

## Full Documentation
+ [HTML Modules](https://webqit.io/tooling/oohtml#html-modules)
+ [HTML Imports](https://webqit.io/tooling/oohtml#html-imports)
+ [Namespaced HTML](https://webqit.io/tooling/oohtml#namespaced-html)
+ [the State API](https://webqit.io/tooling/oohtml#the-state-api)
+ [Subscript](https://webqit.io/tooling/oohtml#subscript)

> [Project Homepage](https://webqit.io/tooling/oohtml)
> [Github DOCS](https://github.com/webqit/docs/tree/master/oohtml)
> [Features Explainer](https://github.com/webqit/docs/tree/master/oohtml/explainer)

## Supporting OOHTML
*Platform feature* proposals aren't the easiest thing in the world!

+ They have to be something everyone can agree on!

    If you indeed have a usecase for all, or aspects, of OOHTML, or have some opinions, you should please join the discussion at the [WICG](https://discourse.wicg.io/t/proposal-chtml/4716).
    
    If you are building something early with it (just as we are building [webqit.io](//webqit.io) with it), we'd like to hear from you via any means - [WICG](https://discourse.wicg.io/t/proposal-chtml/4716), [email - oxharris.dev@gmail.com], [issue](https://github.com/webqit/oohtml/issues). And Pull Requests are very welcomed!
+ They have to go through a million iterations! And much in dollars go into that!

    If you could help in some way, we'd be more than glad! If you'd like to find out how to, or whether as much as $1 counts, or if there are perks for supporting, you should indeed reach out - oxharris.dev@gmail.com.

## FAQs
We are working on publishing some questions we've been asked, but you can always file an [issue](https://github.com/webqit/oohtml/issues) to ask a new question or raise a suggestion.

## Issues
To report bugs or request features, please submit an [issue](https://github.com/webqit/oohtml/issues).

## License
MIT.
