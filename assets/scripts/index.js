var $ = require('jquery');

var LocationsCollection = require('./locationsCollection.js');
var MapView = require('./mapView.js');
var SearchView = require('./searchView.js');
var LocationsView = require('./locationsView.js');

var sfmovies = window.sfmovies = {};

sfmovies.locations = new LocationsCollection();

$(function(){
	sfmovies.mapview = new MapView({
		el: '#map',
		collection: sfmovies.locations
	});
	sfmovies.searchview = new SearchView({
		el: '#search',
		collection: sfmovies.locations
	});
	sfmovies.locationsview = new LocationsView({
		el: '#locations',
		collection: sfmovies.locations
	});
});