var ViewDispatcher = require('../dispatcher/view-dispatcher.js');
var ViewConstants = require('../constants/view-constants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';


/**
 * Store about the panel status, content, and more
 */
var PanelStore = assign( {}, EventEmitter.prototype, {

    /**
     * Holds the current open panel ID
     */
    activePanel: '',
    returnPanel: '',

    emitChange: function() {
        this.emit( CHANGE_EVENT );
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function( callback ) {
        this.on( CHANGE_EVENT, callback );
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function( callback ) {
        this.removeListener( CHANGE_EVENT, callback );
    },

    // Set Active Panel ID
    setActivePanel: function( id ) {
        this.activePanel = id;
    },

    // Get the Active Panel ID
    getActivePanel: function() {
        return this.activePanel;
    },

    // Set Active Panel ID
    setReturnPanel: function( id ) {
        if( null === id || false === id ) { id = ''; }
        this.returnPanel = id;
    },

    // Get the Active Panel ID
    getReturnPanel: function() {
        return this.returnPanel;
    }




});


ViewDispatcher.register( function( action ) {

    switch( action.actionType ) {

        case ViewConstants.PANEL_OPEN:
            PanelStore.setActivePanel( action.panelId );
            PanelStore.setReturnPanel( action.returnId );
            PanelStore.emitChange();
            break;

        case ViewConstants.PANEL_CLOSE:
            PanelStore.setActivePanel( '' );
            PanelStore.setReturnPanel( '' );
            PanelStore.emitChange();
            break;

    }

    return true; // Needed for Flux promise resolution

});

module.exports = PanelStore;