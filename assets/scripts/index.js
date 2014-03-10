var $ = require('jquery');
require('mapbox.js'); // attaches "automatically" to window.L

$(function(){
	var map = L.mapbox.map( 'map', 'fauntleroy.hfnj60nk' );
	map.setView( [ 37.78, -122.419 ], 13 ); // temporary. This should eventually default
});