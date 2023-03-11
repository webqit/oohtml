
/**
 * @imports
 */
import init, { Observer } from './index.js';

/**
 * @init
 */
init.call( window );
// As globals
if ( !window.wq ) { window.wq = {}; }
window.wq.Observer = Observer;