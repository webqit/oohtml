# CHTML Explainer

## Table of Contents

+ [Background](#background)
+ [Introducing CHTML - One More Technology Suite, Side-By-Side With Web Components](#introducing-chtml---one-more-technology-suite-side-by-side-with-web-components)
    + [Scoped HTML](#scoped-html)
    + [Scoped CSS](#scoped-css)
    + [Scoped JS](#scoped-js)
    + [HTML Partials](#html-partials)
+ [Examples](#examples)
    + [A Tooling Example](#a-tooling-example)
    + [A TODO List Example](#a-todo-list-example)
    + [A Single Page Application Example](#a-single-page-application-example)
    + [Other Examples](#other-examples)
+ [Conclusion](#conclusion)

## Background

After over many years now of trying to make success of web components, it has still been necessary to propose additional platform features to better support modern UI development. We find a good number of proposals at [WICG](https://discourse.wicg.io) and GitHub, and important posts out there in the community in this problem domain.

But while we could go on and on talking over additions to Web Components, this proposal is pursuant to empowering the platform as a whole, not just a subset of it. As we will see, the problems dicussed here aren't just deficiencies in Web Components; these are gaps at the language level that we've got to address at the language level!

## Introducing CHTML - One More Technology Suite, Side-By-Side With Web Components

CHTML is a suite of new DOM features that brings platform support for modern UI development paradigms - data-binding and reactivity, component composition and distribution, and lots more. It aims to make it possible to build functional user interfaces out of language primitives and native APIs. This will be helping us bank more on the platform and less on abstractions.

Now, instead of introducing totally new ideas, CHTML chooses to *look within* to find new possibilities with existing platform features. It is designed to work side-by-side with Web Components and to bring some of Shadow DOM's exclusive features to the open HTML.

> I'm excited to say that CHTML already has a working polyfill from the [Web-Native](https://github.com/web-native/chtml) project. By simply including the polyfill on a page, the ideas discussed here can be seen. In fact, the upcoming [Web-Native.dev site](https://web-native.dev) is a live example of CHTML at work.

### Scoped HTML

"Naming things" is a long-standing **pain** in HTML! We've been historically stuck with IDs and classes for naming and finding elements in a document. Now, we face a terrible challenge writing collision-free IDs and CSS selectors as HTML only thinks in a global namespace. And for those modular parts of our page - widgets, structural blocks, etc, we have to settle for clunky modular naming conventions, like [BEM](https://getbem.com).

A token of this problem can be seen in the following *continents* article with repeating modular blocks:

```html
<article id="continents">
    <section class="continent europe">
        <div class="continent__about">About Europe</b></div>
        <div class="continent__countries">Countries in Europe</div>
    </section>
    <section class="continent asia">
        <div class="continent__about">About Asia</b></div>
        <div class="continent__countries">Countries in Asia</div>
    </section>
</article>
```

This verbose, class-based convention, in whichever flavour, isn't a pleasure for anyone! This is especially so as it finds its way into stylesheets and scripts that target these elements! It becomes a real pain as the whole thing grows at the scale of the document!

The thought of the web settling for this for the long haul is disturbing!

**What We Want**

A **neat** and **collision-free** naming specs for HTML!

**Scoped HTML**

Scoped HTML is a (proposed) DOM feature that let's an element establish its own naming context for descendant elements. It makes it possible to keep IDs out of HTML's global namespace and gives us a document that is structured as a hierarchy of *scopes* and *subscopes*.

Scopes are designated with the `namespace` Boolean attribute.

The following ID is scoped:

```html
<div namespace>
    <div>
        <div id="some-id"></div>
    </div>
</div>
```

At scale, what we get is a **hierarchy of *scopes* and *subscopes***. Now, meet the more decent *#continents* article below.

```html
<article id="continents" namespace>
    <section id="europe" namespace>
        <div id="about">About Europe</b></div>
        <div id="countries">Countries in Europe</div>
    </section>
    <section id="asia" namespace>
        <div id="about">About Asia</b></div>
        <div id="countries">Countries in Asia</div>
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

We should now see how this also solves the historic **selector wars** with CSS and scripts.

#### Namespaced Selectors

With namespaces in markup, we can have Namespaced CSS Selectors - in a backwards-compatible manner!
+ The forward slash `/` could be introduced to denote a namespace boundary. The regular ID selector `#`will have to be scoped to namespace boudaries. So, to query deeply-scoped IDs, we would do: `#continents / #europe / #about`.
+ The regular `querySelector()` and `querySelectorAll()` DOM methods will have to be upgraded to support namespace boudaries.
+ URL fragment identifiers will need to be path-based to reference an element deep in the scope hierarchy. (We find that discussions are already underway [here](https://github.com/whatwg/html/issues/3509), and probabbly elswhere too, to reform the nature of fragment identifiers; this becomes a good time to bake-in path notation.)

#### The Namespace API

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

This gives an application a more bankable tree than the DOM tree as it lets a UI block hide its implementation details while exposing its relevant parts by role. Coincidentally, we find a similar point with [Stuart P.'s Parts and Walls](https://github.com/stuartpb/pwalls-spec) proposal from 2015. Also, we find something close to this in the Web Components specs on exposing a component's internals by name:
+ Shadow Parts - for styling purposes;
+ Slots - for compositional purposes.

##### Scope Observability

An element's `.namespace` property is implemented as a live object that reflects the element's namespace tree in real time. CHTML also supports the [Observer API](https://docs.web-native.dev/observer) for change detection; [`Obs.observe()`](https://docs.web-native.dev/observer/api/observe) can thus be used to observe when new IDs are added to the namespace or existing IDs removed.

```js
Obs.observe(continents.namespace, changes => {
    console.log(changes.map(change => change.name));
});
```

With the code below, our observer above should report having added a new ID `africa` to the namespace.

```js
continents.append('<section id="africa"></section>');
```

#### Current Implementation of Scoped HTML

All of *Scoped HTML*, excluding [*Namespaced Selectors*](#namespaced-selectors), is currently implemented in [the CHTML polyfill](https://docs.web-native.dev/chtml/installation) from Web-Native. This implementation makes use of mutation observers. It is also making do with the `scoped:id` attribute instead of the actual `id` attribute - to respect the current validition of HTML documents.

On the feasibility of a native implementation of scoped IDs, we find that this can come at no risk to pre-CHTML websites as their lack of *namespaces* can forever keep their IDs scoped to the document root.

[Read the full Scoped HTML docs](https://docs.web-native.dev/chtml/scoped-html)

### Scoped CSS

CHTML *reproposes* the ability to scope a stylesheet as a language feature and not just a thing of the Shadow DOM. With scope-based markup in mind, we now have an additional use-case for Scoped CSS.

With support for [*Namespaced Selectors*](#namespaced-selectors), Scoped CSS would look like this:

```html
<div>
    <style scoped>
        :root {
            color: red;
        }
        #title {
            font-weight: bold;
        }
        #content {
            font-weight: normal;
        }
        #content / #sub-content {
            font-style: italics;
        }
    </style>
    <div>
        <div id="title"></div>
        <div id="content" namespace>
            <div id="sub-content"></div>
        </div>
    </div>
</div>
```

[Read the full Scoped CSS docs](https://docs.web-native.dev/chtml/scoped-css)

### Scoped JS

We've historically built applications in a way that merges presentional concerns into main application code. We find ourselves writing business logic and UI behaviours together in the same code. This can be seen below in an *alert* component.

**The HTML**

```html
<div id="alert">

    <div class="message"></div>
    <div class="exit" title="Close this message.">X</div>
    
</div>
```

**The JavaScript** - notice the problems with the code

```js
let alertElement = this.querySelector('#alert');

// Application concern...
// - change of state within the application
setTimeout(() => {
    // Problem - presentional concern...
    // - using a CSS selector (.message), banking on the implementation details of the alert block
    // - deciding where to place the message within the alert block
    alertElement.querySelector('.message').innerHTML = 'This task is now complete!';
}, 1000);

// Problem - presentional concern...
// - using a CSS selector (.exit), banking on the implementation details of the alert block
// - deciding the details of how the alert block should behave
alertElement.querySelector('.exit').addEventListener('click', () => {
    alertElement.remove();
});
```

On top of the unacceptable practice of colocating unrelated concerns and taking the decisions of one domain in another domain, the application layer keeps on growing for every new functional block in the UI. We end up with a monolith! 

**What We Want**

A way to keep **presentational logic** confined to the presentation layer and out of the application layer - the principle of Separation of Concerns!

**Scoped JS**

Scoped JS is a (proposed) DOM feature that makes it possible to scope a script to its immediate host element and completely out of the global browser scope. Scoped scripts have their `this` variable implicitly bound to their host element. They are defined with the `scoped` Boolean attribute.

```html
<div id="alert">

  <script scoped>
    // this === #alert
  </script>

</div>
```

This lets us place behaviours just where we need them! Now, our code above can be decoupled.

```html
<div id="alert">

    <div class="message"></div>
    <div class="exit" title="Close this message.">X</div>

    <script scoped>
        // details of how the #alert block should behave...
        this.querySelector('.exit').addEventListener('click', () => {
            this.remove();
        });
    </script>

</div>
```

#### Variable Bindings

Besides the `this` variable being implicitly bound to the script's host element, other variables in a scoped script are to be explicitly-bound to external values; variables are bound by name.

Below, we're implementing a `message` variable in our *#alert* component. 

```html
<body>

    <div id="alert">

        <div class="message"></div>
        <div class="exit" title="Close this message.">X</div>

        <script scoped>
            // where to place the message within the alert block...
            this.querySelector('.message').innerHTML = message;
            // details of how the alert block should behave...
            this.querySelector('.exit').addEventListener('click', () => {
                this.remove();
            });
        </script>

    </div>

    <script>
        document.querySelector('#alert').bind({
            message: 'This task is now complete!',
        });
    </script>

</body>
```

So, an application simply binds its hard-earned values to a UI block and is *freeeeee*! The UI block is also happy to *decide* and *manage* details of its internals. And the separate layers are able to evolve at their own pace!

> Scoped JS is to HTML what a template syntax is to a UI component framework. It gives us a way to keep a block in the UI in sync with the state of an application - a conept that has swept the modern web!

Now, a native data-binding language has long been desired. We find [this early idea for a template syntax by Jonathan Kingston](https://discourse.wicg.io/t/extension-of-template/447) all the way from 2014. We see it in [this proposal](https://github.com/whatwg/html/issues/2254) from 2017. But what's radically different now is Scoped JS's being a standard script element, as opposed to being some text-based string interpolation. One is HTML's native provision for logic, the other is a new language over HTML that repurposes HTML's plain text tokens for logic. To see the engineering cost of a new language approach, check out [Apple's proposal](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Template-Instantiation.md) from 2017 for the problem domain!

#### Selective Execution

Scoped JS follows the normal top-down execution of a script. Calling the `.bind()` method with different variable-bindings reruns the script top-down. But as a UI binding langauge, it also features *Selective Execution* where we update a variable to rerun only the corresponding statements within the script that depend on the update - skipping the other statements. This makes for the most-efficient way to keep a block of the UI in sync with little updates from an application. 

To update a variable or multiple variables, call `.bind()` with a `params` object as a second paremeter and set `params.update` to `true`.

```js
alertEl.bind({
    variable2: 'New value',
    variable5: 'New value',
}, {update:true});
```

Also, Scoped JS exposes a new DOM property `.bindings` for selectively updating an element's bindings.

```js
alertEl.bindings.message = 'New value',
```

Below is a *clock* that uses the `.bindings` property.

```html
<body>

    <div id="clock">

        <div class="greeting"></div>
        <div class="current-time"></div>

        <script scoped>
            this.querySelector('.greeting').innerHTML = greeting;
            this.querySelector('.current-time').innerHTML = currentTime;
        </script>

    </div>

    <script>
        let clockEl = document.querySelector('#clock');
        clockEl.bind({
            greeting: 'Good Afternoon!',
            currentTime: '00:00:00',
        });

        // Clock ticks
        setInterval(() => {
            clockEl.bindings.currentTime = (new Date).toLocaleString();
        }, 100);
    </script>

</body>
```

Scoped JS also supports the [Observer API](https://docs.web-native.dev/observer) for object observability. With Observer, Scoped JS is able to respond to mutations made directly to the bound data object. So, the clock above could be *ticked* by direct updating the data object.

```html
<script>
    let clockState = {
        greeting: 'Good Afternoon!',
        currentTime: '00:00:00',
    };
    document.querySelector('#clock').bind(clockState);

    // Clock ticks
    setInterval(() => {
        Obs.set(clockState, 'currentTime', (new Date).toLocaleString());
    }, 100);
</script>
```

Statements may also reference deep nodes within an object, as in the `clock.currentTime` reference below. Updates to deep nodes are still automatically detected by Scoped JS.

```html
<body>

    <div id="clock">

        <div class="greeting"></div>
        <div class="current-time"></div>

        <script scoped>
            this.querySelector('.greeting').innerHTML = clock.greeting;
            this.querySelector('.current-time').innerHTML = clock.currentTime;
        </script>

    </div>

    <script>
        let state = {
            clock: {
                greeting: 'Good Afternoon!',
                currentTime: '00:00:00',
            },
        };
        document.querySelector('#clock').bind(state);

        // Clock ticks
        setTimeout(() => {
            Obs.set(state.clock, 'currentTime', (new Date).toLocaleString());
        }, 100);
    </script>

</body>
```

On updating a variable, the dependency chain within the script is followed even when broken into local variables. Below, a change to `clock.currentTime` will still propagate through `variable1` and  `variable2`. (While the other statements in the script are left untouched, as expected.)

```html
<body>

    <div id="clock">

        <div class="greeting"></div>
        <div class="current-time"></div>

        <script scoped>
            this.querySelector('.greeting').innerHTML = clock.greeting;
            let variable1 = clock.currentTime;
            this.style.backgroundColor = 'yellow';
            let variable2 = variable1;
            this.querySelector('.current-time').innerHTML = variable2;
            this.style.color = 'blue';
        </script>

    </div>

</body>
```

#### Globals

By default, scoped scripts have no access to anything besides what is explicitly bound into the scope. But they also have an idea of a global scope - that is, bindings seen by every scoped script. This global scope is created by binding on the `document` object itself, using a new `document.bind()` method.

```js
document.bind({
    greeting: 'Good Afternoon!',
});
```

To update a *global* or multiple *globals*, call `document.bind()` with a `params` object as a second paremeter and set `params.update` to `true`.

```js
document.bind({
    greeting: 'Good Afternoon!',
}, {update:true});
```

There is also the `document.bindings` property for selectively updating *globals*.

```js
document.bindings.greeting = 'Good Evening!';
```

#### Runtime

By design, Scoped JS parses scoped scripts immediately they land on the DOM, but runs them only after the global scope has been initialized with `document.bind()` or the `document.bindings` property. Newer scipts are run immediately after this global runtime initilization. But the runtime of an individual script will begin before the global one on calling the element's `.bind()` method or assigning to its `.bindings` property.

Alternatively, the `autorun=true` directive may be set on the CHTML META tag. The `autorun` *Boolean* attribute may also be set on individual script elements.

```html
<html>
    <head>
        <meta name="chtml" content="autorun=true;" />
    </head>
    <body>
        <div id="alert">
            <script scoped autorun>
            ...
            </script>
        </div>
    </body>
</html>
```

Also, it is allowed for an element to receive bindings before its scoped script is appended or is ready to run. The element's runtime begins the first time both are available.

```js
alertEl.bind({
    message: 'This task is now complete!',
});

// Sometime later
alertEl.append('<script scoped>this.innerHTML = message</script>');
```

#### Error Handling

Scoped JS features a way to handle *syntax* and *reference* errors that may occur within scoped scripts. Normally, these are shown in the console as warnings. But they can be silenced by setting a directive on the CHTML META tag. Induvidual scripts may also be given a directive, to override whatever the global directive is.

```html
<html>
    <head>
        <meta name="chtml" content="script-errors=0;" />
    </head>
    <body>
        <h1></h1>
        <script scoped errors="1">
            this.querySelectorSelectorSelector('h1').innerHTML = headline;
        </script>
    </body>
</html>
```

#### Isomorphic Rendering

The script tag of a scoped script is not always needed for the lifetime of the page. They are discarded by default after parsing. But when a page is rendered on the server and has to be *hydrated* by the browser, it becomes necessary to retain these scripts for revival on the browser. This feature is designed to be explicitly turned on with a directive on the CHTML META tag.

```html
<html>
    <head>
        <meta name="chtml" content="isomorphic=true;" />
    </head>
    <body>
        <h1></h1>
        <script scoped>
            this.querySelector('h1').innerHTML = headline;
        </script>
    </body>
</html>
```

Now, this binding will always be there for when we run the code `document.bind({headline: 'Hello World'})` - whether on the server and on the browser.

**Environment-Specific Bindings**

Sometimes, we want certain bindings to apply only on the server; sometimes, only on the browser. For example, animation is only a thing in the browser. This is the perfect use-case for conditionals.

```html
<div>
    <script scoped>
        if (condition) {
            this.animate(...);
        }
    </script>
</div>
```

Above, `condition` could be a simple question about the current environment, and this can be acheived by simply binding a global variable, `env`, for example: `document.bind({env:'server', headline: 'Hello World'})`.

```html
<div>
    <script scoped>
        if (env !== 'server') {
            this.anumate([
                {color:'red'},
                {color:'blue'},
            ], {duration:600,});
        }
    </script>
</div>
```

#### Current Implementation of Scoped JS

All of *Scoped JS* is currently implemented in [the CHTML polyfill](https://docs.web-native.dev/chtml/installation) from Web-Native, but with the use of a custom MIME type for the script tag: `<script type="scoped"></script>`. (A custom MIME type helps exclude the script from normal browser processing.) Native implementation may want to really use the `scoped` Boolean attribute as in `<script scoped></script>`, to correspond with `<style scoped></style>` and to retain the role of the `type` attribute for scoped scripts.

From a high-level view, we would now be striking new cords:
+ `<style scoped>` (for styling) - `<script scoped>` (for logic).
+ `element.style` (for styling) - `element.bindings` (for logic).

Current implementation of Scoped JS is based on the [JSEN library](https://docs.web-native.dev/jsen) - an experimental implementation of a subset of the JavaScript language.

[Read the full Scoped JS docs](https://docs.web-native.dev/chtml/scoped-js)

### HTML Partials

Web Components brought new compsitional powers to HTML! For some reasons, though, we still have to write a lot of code to apply some of these features. For example, while the specification offers the `<template>` element for **defining** reusable HTML snippets, it leaves out a declarative way to **access** these snippets. It also doesn't cater for **loading** snippets from remote files on the server.

Also very notably, the concept of slots-based composition is only possible for custom elements that implement the Shadow DOM. Besides this being **very restrictive** for compositon, the whole idea falls apart for apps that have to render server-side as the Shadow DOM still **can't be serialized** for client-side hydration. Even [the very idea of serialization](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Declarative-Shadow-DOM.md) would be counter-intuitive to the Shadow DOM's uniqueness of encapsulation.

Everything just points to the need for new compositional features at the plain HTML level.

**What We Want**

A way to define and reuse HTML snippets **without the protocols** of custom elements or the Shadow DOM.

**HTML Partials**

This feature brings the ability to define, import, access, and compose with reusable HTML snippets using the *template*, *partials*, and *slots* paradigm.

#### Templates, Partials and Slots

A *template* is a collection of independent *partials* that can be consumed from anywhere in the main document.

```html
<head>

    <template name="template1">
        <div id="partial-1"></div>
        <div id="partial-2"></div>
    </template>

</head>
```

An element in the main document, called the *implementation block* or the *composition area*, can define `<slots>`, and then, point to a `<template>` to have the template's partials mapped to its slots. 

```html
<html>

    <head>

        <template name="template1">
            <div id="partial-2" slot="slot-1"></div>
            <div id="partial-2" slot="slot-2"></div>
        </template>

    </head>

    <body>

        <div template="template1">
            <h2>I have slots</h2>
            <slot name="slot-1"></slot>
            <span>
                <slot name="slot-2"></slot>
            </span>
        </div>

    </body>

</html>
```

Composition takes place and the slots are replaced by the template's partials. The block is said to have *implemented* the `<template>`.

```html
<html>

    <head>

        <template name="template1">
            <div id="partial-2" slot="slot-1"></div>
            <div id="partial-2" slot="slot-2"></div>
        </template>

    </head>

    <body>

        <div template="template1">
            <h2>I have slots</h2>
            <div id="partial-2" slot="slot-1"></div>
            <span>
                <div id="partial-2" slot="slot-2"></div>
            </span>
        </div>

    </body>

</html>
```

An implementation block can implement another `<template>` by simply pointing to it; `<slot>`s are disposed off of their previous slotted contents and recomposed from the new `<template>`.

The `<slot>` element, even though replaced, is never really destroyed. It returns to its exact position whenever the last of its slotted elements gets deleted, or whenever the slot has no corresponding partial in the next implemented `<template>`.

> A `<template>` is to the composition block what the *Light DOM* of a Custom Element is to the *Shadow DOM* - providing *slottable* contents for *slots*; called *slottables* in Web Components, *partials* in CHTML.

HTML Partials also supports *Default Slots*. Here, a template's direct children without an explicit `slot` attribute are slotted into the *Default Slot* in the implementation block.

**Universal Slots**

By default, `<slot>`s are scoped to their containing implementation block. But the `<slot>` element may also be used independent of an implementation block to point to its own `<template>`.

```html
<html>

    <head>

        <template name="template1">
            <div slot="slot-1"></div>
            <div slot="slot-2"></div>
        </template>

        <template name="template2">
            <div slot="slot-1"></div>
            <div slot="slot-2"></div>
        </template>

    </head>

    <body>

        <div template="template1">
            <h2>I have slots</h2>
            <slot name="slot-1"></slot>
            <span>
                <slot name="slot-1" template="template2"></slot>
            </span>
        </div>

        <slot name="slot-2" template="template1"></slot>

    </body>

</html>
```

#### Slot Properties

In HTML Partials, `<slot>`s may be defined with extra properties that a slotted element can inherit. Every element slotted in its place will take on these properties.

Both attributes and content can be inheritted this way.

**Attributes**

A `<slot>`'s attributes (other than the `name` and `template` attributes) are inheritted by every slotted element.

When a slotted element inherits attributes from a `<slot>`, inheritted attributes are made to take priority over any existing attributes. On inheriting single-value attributes, like the `id` attribute, any such attribute is replaced on the slotted element. On inheriting space-delimitted attributes, like the `class` attribute, new and non-duplicate values are placed after any existing values on the slotted element. On inheriting key/value attributes, like the `style` attribute, new declarations are placed after any existing declarations on the slotted element (making CSS cascading work on the `style` attribute).

Below, we are using *Slot Attributes inheritance* to recompose the same *partial* differently on each slotting - to adapt it for each usecase.

```html
<html>

    <head>

        <template name="template1">
            <div slot="slot-1"></div>
            <div slot="slot-2"></div>
        </template>

    </head>

    <body>

        <div template="template1">
            <slot name="slot-1" id="headline" style="color:red"></slot>
        </div>

        <slot name="slot-1" template="template1" style="color:blue"></slot>

    </body>

</html>
```

**Content**

Normally, a `<slot>` can have default content that renders before slotting takes place. But this content can instead be defined as a new set of *partials* that can be *implemented* by slotted elements. This time, the `<slot>` element gets to act as the `<template>` and the slotted element as the *implementation block*. (In the light/shadow terminology, this is the `<slot>` element acting as an element's *Light DOM* and the slotted element as its *Shadow DOM*.)

To implement a `<slot>`, a *partial* would set its `template` attribute to the keyword `@slot` instead of pointing to an actual `<template>` element.

```html
<html>

    <head>

        <template name="template1">

            <!-- I am a recomposable partial. My ideal slot provides the partials for me -->
            <div slot="slot-1" template="@slot">
                <slot name="slot-1-1"></slot>
            </div>
            
            <!-- I am a regular partial -->
            <div slot="slot-2"></div>

        </template>

    </head>

    <body>

        <div template="template1">

            <!-- I am an implementable slot. My ideal partial defines slots -->
            <slot name="slot-1">
                <div slot="slot-1-1"></div>
            </slot>

        </div>

    </body>

</html>
```

#### Nested Templates

Templates may be nested for organizational purposes. 

```html
<template name="template1">

    <div slot="slot1"></div>
    <div slot="slot2"></div>

    <template name="nested1">
        <div slot="slot3"></div>
        <div slot="slot4"></div>
    </template>
    <template name="nested2">
        <div slot="slot5"></div>
        <div slot="slot6"></div>
    </template>

</template>
```

Nested templates are referenced using a path notation: 

```html
<div template="template1/nested1">
</div>
```

#### Remote Templates

Templates may reference remote content using the `src` attribute. (This is also even being considered [here](https://discourse.wicg.io/t/add-src-attribute-to-template/2721) and [here](https://github.com/whatwg/html/issues/2791), and probbably elsewhere.)

**Remote file: http://localhost/templates.html**

```html
    <div slot="slot-1"></div>
    <div slot="slot-2"></div>

    <template name="nested1">
        <div slot="slot3"></div>
        <div slot="slot4"></div>
    </template>
    <template name="nested2">
        <div slot="slot5"></div>
        <div slot="slot6"></div>
    </template>
<p></p>
```

**Document: http://localhost**

```html
<head>
    <template name="template1" src="/templates.html"></template>
</head>
```

Where remote templates are detected in a document, `<slot>`s are resolved after all `<template>`s have loaded their content.

#### Isomorphic Rendering

When rendering happens on the server and has to be serialized for the browser to take over, the browser must still be able to maintain references to all `<slot>`s, even those replaced on the server. HTML Partials addresses this by serializing `<slot>` elements as *comment nodes* (`<!-- <slot></slot> -->`) with a view to recreating the original slot elements from these comments on getting to the browser. This way, composition is able to continue. Now in the browser, deleting a server-slotted element, for example, should trigger the restoration of the original `<slot>` element; changing the `template` attribute of any element should dispose off all its server-slotted elements and recompose the block from the new referenced `<template>`.

**Before Rendering on the Server**

```html
<html>

    <head>

        <template name="template1">
            <div slot="slot-1"></div>
            <div slot="slot-2"></div>
        </template>

    </head>

    <body>

        <div template="template1">
            <slot name="slot-1" id="headline" style="color:red">Default Headline</slot>
        </div>

        <slot template="template1" name="slot-1" style="color:blue"></slot>

    </body>

</html>
```

**After Rendering on the Server**

```html
<html>

    <head>

        <template name="template1">
            <div slot="slot-1"></div>
            <div slot="slot-2"></div>
        </template>

    </head>

    <body>

        <div template="template1">
            <div slot="slot-1" id="headline" style="color:red"></div>
            <!-- <slot name="slot-1" id="headline" style="color:red">Default Headline</slot> -->
        </div>

        <div slot="slot-1" style="color:blue"></div>
        <!-- <slot template="template1" name="slot-1" style="color:blue"></slot> -->

    </body>

</html>
```

**Now on the Browser**

Find and delete the server-slotted element with ID `#headline`. The original `<slot>` element should now be restored and ready to be replaced the next composition takes place.

```html
<html>

    <head>

        <template name="template1">
            <div slot="slot-1"></div>
            <div slot="slot-2"></div>
        </template>

    </head>

    <body>

        <div template="template1">
            <slot name="slot-1" id="headline" style="color:red">Default Headline</slot>
            <!-- <slot name="slot-1" id="headline" style="color:red">Default Headline</slot> -->
        </div>

        <div slot="slot-1" style="color:blue"></div>
        <!-- <slot template="template1" name="slot-1" style="color:blue"></slot> -->

    </body>

</html>
```

**Enabliing Slots Serialization**

Since slots serialization is only necessary for isomorphic pages, this feature is designed to be explicitly turned on on the CHTML META tag.

```html
<html>
    <head>
        <meta name="chtml" content="isomorphic=true;" />
    </head>
    <body></body>
</html>
```

#### Partials API

HTML Partials introduces a few new DOM properties for working with composition.

**For the document object:**

+ `document.templatesReadyState` - (Much like the [`document.readyState`](https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState) property.) This property reflects the document's loading status of remote templates:
    + `loading` - This is the initial value of this property.
    + `complete` - This is the value of this property when templates are done loading, or when there are no remote templates at all.
    
    When the state of this property changes, the `templatesreadystatechange` event is fired on the document object.
+ `document.templates` - This property represents the list of `<template>`s in the document. References to templates are maintained here by name. So `document.templates.template1` should return the `<template>` element used in the examples above.

    \* Very interestingly, `document.templates` is also being proposed [here](https://discourse.wicg.io/t/document-templates/1057)!

**For the `<template>` element:**

+ `<template>.partials` - This property represents the list of *partials* defined by the `<template>`. References to *partials* are maintained here by name. Unnamed *partials* are treated as having the name *default*. So, for the `<template>` below,
    
    ```html
    <template name="template1">
        <div slot="one"></div>
        <div slot="two"></div>
        <div slot="default"></div>
        <p></p>
    </template>
    ```

    accessing `document.templates.template1.partials.one` should return an array containing the first `<div>`; while `document.templates.template1.partials.default` should return an array containing the last `<div>` and `<p>`.

+ `<template>.templates` - This property represents the list of `<template>`s nested within the `<template>`. References to templates are maintained here by name.
    
    ```html
    <template name="template1">
        <template name="nested1"></template>
        <template name="nested2">
            <div slot="one"></div>
        </template>
    </template>
    ```

    accessing `document.templates.template1.templates.nested1` should return the first nested `<template>`, while `document.templates.template1.templates.nested2` the second nested `<template>`. And the nesting can go on as much as code organization requires.

**For every element:**

+ `element.template` - This property represents a copy of the `<template>` element referenced by an element. So if an element implements a template as in `<div template="html/temp"></div>`, then `element.template` should be a reference to the `<template>` at the `module/temp` namespace; `element.template.partials.default` should thus return an array like the above.

**For the `<slot>` element:**

+ `<slot>.slottedElements` - (Much like the [`HTMLSlotElement.assignedElements()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/assignedElements) method.) This property represents the list of partials slotted into a slot.
+ `<slot>.resolve()` - This method, without arguments, is used to programatically resolve a `<slot>` from the appropriate `<template>` given in context.
+ `<slot>.empty([silently = false])` - This method is used to programatically empty the *slot* of its *partials*, thereby triggering the restoration of the `<slot>` element itself. To empty the *slot* silently without restoring the original `<slot>` element, provide `true` on the first parameter.

**For slotted elements:**

+ `element.slotReference` - (Much like the [`Slottable.assignedSlot`](https://developer.mozilla.org/en-US/docs/Web/API/Slottable/assignedSlot) property.) This property gives a reference to the `<slot>` element an element was assigned to.

#### Current Implementation of HTML Partials

All of *HTML Partials* is currently implemented in [the CHTML polyfill](https://docs.web-native.dev/chtml/installation) from Web-Native, but with the use of mutation observers and a little more verbose attribute and element names. The `<slot>` element is implemented as `<partials-slot>`. The `slot` attribute used by *partials* in a `<template>` is implemented as `partials-slot`.

[Read the full HTML Partials docs](https://docs.web-native.dev/chtml/html-partials)

## Examples

It would be nice to see how everything in CHTML fits together and how everything could work with other technologies. Here are a few examples.

### A Tooling Example

Being a foundational technology, CHTML gives us every room to bring our own tooling. This example shows how we could use a DOM abstraction library, like jQuery, from scoped scripts.

Below, we're simply binding the `$` variable globally for use in every scoped script.

```html
<body>

    <div id="alert" namespace>
        <div id="message"></div>
        <script scoped>
            $(this.namespace.message).html(message);
        </script>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script>
        document.bind({$: window.jQuery});
        document.querySelector('#alert').bind({
            message: 'This task is now complete!',
        });
    </script>

</body>
```

Tooling can also help us acheive more efficient DOM manipulation. Generally, surgically updating the DOM may have performance implications on the UI, as arising from layout thrashing (see [this article](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing) on Web Fundamentals). But we also don't need as much as a *Virtual DOM* for this. A technique like that of [fast DOM](https://github.com/wilsonpage/fastdom) could just suffice.

This technique is a natively implemented by the [PlayUI](https://docs.web-native.dev/play-ui) library which has a jQuery-like API. We will now use PlayUI as a drop-in replacement for jQuery.

```html
<body>

    <div id="alert" namespace>
        <div id="message"></div>
        <script scoped>
            $(this.namespace.message).html(message).then(() => {
                // Do something next
            });
        </script>
    </div>

    <script src="//unpkg.com/@web-native-js/play-ui/dist/main.js"></script>
    <script>
        document.bind({$: window.WN.PlayUI});
        document.querySelector('#alert').bind({
            message: 'This task is now complete!',
        });
    </script>

</body>
```

[Check the live example here](https://web-native.dev/examples/jquery.html) - based on the current CHTML polyfill.

### A TODO List Example

Below is a TODO list composed from a JavaScript array.

```html
<html>

    <head>

        <template name="items">

            <!--
            > We will need this <li> element to fill our <ul> element.
            > Without explicitly defining a "slot" attribute, this <li> element would be accessible as "default".
            -->
            <li>
                <script scoped>this.innerHTML = desc;</script>
            </li>

        </template>

    </head>

    <body>

        <div id="todo" template="items" namespace>

            <h2 id="title"></h2>

            <!--
            > This <ul> will be composed with the <li> element defined in the referenced <template>.
            > The <li> element is accessed as "this.template.partials.default[0]" and is cloned each time.
            -->
            <ul id="items"></ul>

            <script scoped>
                this.namespace.title.innerHTML = title;
                items.forEach(itemBinding => {
                    let itemElement = this.template.partials.default[0].cloneNode(true);
                    itemElement.bind(itemBinding);
                    this.namespace.items.append(itemElement);
                });
            </script>

        </div>

        <script>
            document.querySelector('#todo').bind({
                title: 'My TODOs',
                items: [
                    {desc: 'TODO-1'},
                    {desc: 'TODO-2'},
                    {desc: 'TODO-3'},
                ],
            });
        </script>
    </body>

</html>
```

We could even add the ability to add/remove items. For the *remove* feature, we'd let the `<li>` element expose a *remover* button that the main `<ul>` logic can bind to the `removeItem()` method of the TODO application. For the *add* feature, we'd add a button to the TODO container that calls the `addItem()` method of the TODO application.

We've also decided to use [the Observer API](https://docs.web-native.dev/observer) and [PlayUI's `.itemize()`](https://docs.web-native.dev/play-ui/api/dom/itemize) method that provides a simple way to keep the list container in sync with application items.

```html
<html>

    <head>

        <title>A TODO Example</title>
        <template name="items">
            
            <li namespace>
                <span id="desc"></span>
                <button id="remover">Remove</button>
                <script scoped>
                    this.namespace.desc.innerHTML = desc;
                </script>
            </li>

        </template>

    </head>

    <body>

        <div id="todo" namespace>

            <h2 id="title"></h2>
            <ol id="items" template="items"></ol>
            <button id="adder">Add</button>

            <script scoped>
                this.namespace.title.innerHTML = title;
                $(this.namespace.items).itemize(items, (el, data, index, isNew) => {
                    el.bind(data);
                    if (isNew) {
                        // This means el was newly generated by itemize()
                        el.namespace.remover.addEventListener('click', () => removeItem(index));
                    }
                });
                this.namespace.adder.addEventListener('click', () => addItem());
            </script>

        </div>

        <script src="//unpkg.com/@web-native-js/observer/dist/main.js"></script>
        <script src="//unpkg.com/@web-native-js/play-ui/dist/main.js"></script>
        <script>
            // Declare our tools
            let Obs = window.WebNative.Observer;
            let $ = window.WebNative.PlayUI;

            // Create the app
            let todo = {
                $,
                title: 'My TODOsrr',
                items: [
                    {desc: 'Task-1'},
                    {desc: 'Task-2'},
                    {desc: 'Task-3'},
                ],
                addItem() {
                    window.todoItems.push({desc: prompt('Task description'),});
                },
                removeItem(index) {
                    window.todoItems.splice(index, 1);
                },
            };
            
            // Bind the app to the UI
            document.querySelector('#todo').bind(todo);

            // Make the items available globally
            // so that we can always manipulate them
            window.todoItems = Obs.proxy(todo.items);
        </script>
    </body>

</html>
```

[Check the live example here](https://web-native.dev/examples/todo.html) - based on the current CHTML polyfill.

### A Single Page Application Example

This example makes an SPA of *templates and slots* composition. Below, we're using the two template elements to each represent a route - each holding partials that are unique to a route. Then we point the body element to implement the template whose namespace matches the current URL.

```html
<html>

    <head>

        <template name="route">

            <template name="home">
                <h1 slot="headline">
                    Welcome Home!
                </h1>
                <p slot="content">
                    <a href="#/about">About Me</a>
                </p>
            </template>

            <template name="about">
                <h1 slot="headline">
                    About Me!
                </h1>
                <p slot="content">
                    <a href="#/home">Back to Home</a>
                </p>
            </template>

        </template>

    </head>

    <body template="route/home">

        <header></header>

        <main>
            <div id="banner">
                <slot name="headline">404</slot>
            </div>
            <div>
                <slot name="content">Page not Found!</slot>
            </div>
        </main>

        <footer></footer>

        <script>
            window.addEventListener('popstate', e => {
                let path = document.location.hash.substr(1);
                document.body.setAttribute('template', 'route' + path);
            });
        </script>
    </body>

</html>
```

Navigate to a route that does not begin with `#/home` or `#/about`, you should see the default content showing *404*.

[Check the live example here](https://web-native.dev/examples/spa.html) - based on the current CHTML polyfill.

### Other Examples
+ [An Observable Wrapper for the Web Monetization API - for Reactive UI development with CHTML](https://github.com/web-native/observables/blob/master/src/web-monetization/README.md)

## Conclusion

Until now, "reactive" UI development has been based on community-developed frameworks with heavy abstractions and dependencies - much like the consequences of a lack of platform support for this modern UI development paradigm. We've even come to the point when HTML and CSS have been forced out of place into JavaScript - and that is, web authoring languages put behind a compiler! This state of over-engineering for UI development has raised concerns! And here comes one of the biggest motivations for CHTML. With platform support, we can now finally put much dependencies behind us and get back to writing code that hits the ground running. Empower us to **#justUseThePlatform**!

> It seems that the letters "CHTML" should read "Component-Oriented HTML", "Composable HTML", or something else altogether that describes language-wide features for a component-based UI.

# Author

[Oxford Harrison](https://discourse.wicg.io/u/ox-harris)

# Changelog

+ \[Aug 16, 2020\] - Current
+ \[[Aug 9, 2020](https://github.com/web-native/chtml/blob/master/explainer-1.md)\] - Initial draft
