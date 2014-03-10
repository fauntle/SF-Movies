var MAP_DEFAULT_CENTER = [ 37.79, -122.419 ];
var MAP_DEFAULT_ZOOM = 12;
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
			zoom: MAP_DEFAULT_ZOOM,
			panControl: false,
			streetViewControl: false
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
				if( status !== 'OK' ) return cb( null, null );
				var lat = results[0].geometry.location.d;
				var lon = results[0].geometry.location.e;
				return cb( null, [ lat, lon ] );
			});
		}.bind( this ), callback.bind( this ) );
	},
	drawMarkers: function(){
		var map = this.map;
		var location_names = this.collection.pluck('locations');
		this.geocodeQuery( location_names, function( err, data ){
			this.collection.each( function( location, i ){
				var geocoding_results = data[i];
				if( !geocoding_results ) return;
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng( geocoding_results[0], geocoding_results[1] ),
					title: location.get('title'),
					animation: google.maps.Animation.DROP,
					map: map
				});
			});
		});
	}
});