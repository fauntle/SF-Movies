var MAP_DEFAULT_CENTER = [ 37.79, -122.419 ];
var MAP_DEFAULT_ZOOM = 12;
var NO_OP = function(){};

var Backbone = require('backbone');
var $ = Backbone.$ = require('jquery');
var _ = require('underscore');
var async = require('async');

var info_template = require('../templates/info.hbs');

module.exports = Backbone.View.extend({
	initialize: function(){
		_.bindAll( this, 'geocodeQuery' );
		// start geocoder with appropriate bounding box
		this.geocoder = new google.maps.Geocoder();
		this.geocoder_bounds = new google.maps.LatLngBounds(
			new google.maps.LatLng( MAP_DEFAULT_CENTER[0] - 1, MAP_DEFAULT_CENTER[1] - 1 ),
			new google.maps.LatLng( MAP_DEFAULT_CENTER[0] + 1, MAP_DEFAULT_CENTER[1] + 1 )
		);
		// store map data internally for use later
		this.markers = [];
		this.previous_infowindow;
		this.listenTo( this.collection, 'reset start', this.drawMarkers );
		this.render();
	},
	render: function(){
		this.map = new google.maps.Map( this.el, {
			center: new google.maps.LatLng( MAP_DEFAULT_CENTER[0], MAP_DEFAULT_CENTER[1] ),
			zoom: MAP_DEFAULT_ZOOM,
			panControl: false,
			streetViewControl: false,
			mapTypeControl: false
		});
	},
	// custom batch geocoding method
	geocodeQuery: function( query, callback ){
		query = _.isArray( query ) ? query : [ query ];
		callback = callback || NO_OP;
		async.map( query, function( location, cb ){
			this.geocoder.geocode({
				address: location.replace( /\(\)/ig, '' ),
				bounds: this.geocoder_bounds
			}, function( results, status ){
				if( status !== 'OK' ) return cb( null, null );
				var location = results[0].geometry.location;
				var lat = location.lat();
				var lon = location.lng();
				return cb( null, [ lat, lon ] );
			});
		}.bind( this ), callback.bind( this ) );
	},
	// remove all markers currently on the map
	clearMarkers: function(){
		for( var i = 0; i < this.markers.length; i++ ){
			this.markers[i].setMap( null );
		}
		this.markers = [];
	},
	// draw markers for "current" locations in locations collection
	// geocodes location strings and places markers on coordinates (if they exist)
	drawMarkers: function(){
		var location_names = _.pluck( this.collection.current(), 'locations' );
		this.clearMarkers();
		this.geocodeQuery( location_names, function( err, data ){
			this.collection.each( function( location, i ){
				var geocoding_results = data[i];
				if( !geocoding_results ) return;
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng( geocoding_results[0], geocoding_results[1] ),
					title: location.get('title'),
					animation: google.maps.Animation.DROP,
					map: this.map
				});
				var infowindow = new google.maps.InfoWindow({
					content: info_template( location.toJSON() )
				});
				google.maps.event.addListener( marker, 'click', function(){
					infowindow.open( this.map, marker );
					if( this.previous_infowindow ) this.previous_infowindow.close();
					this.previous_infowindow = infowindow;
				}.bind( this ));
				this.markers.push( marker );
			}.bind( this ));
		});
	}
});