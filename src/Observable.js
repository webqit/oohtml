/**
 * @imports
 */
import { _intersect } from '@webqit/util/arr/index.js';

/**
 * @Observable
 * 
 * The OOHTML's internal Observable object
 * within elements and the document object.
 */
export default class Observable extends Map {
    constructor( ...args ) {
        super( ...args );
        this.observers = new Set;
        this.state = new Map;
    }
    set( key, value ) {
        let returnValue = super.set( key, value );
        this.fire( 'set', key, value, key );
        return returnValue;
    }
    delete( key ) {
        let returnValue = super.delete( key );
        this.fire( 'delete', key );
        return returnValue;
    }
    get( key ) {
        // Fire must come first...
        // observers may need to make values available
        this.fire( 'get', key );
        return super.get( key );
    }
    keyNames() { return Array.from( super.keys() );  }
    setState( key, value ) {
        let returnValue = this.state.set( key, value );
        this.fire( 'set:state', key, value );
        return returnValue;
    }
    getState( key ) {
        // Fire must come first...
        // observers may need to make values available
        this.fire( 'get:state', key );
        return this.state.get( key );
    }
    observe( type, key, callback ) {
        const entry = { type, key, callback };
        this.observers.add( entry );
        return () => this.observers.delete( entry);;
    }
    unobserve( type, key, callback ) {
        if ( Array.isArray( type ) || Array.isArray( key ) ) {
            throw new Error( `The "type" and "key" arguments can only be strings.` );
        }
        this.observers.forEach( entry => {
            if ( !( intersection( [ type, '*' ], entry.type ) && intersection( [ key, '*' ], entry.key ) && entry.callback === callback ) ) return;
            this.observers.delete( entry);
        } );
    }
    fire( type, key, ...args ) {
        // IMPORTANT: Array.from() must be used so that new additions to this.observers
        // during the loop aren't picked up!
        Array.from( this.observers ).forEach( entry => {
            if ( !( intersection( [ type, '*' ], entry.type ) && intersection( [ key, '*' ], entry.key ) ) ) return;
            entry.callback( ...args );
        } );
    }
}

const intersection = ( a, b ) => {
    if ( Array.isArray( b ) ) return _intersect( a, b ).length;
    return a.includes( b );
}
