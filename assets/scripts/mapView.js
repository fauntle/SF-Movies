var MAP_ID = 'fauntleroy.hfnj60nk';
var MAP_DEFAULT_CENTER = [ 37.78, -122.419 ];
var MAP_DEFAULT_ZOOM = 13;
var MAPBOX_GEOCODING_API_URL = 'http://api.tiles.mapbox.com/v3/'+ MAP_ID +'/geocode/';

var Backbone = require('backbone');
var $ = Backbone.$ = require('jquery');
var _ = require('underscore');
require('mapbox.js'); // attaches "automatically" to window.L

module.exports = Backbone.View.extend({
	initialize: function(){
		_.bindAll( this, 'geocodeQuery' );
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
		$.getJSON( MAPBOX_GEOCODING_API_URL + query +'.json?callback=?', callback.bind(this) );
	},
	drawMarkers: function(){
		var locations = this.collection;
		var location_names = locations.map( function( location ){
			// shim ", San Francisco" into locations to get more accurate results
			return location.get('locations') +', San Francisco';
		});
		var locations_query = location_names.join(';');
		this.geocodeQuery( locations_query, function( data ){
			var markers_geojson = locations.map( function( location, i ){
				var geocoding_results = data[i].results;
				// mapbox geocoder is not happy with the way this api returns location data
				// so we just give invalid locations 0,0 for now
				var geocoding_data = geocoding_results.length ? geocoding_results[0][0] : { lat: 0, lon: 0 };
				var marker_geojson = {
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [ geocoding_data.lon, geocoding_data.lat ]
					},
					properties: location.toJSON()
				};
				return marker_geojson;
			});
			var marker_layer = L.mapbox.featureLayer({
				type: 'FeatureCollection',
				features: markers_geojson
			});
			this.map.addLayer( marker_layer );
		});
	}
});