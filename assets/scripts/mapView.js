var MAP_DEFAULT_CENTER = [ 37.78, -122.419 ];
var MAP_DEFAULT_ZOOM = 13;
var NO_OP = function(){};

var Backbone = require('backbone');
var $ = Backbone.$ = require('jquery');
var _ = require('underscore');
var async = require('async');
require('mapbox.js'); // attaches "automatically" to window.L

module.exports = Backbone.View.extend({
	initialize: function(){
		_.bindAll( this, 'geocodeQuery' );
		this.render();
		this.listenTo( this.collection, 'reset', this.drawMarkers );
	},
	render: function(){
		this.map = new google.maps.Map( this.el, {
			center: new google.maps.LatLng( MAP_DEFAULT_CENTER[0], MAP_DEFAULT_CENTER[1] ),
			zoom: MAP_DEFAULT_ZOOM
		});
		this.geocoder = new google.maps.Geocoder();
		this.geocoder_bounds = new google.maps.LatLngBounds(
			new google.maps.LatLng( MAP_DEFAULT_CENTER[0] - 10, MAP_DEFAULT_CENTER[1] - 10 ),
			new google.maps.LatLng( MAP_DEFAULT_CENTER[0] + 10, MAP_DEFAULT_CENTER[1] + 10 )
		);
	},
	// custom batch geocoding method
	// build in geocoder doesn't work with batch requests for some reason
	// issue filed: https://github.com/mapbox/mapbox.js/issues/708
	geocodeQuery: function( query, callback ){
		query = _.isArray( query ) ? query : [ query ];
		callback = callback || NO_OP;
		async.map( query, function( location, cb ){
			this.geocoder.geocode({
				address: location,
				bounds: this.geocoder_bounds
			}, function( results, status ){
				if( !results ) return cb( new Error('Cannot geocode location'), null );
				var lat = results[0].geometry.location.d;
				var lon = results[0].geometry.location.e;
				return cb( null, [ lat, lon ] );
			});
		}.bind( this ), callback.bind( this ) );
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