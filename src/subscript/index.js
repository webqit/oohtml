
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
export default function init( _config = {} ) {

    const WebQit = domInit.call( this );
    if ( _config.onDomReady ) {
        WebQit.DOM.ready( () => {
            init.call( this, { ..._config, onDomReady: false } );
        } );
        return;
    }

    const mutations = WebQit.DOM.mutations;
    const _meta = config.call( this, {
        selectors: { script: 'script[type="subscript"]', },
        api: { bind: 'bind', unbind: 'unbind', },
        script: {},
    }, _config.params );

    const ContextifiableElement = BaseElement => class extends Element( BaseElement ) {
        static get compilerParams() {
            return _config.compilerParams || {};
        }
        static get runtimeParams() {
            return _config.runtimeParams || {};
        }
    };
    
    const SubscriptElement = ContextifiableElement();
    mutations.onPresent( _meta.get('selectors.script'), scriptElement => {

        let ownerNode = scriptElement.parentNode;
        if ( !ownerNode ) return;
        let scriptTags = _internals( ownerNode, 'oohtml', 'subscript' ).get( 'script-tags' );
        if ( !scriptTags ) {
            scriptTags = new WeakSet;
            _internals( ownerNode, 'oohtml', 'subscript' ).set( 'script-tags', scriptTags );
        }
        if ( scriptTags.has( scriptElement ) ) return;

        SubscriptElement.implementScript( scriptElement, ownerNode )();
        SubscriptElement.doConnectedCallback( ownerNode );
        scriptTags.add( scriptElement );

        let mo = mutations.onRemoved( ownerNode, () => {
            SubscriptElement.doDisconnectedCallback( ownerNode );
            scriptTags.delete( scriptElement );
            mo.disconnect();
        }, { ignoreTransients: true });

    } );

    if (!WebQit.OOHTML) {
        WebQit.OOHTML = {};
    }
    WebQit.OOHTML.SubscriptElement = ContextifiableElement;

}