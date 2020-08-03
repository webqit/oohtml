
### Template Inheritance

Templates laid out hierarchically can benefit from inheritance where a child template is an extension of a parent template. Here, partials in a parent template are implicitly inheritted by child templates that define the `inherit` Boolean attribute. This could facilitate reusability and drastically minimize repetition down the hierarchy.

```html
<html>

    <head>

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

    </head>

    <body>

        <div template="template1/nested1">
            <h2>I have slots</h2>
            <slot name="slot1"></slot>
            <span>
                <slot name="slot2"></slot>
                <slot name="slot3"></slot>
            </span>
            <span>
                <slot name="slot4"></slot>
            </span>
        </div>

    </body>

</html>
```

Inheritance takes effect at slot-resolution time.
