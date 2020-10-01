# HTML Partials

HTML Partials is a DOM feature that lets us define, import, access, and compose with reusable HTML snippets using the *template*, *partials*, and *slots* paradigm.

## On this page:
+ [Templates, Partials and Slots](#templates-partials-and-slots)
+ [Slot Properties](#slot-properties)
+ [Nested Templates](#nested-templates)
+ [Remote Templates](#remote-templates)
+ [Partials API](#partials-api)
+ [Isomorphic Rendering](#isomorphic-rendering)

## Templates, Partials and Slots

A *template* is a collection of independent *partials* that can be consumed from anywhere in the main document.

```html
<head>

    <template name="template1">
        <div id="partial-1"></div>
        <div id="partial-2"></div>
    </template>

</head>
```

An element in the main document, called the *implementation block* or the *composition area*, can define `<partials-slot>`s, and then, point to a `<template>` to have the template's partials mapped to its slots. 

```html
<html>

    <head>

        <template name="template1">
            <div id="partial-2" partials-slot="slot-1"></div>
            <div id="partial-2" partials-slot="slot-2"></div>
        </template>

    </head>

    <body>

        <div template="template1">
            <h2>I have slots</h2>
            <partials-slot name="slot-1"></partials-slot>
            <div>
                <partials-slot name="slot-2"></partials-slot>
            </div>
        </div>

    </body>

</html>
```

Composition takes place and the slots are replaced by the template's partials. The block is said to have *implemented* the `<template>`.

```html
<html>

    <head>

        <template name="template1">
            <div id="partial-2" partials-slot="slot-1"></div>
            <div id="partial-2" partials-slot="slot-2"></div>
        </template>

    </head>

    <body>

        <div template="template1">
            <h2>I have slots</h2>
            <div id="partial-2" partials-slot="slot-1"></div>
            <div>
                <div id="partial-2" partials-slot="slot-2"></div>
            </div>
        </div>

    </body>

</html>
```

An implementation block can implement another `<template>` by simply pointing to it; `<partials-slot>`s are disposed off of their previous slotted contents and recomposed from the new `<template>`.

The `<partials-slot>` element, even though replaced, is never really destroyed. It returns to its exact position whenever the last of its slotted elements get deleted, or whenever the slot has no corresponding partial in the next implemented `<template>`.

HTML Partials also supports *Default Slots*. A template's direct children without an explicit `partials-slot` attribute are slotted into the *Default Slot* in the implementation block.

**Universal Slots**

By default, slots are scoped to their containing implementation block. But the `<partials-slot>` element may also be used independent of an implementation block to point to its own `<template>`.

```html
<html>

    <head>

        <template name="template1">
            <div partials-slot="slot-1"></div>
            <div partials-slot="slot-2"></div>
        </template>

        <template name="template2">
            <div partials-slot="slot-1"></div>
            <div partials-slot="slot-2"></div>
        </template>

    </head>

    <body>

        <div template="template1">
            <h2>I have slots</h2>
            <partials-slot name="slot-1"></partials-slot>
            <div>
                <partials-slot name="slot-1" template="template2"></partials-slot>
            </div>
        </div>

        <partials-slot name="slot-2" template="template1"></partials-slot>

    </body>

</html>
```

## Slot Properties

In HTML Partials, slots may be defined with extra properties that a slotted element can inherit. Every element slotted in its place will take on these properties.

Inherittable properties can be both attributes and content.

**Attributes**

A `<partials-slot>`'s attributes (other than the `name` and `template` attributes) are inheritted by every slotted element.

When a slotted element inherits attributes from a `<partials-slot>`, inheritted attributes are made to take priority over any existing attributes. On inheriting single-value attributes, like the `id` attribute, any such attribute is replaced on the slotted element. On inheriting space-delimitted attributes, like the `class` attribute, new and non-duplicate values are placed after any existing values on the slotted element. On inheriting key/value attributes, like the `style` attribute, new declarations are placed after any existing declarations on the slotted element (making CSS cascading work on the `style` attribute).

Below, we are using *Slot Attributes inheritance* to recompose the same *partial* differently on each slotting - to adapt it for each usecase.

```html
<html>

    <head>

        <template name="template1">
            <div partials-slot="slot-1"></div>
            <div partials-slot="slot-2"></div>
        </template>

    </head>

    <body>

        <div template="template1">
            <partials-slot name="slot-1" id="headline" style="color:red"></partials-slot>
        </div>

        <partials-slot name="slot-1" template="template1" style="color:blue"></partials-slot>

    </body>

</html>
```

**Content**

Normally, a `<partials-slot>` can have default content that renders before slotting takes place. But this content can instead be defined as a new set of *partials* that can be *implemented* by slotted elements. This time, the `<partials-slot>` element gets to act as the `<template>` and the slotted element as the *implementation block*. (In the light/shadow terminology, this is the `<partials-slot>` element acting as an element's *Light DOM* and the slotted element as its *Shadow DOM*.)

To implement a `<partials-slot>`, a *partial* would set its `template` attribute to the keyword `@slot` instead of pointing to an actual `<template>` element.

```html
<html>

    <head>

        <template name="template2">

            <!-- I am a recomposable partial. My ideal slot provides the partials for me -->
            <div partials-slot="slot-1" template="@slot">
                <partials-slot name="slot-1-1"></partials-slot>
            </div>
            
            <!-- I am a regular partial -->
            <div partials-slot="slot-2"></div>

        </template>

    </head>

    <body>

        <div template="template1">

            <!-- I am an implementable slot. My ideal partial defines slots -->
            <partials-slot name="slot-1">
                <div partials-slot="slot-1-1"></div>
            </partials-slot>

        </div>

    </body>

</html>
```

## Nested Templates

Templates may be nested for organizational purposes. 

```html
<template name="template1">

    <div partials-slot="slot1"></div>
    <div partials-slot="slot2"></div>

    <template name="nested1">
        <div partials-slot="slot3"></div>
        <div partials-slot="slot4"></div>
    </template>
    <template name="nested2">
        <div partials-slot="slot5"></div>
        <div partials-slot="slot6"></div>
    </template>

</template>
```

Nested templates are referenced using a path notation: 

```html
<div template="template1/nested1">
</div>
```

## Remote Templates

Templates may reference remote content using the `src` attribute.

**Remote file: http://localhost/templates.html**

```html
    <div partials-slot="slot-1"></div>
    <div partials-slot="slot-2"></div>

    <template name="extended">
        <div partials-slot="slot-3"></div>
        <div partials-slot="slot-4"></div>
    </template>
<p></p>
```

**Document: http://localhost**

```html
<head>
    <template name="template1" src="/templates.html"></template>
</head>
```

Where remote templates are detected in a document, `<partials-slot>`s are resolved after all `<template>`s have loaded their content.

## Isomorphic Rendering

When rendering happens on the server and has to be serialized for the browser to take over, the browser must still be able to maintain references to all `<partials-slot>`s, even those replaced on the server. HTML Partials addresses this by serializing `<partials-slot>` elements as *comment nodes* (`<!-- <partials-slot></partials-slot> -->`) with a view to recreating the original slot elements from these comments on getting to the browser. This way, composition is able to continue. Now in the browser, deleting a server-slotted element, for example, should trigger the restoration of the original `<partials-slot>` element; changing the `template` attribute of any element should dispose off all its server-slotted elements and recompose the block from the new referenced `<template>`.

**Before Rendering on the Server**

```html
<html>

    <head>

        <template name="template2">
            <div partials-slot="slot-1"></div>
            <div partials-slot="slot-2"></div>
        </template>

    </head>

    <body>

        <div template="template1">
            <partials-slot name="slot-1" id="headline" style="color:red">Default Headline</partials-slot>
        </div>

        <partials-slot template="template1" name="slot-1" style="color:blue"></partials-slot>

    </body>

</html>
```

**After Rendering on the Server**

```html
<html>

    <head>

        <template name="template2">
            <div partials-slot="slot-1"></div>
            <div partials-slot="slot-2"></div>
        </template>

    </head>

    <body>

        <div template="template1">
            <div partials-slot="slot-1" id="headline" style="color:red"></div>
            <!-- <partials-slot name="slot-1" id="headline" style="color:red">Default Headline</partials-slot> -->
        </div>

        <div partials-slot="slot-1" style="color:blue"></div>
        <!-- <partials-slot template="template1" name="slot-1" style="color:blue"></partials-slot> -->

    </body>

</html>
```

**Now on the Browser**

Find and delete the server-slotted element with ID `#headline`. The original `<partials-slot>` element should now be restored and ready to be replaced the next time composition takes place.

```html
<html>

    <head>

        <template name="template2">
            <div partials-slot="slot-1"></div>
            <div partials-slot="slot-2"></div>
        </template>

    </head>

    <body>

        <div template="template1">
            <partials-slot name="slot-1" id="headline" style="color:red">Default Headline</partials-slot>
            <!-- <partials-slot name="slot-1" id="headline" style="color:red">Default Headline</partials-slot> -->
        </div>

        <div partials-slot="slot-1" style="color:blue"></div>
        <!-- <partials-slot template="template1" name="slot-1" style="color:blue"></partials-slot> -->

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

## Partials API

HTML Partials introduces a few new DOM properties for working with composition.

**For the document object:**

+ `document.templatesReadyState` - (Much like the [`document.readyState`](https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState) property.) This property reflects the document's loading status of remote templates:
    + `loading` - This is the initial value of this property.
    + `complete` - This is the value of this property when templates are done loading, or when there are no remote templates at all.
    
    When the state of this property changes, the `templatesreadystatechange` event is fired on the document object.
+ `document.templates` - This property represents the list of `<template>`s in the document. References to templates are maintained here by name. So `document.templates.template1` should return the `<template>` element used in the examples above.

**For the `<template>` element:**

+ `<template>.partials` - This property represents the list of *partials* defined by the `<template>`. References to *partials* are maintained here by name. Unnamed *partials* are treated as having the name *default*. So, for the `<template>` below,
    
    ```html
    <template name="template1">
        <div partials-slot="one"></div>
        <div partials-slot="two"></div>
        <div partials-slot="default"></div>
        <p></p>
    </template>
    ```

    accessing `document.templates.template1.partials.one` should return an array containing the first `<div>`; while `document.templates.template1.partials.default` should return an array containing the last `<div>` and `<p>`.

+ `<template>.templates` - This property represents the list of `<template>`s nested within the `<template>`. References to templates are maintained here by name.
    
    ```html
    <template name="template1">
        <template name="nested1"></template>
        <template name="nested2">
            <div partials-slot="one"></div>
        </template>
    </template>
    ```

    accessing `document.templates.template1.templates.nested1` should return the first nested `<template>`, while `document.templates.template1.templates.nested2` the second nested `<template>`. And the nesting can go on as much as code organization requires.

**For every element:**

+ `element.template` - This property is a reference to the `<template>` element pointed to by an element. So if an element implements a template as in `<div template="html/temp"></div>`, then `element.template` should be a reference to the `<template>` at the `module/temp` namespace; `element.template.partials.default` should thus return an array like the above.

**For the `<partials-slot>` element:**

+ `<partials-slot>.slottedElements` - (Much like the [`HTMLSlotElement.assignedElements()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/assignedElements) method.) This property represents the list of partials slotted into a slot.
+ `<partials-slot>.resolve()` - This method, without arguments, is used to programatically resolve a `<partials-slot>` from the appropriate `<template>` given in context.
+ `<slot>.empty([silently = false])` - This method is used to programatically empty the *slot* of its *partials*, thereby triggering the restoration of the `<partials-slot>` element itself. To empty the *slot* silently without restoring the original `<partials-slot>` element, provide `true` on the first parameter.

**For slotted elements:**

+ `element.slotReference` - (Much like the [`Slottable.assignedSlot`](https://developer.mozilla.org/en-US/docs/Web/API/Slottable/assignedSlot) property.) This property gives a reference to the `<partials-slot>` element an element was assigned to.
