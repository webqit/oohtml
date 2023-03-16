
/**
 * @imports
 */
import init, { Observer } from './index.js';

/**
 * @init
 */
init.call( window );

// As globals
if ( !self.wq ) { self.wq = {}; }
self.wq.Observer = Observer;