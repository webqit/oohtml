
/**
 * @imports
 */
import init, { SubscriptFunction, Observer } from './index.js';

/**
 * @init
 */
init.call( window );

// As globals
if ( !self.wq ) { self.wq = {}; }
self.wq.SubscriptFunction = SubscriptFunction;
self.wq.Observer = Observer;