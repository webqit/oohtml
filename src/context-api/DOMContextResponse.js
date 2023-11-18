
/**
 * @imports
 */
import { env } from '../util.js';

export default class DOMContextResponse extends AbortController {
    constructor( callback ) {
        super();
        callback( response => {
            const { window: { webqit: { Observer } } } = env;
            Observer.defineProperty( this, 'value', { value: response, configurable: true, enumerable: true } );
        }, this );
    }
}