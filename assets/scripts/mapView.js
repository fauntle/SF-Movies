var MAP_ID = 'fauntleroy.hfnj60nk';
var MAP_DEFAULT_CENTER = [ 37.78, -122.419 ];
var MAP_DEFAULT_ZOOM = 13;

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
		this.geocoder = L.mapbox.geocoder( MAP_ID );
	},
	drawMarkers: function(){
		var locations = this.collection.map( function( location ){
			return location.get('locations');
		});
		var locations_query = locations.join(';');
		console.log( 'locations query', locations_query );
	}
});