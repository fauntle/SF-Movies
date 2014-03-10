var MAP_ID = 'fauntleroy.hfnj60nk';
var MAP_DEFAULT_CENTER = [ 37.78, -122.419 ];
var MAP_DEFAULT_ZOOM = 13;
var MAPBOX_GEOCODING_API_URL = 'http://api.tiles.mapbox.com/v3/'+ MAP_ID +'/geocode/';

var Backbone = require('backbone');
var $ = Backbone.$ = require('jquery');
require('mapbox.js'); // attaches "automatically" to window.L

module.exports = Backbone.View.extend({
	initialize: function(){
		this.render();
		this.listenTo( this.collection, 'reset', this.drawMarkers );
	},
	render: function(){
		this.map = L.mapbox.map( this.el, MAP_ID );
		this.map.setView( MAP_DEFAULT_CENTER, MAP_DEFAULT_ZOOM ); // temporary. This should eventually default
	},
	// custom batch geocoding method
	// build in geocoder doesn't work with batch requests for some reason
	// issue filed: https://github.com/mapbox/mapbox.js/issues/708
	geocodeQuery: function( query, callback ){
		query = encodeURIComponent( query );
		$.getJSON( MAPBOX_GEOCODING_API_URL + query +'.json?callback=?', callback );
	},
	drawMarkers: function(){
		var locations = this.collection.map( function( location ){
			return location.get('locations');
		});
		var locations_query = locations.join(';');
		console.log( 'locations query', locations_query );
	}
});