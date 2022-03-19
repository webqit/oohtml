
/**
 * @imports
 */
import { _internals } from '@webqit/util/js/index.js';
import domInit from '@webqit/browser-pie/src/dom/index.js';
import { Element } from './Element.js';
import { config } from '../util.js';

/**
 * @init
 * 
 * @param Object config
 */
export default function init( _config = null, onDomReady = false ) {

    const WebQit = domInit.call( this );
    if ( onDomReady ) {
        WebQit.DOM.ready( () => {
            init.call( this, _config, false );
        } );
        return;
    }

    const mutations = WebQit.DOM.mutations;
    const _meta = config.call( this, {
        selectors: { script: 'script[type="subscript"]', },
        api: { bind: 'bind', unbind: 'unbind', },
        script: {},
    }, _config );

    const subscriptElement = Element( class {} );
    mutations.onPresent( _meta.get('selectors.script'), scriptElement => {

        let ownerNode = scriptElement.parentNode;
        if ( !ownerNode ) return;
        let embeds = _internals( ownerNode, 'oohtml', 'subscript' ).get( 'embeds' );
        if ( !embeds ) {
            embeds = new WeakSet;
            _internals( ownerNode, 'oohtml', 'subscript' ).set( 'embeds', embeds );
        }
        if ( embeds.has( scriptElement ) ) return;

        subscriptElement.implementScript( scriptElement, ownerNode )();
        subscriptElement.doConnectedCallback( ownerNode );
        embeds.add( scriptElement );

        let mo = mutations.onRemoved( ownerNode, () => {
            subscriptElement.doDisconnectedCallback( ownerNode );
            embeds.delete( scriptElement );
            mo.disconnect();
        }, { ignoreTransients: true });

    } );

    if (!WebQit.OOHTML) {
        WebQit.OOHTML = {};
    }
    WebQit.OOHTML.SubscriptElement = Element;

}