import { analyzeSource, handleScopedJS } from "../src/scoped-js/index.js";

const source = `
import 'https://unpkg.com/@webqit/oohtml/dist/main.js'
; import * as oohmtl from 'https://unpkg.com/@webqit/oohtml/dist/main.js'
;
console.log('-----------------------scoped module, with imports---------------------------------', this?.id);
import * as oohmktl from 'https://unpkg.com/@webqit/oohtml/dist/main.js';
let dd = async () => () => (await f) && true 

import defaultExport from "module-name";
import * as name from "module-name";
import { export1 } from "module-name";
import { export1 as alias1 } from "module-name";
import { default as alias } from "module-name";
import { export1, export2 } from "module-name";
import { export1, export2 as alias2, /* … */ } from "module-name";
import { "string name" as alias } from "module-name";
import defaultExport, { export1, /* … */ } from "module-name";
import defaultExport, * as name from "module-name";
import "module--------name";

let dd = async function () {
    if (jdjd) {
        await fffkkf;
    }
}
`;

let [ imports, body, meta ] = analyzeSource( source, true );
console.log( JSON.stringify( imports, null, 4 ) );
console.log( body );
console.log( meta );


console.log( '--------------------------------------------------------------------' );

let textContent = source;
console.log( '::', handleScopedJS( { textContent }, false ) );