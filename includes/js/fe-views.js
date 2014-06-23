/**
 * Custom js script loaded on Views frontend
 *
 * @package   GravityView
 * @license   GPL2+
 * @author    Katz Web Services, Inc.
 * @link      http://gravityview.co
 * @copyright Copyright 2014, Katz Web Services, Inc.
 *
 * @since 1.0.0
 */


jQuery(document).ready( function( $ ) {

	var gvFront = {

		init: function() {
			this.cookies();
		},

		cookies: function() {
			if( $("#gravityview-view-id").length > 0 ) {

				var viewId = $("#gravityview-view-id").val();

				// Manages the Go Back link in single entry view based on cookies
				if( $("#gravityview_back_link").length > 0 ) {
					// single entry view
					if( $.cookie('gravityview_back_link_'+ viewId ) != null ) {
						$("#gravityview_back_link").attr('href', $.cookie('gravityview_back_link_'+ viewId) );
					}

				} else {
					// directory view

					//set cookie
					$.cookie('gravityview_back_link_'+ viewId, window.location.href, { path: '/' } );

				}
			}
		}
	};

	gvFront.init();

});
