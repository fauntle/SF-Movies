var $ = require('jquery');
require('mapbox.js'); // attaches "automatically" to window.L

$(function(){
	L.mapbox.map( 'map', 'fauntleroy.hfnj60nk' );
});