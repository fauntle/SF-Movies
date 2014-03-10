var MAP_ID = 'fauntleroy.hfnj60nk';
var MAP_DEFAULT_CENTER = [ 37.78, -122.419 ];
var MAP_DEFAULT_ZOOM = 13;

var Backbone = require('backbone');
var $ = Backbone.$ = require('jquery');

module.exports = Backbone.View.extend({
	initialize: function(){
		this.render();
	},
	render: function(){
		this.map = L.mapbox.map( this.el, MAP_ID );
		this.map.setView( MAP_DEFAULT_CENTER, MAP_DEFAULT_ZOOM ); // temporary. This should eventually default
	}
});