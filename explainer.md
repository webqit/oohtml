# CHTML Explainer

## Table of Contents

+ [Background](#background)
    + [Features Missing in HTML, Also Missing in Web Components](#features-missing-in-html-also-missing-in-web-components)
    + [Features Exclusive to the Shadow Dom, but Fundamentally Needed in HTML as a Whole](#features-exclusive-to-the-shadow-dom-but-fundamentally-needed-in-html-as-a-whole)
+ [Introducing CHTML - One More Technology Suite, Side-By-Side With Web Components](#introducing-chtml---one-more-technology-suite-side-by-side-with-web-components)
    + [Scoped HTML](#scoped-html)
    + [Scoped CSS](#scoped-css)
    + [Scoped JS](#scoped-js)
    + [HTML Partials](#html-partials)
+ [Examples](#examples)
    + [A TODO List Example](#a-todo-list-example)
    + [A Single Page Application Example](#a-single-page-application-example)
    + [A Tooling Example](#a-tooling-example)
+ [Conclusion](#conclusion)
    + [A Focus On the Language for Authouring Components](#a-Focus-on-the-language-for-authouring-components)

## Background

After over many years now of trying to make success of web components, it has still been necessary to propose additional platform features to better support modern UI development. I have stopped counting the many proposals at [WICG](https://discourse.wicg.io) and on GitHub, and the posts out there in the community, that are all underscoring just how much we still need on the platform to natively drive composability, componentization, and reactivity. In this document, I have sought to put these seemingly disparate issues under one problem domain and have offered one suite to fulfill them all so we call it a day.

Now, we could go on and on talking over additions to Web Components. But the problems in front of us aren't just deficiencies in Web Components; we've got to look at the HTML language itself! This proposal is pursuant to empowering the platform as a whole, not just a subset of it.

### Features Missing in HTML, Also Missing in Web Components

+ **A UI Component Model.** We've historically lacked a way to draw a component-to-component relationship over an HTML document - where a *component* maintains references to the other elements that make up its role as a component. Everything we do currently still ends with components working in siloes. (Contrast this with ARIA relational attributes and the Accessibility Tree. Also see the point with Stuart P.'s [Parts and Walls](https://github.com/stuartpb/pwalls-spec) proposal from 2015.)

    Interestingly, we do have two naming systems in Web Components:
    + Shadow Parts - but this is for styling purposes;
    + Slots - and this is for composition purposes.
    
    What's missing is a naming system that translates to a structural API for exposing a component's internals for applications. We really shouldn't have to suffer the guesswork of querying a component's subtree with CSS selectors; these are implementation details that should be known only to the component - in the true sense of a component.

    But should this be considered for an addition to Custom Elements? My position is to bring this feature to the HTML language itself as *Scoped IDs*.

+ **Bindings.** Our idea of a UI component is of a UI block that is bound to a corresponding part of an application. We want to be able to keep the UI in sync with application state without having to manually track and apply changes. This is so fundamental to modern UI develipment that every framework out there is featuring the joint concept of *bindings* and *reactivity*. Covering this bulk of work is where the current frameworks have got to really outshine the platform. At this point, this is no longer a nice to have, but a critically needed feature on the platform. (I found [this early-stage idea](https://discourse.wicg.io/t/extension-of-template/447) for a template syntax by Jonathan Kingston way back in 2014. See it come back in [this proposal](https://github.com/whatwg/html/issues/2254) from 2017.)

    While the first wave of ideas have considered a new syntax on top of HTML, we find that the platform already has what it takes to unlock this feature, as the concept of logic is something inherit to HTML. That brings us closer to a more native solution. My proposition below explores a new way to use standard scripts in HTML for reactve presentational logic: *Scoped JS*.

### Features Exclusive to the Shadow DOM, but Fundamentally Needed in HTML as a Whole

+ **Slots-Based Composition.** Slots-Based composition is one killer feature to come to HTML. Unfortunately, they were imagined for use only in the Shadow DOM, whereas, in fact, the use case is everywhere as long as the UI is concerned. Encapsulation (by the Shadow DOM) and composition shouldn't be tied as we don't always need them together. Even as they happen to be, the whole idea falls apart for apps that have to render on the server as [the Shadow DOM still can't be serialized for client-side hydration](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Declarative-Shadow-DOM.md)! Now it looks like we're [trying hard to force a square shape into a round opening](https://www.petergoes.nl/blog/my-stab-at-rendering-shadow-dom-server-side/) - being as the Shadow DOM is all we've got!

For a moment, how about slots for HTML generally? That could change everything! This is the prospect for us in *HTML Partials*.

+ **Scoping.** One of the earliest of our needs in HTML is scoping - a way to keep things out of the browser's global scope. Having every CSS in one global scope has been much of a pain until now. The trouble gets doubled with scripts that have to use these globally Scoped CSS selectors to query the document. And while selecting by IDs would give perfect specificity, a terrible challenge lies in writing collision-free names, as IDs, like CSS selectors, also share one global namespace - a problem that has been underdiscussed. This gives us three things to worry about: stylesheets, scripts (that manipulate the DOM, usually as presentational logic), and IDs.

    While the case for Scoped CSS has long been established, it happened that we took back the fine step we made toward this direction in favour of the Shadow DOM's encapsulation. What we've realized at this point is that we can't use the Shadow DOM just because we need to scope some CSS. Specificity is a common design problem and should be given a *handy* solution. A number of developers in the community are joining the call to return Scoped CSS. And the fact that many frameworks are currently offering this feature is another big measure of the usecase. Making this a general feature, and not just a feature of the Shadow DOM, is everyone's position.

    But the case for Scoped CSS should also help us understand the problem with globally-scoped IDs and scripts. Why, we can find a *consistent way* to keep all three out of a global scope, as in *Scoped IDs*, *Scoped CSS*, and *Scoped JS* - in one word, scoping for HTML! This I have explored below!

## Introducing CHTML - One More Technology Suite, Side-By-Side With Web Components

CHTML is a suite of new DOM features that brings language support for modern UI development paradigms: a component-based architecture, data binding, and reactivity. Instead of introducing totally new ideas, CHTML chooses to *look within* to find new possibilities with existing platform features. It is designed to work side-by-side with Web Components and to bring some of Shadow DOM's exclusive features to the language generally.

CHTML's development has been driven by real-world usecases and is currently obtainable from the [Web-Native](https://web-native.dev) project as a polyfill.

### Scoped HTML

This feature let's an element establish its own naming context for descendant elements. It makes it possible to keep IDs out of HTML's global namespace and gives us a document that is structured as a hierarchy of *scopes* and *subscopes*.

Scopes are designated with the `root` Boolean attribute.

```html
<div root>
    <div id="..."></div>
</div>
```

***Scopes* and *Subscopes***

Below is a hierarchy of scopes.

```html
<body>

    <article root id="continents">
        <b>Continents</b>

        <section root id="europe">
            <b>Europe</b>

            <div id="about">
                <b>About Europe</b>
                <ul>
                    <li>Fact1</li>
                    <li>Fact2</li>
                </ul>
            </div>

            <div id="countries">
                <b>Countries in Europe</b>
                <ul>
                    <li>Country1</li>
                    <li>Country2</li>
                </ul>
            </div>
        </section>

        <section root id="africa">
            <b>Africa</b>

            <div id="about">
                <b>About Africa</b>
                <ul>
                    <li>Fact1</li>
                    <li>Fact2</li>
                </ul>
            </div>

            <div id="countries">
                <b>Countries in Africa</b>
                <ul>
                    <li>Country1</li>
                    <li>Country2</li>
                </ul>
            </div>
        </section>

    </article>

</body>
```

Scoped HTML turns out the ideal, clean, modular naming convention compared to current class-based alternatives like [BEM](https://getbem.com).

Above, what we get is simply a hierarchy of scopes:

```html
continents
|- europe
|   |- about
|   |- countries
|- africa
    |- about
    |- countries
```

#### Scope API

A hierarchy of scopes makes it possible to have a *structural API*, or a UI component model, that an application can bank on. Scoped HTML exposes a new DOM property `idrefs` for accessing scope trees.

```js
// The regular querySelector() function would give us the #article element
let continents = document.querySelector('#continents');

// The new idrefs DOM property would give us the structural parts
let europe = continents.idrefs.europe;
let africa = continents.idrefs.africa;

// Deeply-nested...
let aboutAfrica = continents.idrefs.africa.idrefs.about;
```

Now, much naming wars, structural guesswork, and inefficient DOM queries can be eliminated with a simple, bankable API.

##### Scope Observability

An element's `.idrefs` property is implemented as a live object that reflects the element's scope tree in real time. CHTML also supports the [Observer API](https://docs.web-native.dev/observer) for change detection; `Obs.observe()` can thus be used to observe additions and removals on the scope tree.

```js
Obs.observe(element.idrefs, changes => {
    console.log(changes.map(change => change.name));
});
```

#### Scope Selectors – (Coming soon to the CHTML at Web-Native)

With the introduction of Scoped HTML, a few backwards-compatible changes will now be neccessary:

+ The regular ID selector `#` should now respect scope boudaries.
+ The forward slash `/` should be used to denote a scope boundary. Now, deeply-scoped IDs may even be queried from the global scope using the path notation: `#continents / #europe / #about`.
+ Two new query selectors (`scopeSelector()` and `scopeSelectorAll()`) should now be created, or the regular `querySelector()` and `querySelectorAll()` DOM methods can be upgraded to support Scope Selectors.
+ URL fragment identifiers should now be path-based to reference an element deep in the scope hierarchy. (Discussions are already underway [here](https://github.com/whatwg/html/issues/3509), and probabbly elswhere too, to reform fragment identifiers; this becomes a good time to bake-in path notation.)

#### Current Implementation of Scoped HTML

All of *Scoped HTML*, excluding Scope Selectors, is currently implemented in the CHTML at Web-Native, but with the use of mutation observers. The implementation is also making do with the `scoped:id` attribute instead of the actual `id` attribute - to respect the current validition of HTML documents. Interestingly, a native implementation of scoped IDs can come at no risk to pre-CHTML websites as their lack of *roots* can forever keep their IDs scoped to the document root. Or possibly, a meta tag, or document-wide attribute can be required for Scoped HTML-based documents.

[Read the full Scoped HTML docs](https://docs.web-native.dev/chtml/scoped-html)

### Scoped CSS

CHTML *reproposes* the ability to scope a stylesheet as a language feature and not just a Shadow DOM feature. With component-oriented HTML in mind, we now have a better use-case for Scoped CSS. With support for Scope Selectors, Scoped CSS could look like this:

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
    <div root>
        <div id="title"></div>
        <div root id="content">
            <div id="sub-content"></div>
        </div>
    </div>
</div>
```

[Read the full Scoped CSS docs](https://docs.web-native.dev/chtml/scoped-css)

### Scoped JS

This feature makes it possible for scripts to be scoped to their containing element and completely out of the global browser scope. Scoped scripts have their `this` variable implicitly bound to their containing element. They are defined with the `scoped` Boolean attribute.

```html
<div>
    <div class="message">This task is now complete!</div>
    <div class="exit" title="Close this message.">X</div>
    <script scoped>
        this.querySelector('.exit').addEventListener('click', () => {
            this.remove();
        });
    </script>
</div>
```

Other variables in a scoped script are to be explicitly-bound from external values. Variables are bound by name, as in the `message` variable below. 

```html
<body>

    <div id="alert">
        <div class="message"></div>
        <div class="exit" title="Close this message.">X</div>
        <script scoped>
            let messageEl = this.querySelector('.message');
            messageEl.innerHTML = message;
        </script>
    </div>

    <script>
        let alertEl = document.querySelector('#alert');
        alertEl.bind({
            message: 'This task is now complete!',
        });
    </script>

</body>
```

Scoped JS gives us this special ability to bring DOM manipulation logic closer to their targets and away from an application. It has *presentational logic* as its sole responsibility and thus helps us keep the main application layer void of the implementation details of the UI. As shown above, an application simply binds its hard-earned values and ends it there!

Scoped JS is to HTML what a template syntax is to a UI component framework. But by coming in a script tag, as opposed to being in text-based string interpolation, we get to avoid repurposing HTML's plain text content for logic, or the required compile step that must sniff those tokens for special interpretation. Overall, we can now finally use the web's exact language for logic rightly for logic! (Contrast this with [Apple's proposal](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Template-Instantiation.md) from 2017 for the problem domain.)

#### Selective Execution

Scoped JS follows the normal top-down execution of a script. Calling the `.bind()` method with different variable-bindings reruns the script top-down. But as a UI binding langauge, it also features *Selective Execution* where an update to a variable gets to rerun only the corresponding statements within the script - skipping the other statements. This makes for the most-efficient way to keep a block of the UI in sync with little updates from an application. 

To update a variable or multiple variables, call `.bind()` with `false` as a second paremeter.

```js
alertEl.bind({
    variable2: 'New value',
    variable5: 'New value',
}, false);
```

Also, Scoped JS exposes a new DOM property `.bindings` for selectively updating an element's bindings.

```js
alertEl.bindings.variable5 = 'New value',
```

This is illustrated in the clock below.

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

Scoped JS also supports the [Observer API](https://docs.web-native.dev/observer) for object observability. With Observer, Scoped JS is able to respond to mutations on the bound data object. So the clock above could be driven by direct updates to the data object.

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

Scoped JS is also able to pick up deep mutations for statements that reference deep into an object, as in `clock.currentTime`.

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

Within the script, the dependency chain is followed even when broken into local variables. Below, a change to `clock.currentTime` will still propagate through `variable1` and  `variable2`. (While the first and last statements in the script are left untouched, as expected.)

```html
<body>

    <div id="clock">
        <div class="greeting"></div>
        <div class="current-time"></div>
        <script scoped>
            this.querySelector('.greeting').innerHTML = clock.greeting;
            let variable1 = clock.currentTime;
            let variable2 = variable1;
            this.querySelector('.current-time').innerHTML = variable2;
            this.style.color = 'blue';
        </script>
    </div>

</body>
```

From a high-level view, there will now be a one-to-one correspondence between CSS and JS:
+ `<style scoped>` (for styling) - `<script scoped>` (for behaviour).
+ `element.style` (for styling) - `element.bindings` (for behaviour).

#### Globals

By default, scoped scripts have no access to anything besides what has been explicitly bound into the scope. But they also have an idea of a global scope - that is, bindings seen by every scoped script. This global scope is created by binding on the `document` object itself, using a new `document.bind()` method.

```js
document.bind({
    greeting: 'Good Afternoon!',
});
```

There is also the `document.bindings` property for selectively updating *globals*.

```js
document.bindings.greeting = 'Good Evening!';
```

#### Runtime

By design, Scoped JS parses scoped scripts immediately they land on the DOM, but runs them only after the global scope has been initialized with `document.bind()` or the `document.bindings` property. Newer scipts are run immediately after this global runtime initilization. But the runtime of an individual script will begin before the global one on calling the element's `.bind()` method or assigning to its `.bindings` property, or by setting the `autorun` *Boolean* attribute on the script element.

Also, an element may receive bindings before its scoped script is appended or is ready to run. The element's runtime begins the first time both are available.

#### Error Handling

Scoped JS features a way to handle syntax or reference errors that may occur with scoped scripts. Normally, these are shown in the console as warnings. But they can be silenced by setting a directive on the CHTML META tag. Induvidual scripts may also be given a directive, to override whatever the global directive is.

```html
<html>
    <head>
        <meta name="chtml" content="script-errors=0;" />
    </head>
    <body>
        <h1></h1>
        <script type="scoped" errors="1">
            this.querySelectorSelectorSelector('h1').innerHTML = headline;
        </script>
    </body>
</html>
```

\* The trailing semi-colon (;) in the CHTML META tag is optional.

#### Isomorphic Rendering

The script tag of a scoped script is not always needed for the lifetime of the page. They are discarded by default after parsing. But when a page is rendered on the server and has to be *hydrated* by the browser, it becomes necessary to retain these scripts for revival on the browser. This feature is designed to be explicitly turned on with a directive on the CHTML META tag.

```html
<html>
    <head>
        <meta name="chtml" content="isomorphic=true;" />
    </head>
    <body>
        <h1></h1>
        <script type="scoped">
            this.querySelector('h1').innerHTML = headline;
        </script>
    </body>
</html>
```

Now, running the code `document.bind({headline: 'Hello World'})` both on the server and on the browser should give us the same result.

\* The trailing semi-colon (;) in the CHTML META tag is optional.

**Environment-Specific Bindings**

Sometimes, we want certain bindings to apply only on the server; sometimes, only on the browser. For example, animation is only a thing in the browser. This is the perfect use-case for conditionals.

```html
<div>
    <script type="scoped">
        if (condition) {
            this.animate(...);
        }
    </script>
</div>
```

Above, *condition* could be a simple question about the current environment, and this is acheivable by simply exposing a global `env` variable: `document.bind({env:'server', headline: 'Hello World'})`.

```html
<div>
    <script type="scoped">
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

All of *Scoped JS* is currently implemented in the CHTML at Web-Native, but with the use of a custom MIME type for the script tag: `<script type="scoped"></script>`. A custom MIME type helps exclude the script from normal browser processing. Native implementation may want to, instead, use the `scoped` Boolean attribute as in `<script scoped></script>`, to correspond with `<style scoped></style>` and to retain the role of the `type` attribute for scoped scripts.

The implementation is based on the [JSEN library](https://docs.web-native.dev/jsen) - an experimental implementation of a subset of the JavaScript language for user-defined use-cases.

[Read the full Scoped JS docs](https://docs.web-native.dev/chtml/scoped-js)

### HTML Partials

This feature brings the ability to define, extend, import/export reusable HTML snippets using the *template*, *partials*, and *slots* paradigm.

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

An element in the main document, called the *implementation block* or the *composition area*, can define *slots*, and then, point to a template to have the template's partials each mapped to a slot. 

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

Composition takes place and the slots are replaced by the template's partials. The block is said to have *implemented* the template.

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

An implementation block can implement another template by simply pointing to it; slots are disposed of their previous slotted contents and recomposed from the new template.

The `<slot>` element, even though replaced, is never really destroyed. It returns to its exact position whenever the last of its slotted elements get deleted, or whenever the slot has no corresponding partial in the next implemented template.

A template is to the composition block what the Light DOM of a custom element is to the Shadow DOM - providing *slottable* contents for *slots*; called *slottables* in Web Components, *partials* in CHTML.

HTML Partials also supports *Default Slots*. A template's direct children without an explicit `slot` attribute are slotted into the *Default Slot* in the implementation block.

**Unscoped Slots**

By default, slots are scoped to their containing implementation block. But the `<slot>` element may also be used independent of an implementation block to point to its own template.

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

In HTML Partials, slots may be defined with extra properties that a slotted element can inherit. Every element slotted in its place will take on these properties.

Both attributes and content can be inheritted this way.

**Attributes**

A slot's attributes, other than the slot-exclusive `name` and `template` attributes, are inheritted by every slotted element.

On inheriting single-value attributes, like the `id` attribute, any such attribute is replaced on the slotted element. On inheriting space-delimitted attributes, like the `class` attribute, new and non-duplicate values are placed after any existing values. On inheriting key/value attributes, like the `style` attribute, new declarations are placed after any existing declarations, making CSS cascading work on the `style` attribute.

Below, we are using Slot Attributes to recompose the same *partial* differently for each usecase.

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

A slot can have default content that renders before slotting takes place. But this content can instead be defined as a new set of *partials* that can be *implemented* by slotted elements. So we have the slot element acting as the *template* and the slotted element as the *implementation block*. (In the light/shadow paradigm, this is the slot element acting as an element's *Light DOM* and the slotted element as its *Shadow DOM*.)

To implement a slot, a *partial* would set its `template` attribute to the keyword *slot* instead of pointing to an actual template.

```html
<html>

    <head>

        <template name="template1">

            <!-- I am a recomposable partial. My ideal slot provides the partials for me -->
            <div slot="slot-1" template="slot">
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

Templates may reference remote content using the `src` attribute.

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
    <template name="template1" src="http://localhost/templates.html"></template>
</head>
```

Where remote templates are detected in a document, slots are resolved after all templates have loaded their content.

#### Partials API

HTML Partials introduces a few new DOM properties for working with composition.

**For the document object:**

+ `.templatesReadyState` - This property reflects the document's loading status of remote templates:
    + `loading` - This is the initial value of this property.
    + `complete` - This is the value of this property when templates are done loading, or when there are no remote templates at all. For this state, the `templatesreadystatechange` event is fired on the document object.
+ `.templates` - This property represents the list of templates in the document. Templates are exposed here by name. So `document.templates.template1` should return the template element used in the examples above.

**For the `<template>` element:**

+ `.partials` - This property represents the list of partials defined by the template. It is an object holding a reference to partials by name. Unnamed partials are treated as having the name *default*. So, for the template below,
    
    ```html
    <template name="template1">
        <div slot="one"></div>
        <div slot="two"></div>
        <div slot="default"></div>
        <p></p>
    </template>
    ```

    accessing `document.templates.template1.partials.one` should return an array containing the first `<div>`; while `document.templates.template1.partials.default` should return an array containing the last `<div>` and `<p>`.

+ `.templates` - This property represents the list of templates nested within the template. It is an object holding a reference to templates by name.
    
    ```html
    <template name="template1">
        <template name="nested1"></template>
        <template name="nested2">
            <div slot="one"></div>
        </template>
    </template>
    ```

    accessing `document.templates.template1.templates.nested1` should return the first nested template, while `document.templates.template1.templates.nested2` the second nested template. And the nesting can go on as much as code organization requires.

**For every element:**

+ `.template` - This property represents a copy of the `<template>` element referenced by an element. So if an element implements a template as in `<div template="html/temp"></div>`, then `element.template` should be a copy of the `<template>` at the `module/temp` namespace; `element.template.partials.default` should thus return an array like the above.

**For the `<slot>` element:**

+ `.slottedElements` - This property represents the list of partials slotted into a slot. (Much like the [`HTMLSlotElement.assignedElements()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/assignedElements) method.)
+ `.resolve()` - This method, without arguments, is used to programatically resolve a slot from the appropriate partial in the template given in context.
+ `.empty([silently = false])` - This method is used to programatically empty the slot of its partials, thereby triggering the restoration of the slot element itself. To empty the slot silently without restoring the original slot element, provide `true` on the first parameter.

**For slotted elements:**

+ `.slotReference` - This property gives a reference to the slot element an element was assigned to. (Much like the [`Slottable.assignedSlot`](https://developer.mozilla.org/en-US/docs/Web/API/Slottable/assignedSlot) property.)

#### Isomorphic Rendering

Persistent slots is the promise of slots-based composition; placeholders must never really lose their place. This promise is easy to keep on a live DOM, as slot positions can be easily maintained - even after a slot is replaced. Where the challenge lies is when rendering happens on the server and has to be serialized for the browser to take over; the browser must maintain references to all slots, even those replaced on the server. 

HTML Partials addresses this by serializing slot elements as *comment nodes* with a view to recreating the original slot elements from these comments on getting to the browser. This way, composition is able to continue. Now in the browser, deleting a server-slotted element, for example, should trigger the restoration of the original slot element; changing the `template` attribute of any element should dispose off all its server-slotted elements and recompose the block from the new referenced template.

**Before Rendering on the Server**

```html
<html>

    <head>

        <template namespace="module/two">
            <div slot="slot-1"></div>
            <div slot="slot-2"></div>
        </template>

    </head>

    <body>

        <div template="module/one">
            <slot name="slot-1" id="headline" style="color:red">Default Headline</slot>
        </div>

        <slot template="module/one" name="slot-1" style="color:blue"></slot>

    </body>

</html>
```

**After Rendering on the Server**

```html
<html>

    <head>

        <template namespace="module/two">
            <div slot="slot-1"></div>
            <div slot="slot-2"></div>
        </template>

    </head>

    <body>

        <div template="module/one">
            <div slot="slot-1" id="headline" style="color:red"></div>
            <!-- <slot name="slot-1" id="headline" style="color:red">Default Headline</slot> -->
        </div>

        <div slot="slot-1" style="color:blue"></div>
        <!-- <slot template="module/one" name="slot-1" style="color:blue"></slot> -->

    </body>

</html>
```

**Now on the Browser**

Find and delete the server-slotted element with ID `#headline`. The original slot element should now be restored and ready to replaced on the next composition.

```html
<html>

    <head>

        <template namespace="module/two">
            <div slot="slot-1"></div>
            <div slot="slot-2"></div>
        </template>

    </head>

    <body>

        <div template="module/one">
            <slot name="slot-1" id="headline" style="color:red">Default Headline</slot>
            <!-- <slot name="slot-1" id="headline" style="color:red">Default Headline</slot> -->
        </div>

        <div slot="slot-1" style="color:blue"></div>
        <!-- <slot template="module/one" name="slot-1" style="color:blue"></slot> -->

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

\* The trailing semi-colon (;) in the CHTML META tag is optional.

##### So Why is Serializability Important?

This is noteworthy because it is finally possible, so that we can stop looking to the Shadow DOM for something it wasn't designed for!

#### Current Implementation of HTML Partials

All of *HTML Partials* is currently implemented in the CHTML at Web-Native, but with mutation observers and a little more verbosed attribute and element names. The `<slot>` element is implemented as `<partials-slot>`. The `slot` attribute used by *partials* in a `<template>` is implemented as `partials-slot`.

[Read the full HTML Partials docs](https://docs.web-native.dev/chtml/html-partials)

## Examples

Here are some of CHTML's possibilities. To try the examples below with the current implementation of CHTML, please visit [docs.web-native.dev/chtml](https://docs.web-native.dev/chtml/examples) to find the corresponding sample code in the examples given.

### A TODO List Example

Below is a TODO list composed from a JavaScript array using Scoped HTML, Scoped JS in combination with the HTML Partials API.

```html
<html>

    <head>

        <template namespace="module/item">
            <li slot="item">
                <script scoped>this.innerHTML = text;</script>
            </li>
        </template>

    </head>

    <body>

        <div root id="todo" template="module/item">

            <h2 id="title"></h2>

            <ul id="items"></ul>

            <script scoped>
                this.idrefs.title.innerHTML = title;
                items.forEach(itemBinding => {
                    let itemElement = this.template.partials.item[0].cloneNode(true);
                    itemElement.bind(itemBinding);
                    this.idrefs.items.append(itemElement);
                });
            </script>

        </div>

        <script>
            document.querySelector('#todo').bind({
                title: 'My TODOs',
                items: [
                    {text: 'TODO-1'},
                    {text: 'TODO-2'},
                    {text: 'TODO-3'},
                ],
            });
        </script>
    </body>

</html>
```

We could even add the ability to add/remove items. For the *remove* feature, we'd add a *click* event listener to the item element definition. For the *add* feature, we'd add a button to the TODO container that calls the `add()` method of the TODO application. 

```html
<html>

    <head>

        <template name="template1">
            <li root slot="item">
                <span id="content"></span>
                <button id="remover">Remove</button>
                <script scoped>
                    this.idrefs.content.innerHTML = text;
                    this.idrefs.remover.addEventListener('click', () => this.remove());
                </script>
            </li>
        </template>

    </head>

    <body>

        <div root id="todo" template="template1">

            <h2 id="title"></h2>

            <ul id="items"></ul>

            <button id="adder">Add</button>

            <script scoped>
                this.idrefs.title.innerHTML = title;
                items.forEach(itemBinding => {
                    let itemElement = this.partials.item[0].cloneNode(true);
                    this.idrefs.items.append(itemElement.bind(itemBinding));
                });
                this.idrefs.adder.addEventListener('click', () => addItem());
            </script>

        </div>

        <script src="//unpkg.com/@web-native-js/observer/dist/main.js"></script>
        <script>
            let Obs = window.WebNative.Observer;
            let count = 4;
            document.querySelector('#todo').bind({
                title: 'My TODOs',
                items: [
                    {text: 'TODO-1'},
                    {text: 'TODO-2'},
                    {text: 'TODO-3'},
                ],
                addItem() {
                    Obs.proxy(this.items).push({text: 'TODO-' + count ++});
                },
            });
        </script>
    </body>

</html>
```

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

### A Tooling Example

That CHTML is a foundational technology just gives us every room to bring our own tooling. This example shows how we could make a DOM abstraction API, like jQuery, available to scoped scripts.

Below, we're simply binding the `$` variable globally for use in every scoped script.

```html
<body>

    <div root id="alert">
        <div id="message"></div>
        <script scoped>
            $(this.idrefs.message).html(message);
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

Tooling can also save the day on the efficiency of DOM manipulation. Generally, surgically updating the DOM may have performance implications on the UI, as arising from layout thrashing (see [this article](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing) on Web Fundamentals). But we also don't need as much as a *Virtual DOM*. A technique like that of [fast DOM](https://github.com/wilsonpage/fastdom) could just suffice. The upcoming [PlayUI](https://docs.web-native.dev/play-ui) library has a design that brings this technique (what we like to call *async DOM*) in the syntax-sugar of jQuery.

```html
<body>

    <div root id="alert">
        <div id="message"></div>
        <script scoped>
            $(this.idrefs.message).html(message).then(() => {
                // Do something next
            });
        </script>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="//unpkg.com/@web-native-js/play-ui/dist/main.js"></script>
    <script>
        document.bind({$: window.WebNative.PlayUI});
        document.querySelector('#alert').bind({
            message: 'This task is now complete!',
        });
    </script>

</body>
```

## Conclusion

Until now, we've suffered the consequences of the lack of platform support for a component-based HTML. It seemed that the days were gone for doing anything in vanilla HTML, CSS and JavaScript. But with the CHTML suite, we can now finally #justUseThePlatform!

\*It seems that the letters "CHTML" should read "Component-Oriented HTML", "Composable HTML", or something else altogether that describes language-wide features for a component-based UI.

### A Focus On the Language for Authouring Components

At a time when native web authoring languages HTML, CSS, and JavaScript have been put behind a compiler; everything has left its place! So here comes one of the biggest motivations for CHTML - to have a modern UI technology that supports the natural use of the web's authoring languages. With platform support, we can collectively put much dependencies behind us and get back to writing code that hits the ground running.