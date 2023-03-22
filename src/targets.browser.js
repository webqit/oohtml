
/**
 * @imports
 */
import init, { Observer } from './index.js';

/**
 * @init
 */
init.call( window );

// As globals
if ( !self.webqit ) { self.webqit = {}; }
self.webqit.Observer = Observer;