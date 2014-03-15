var SFDATA_API_URL = '/api/v1/locations';
var PAGINATION_OFFSET = 5;

var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.Collection.extend({
	url: function(){
		return SFDATA_API_URL +'?q='+ this.query;
	},
	parse: function( locations ){
		return _.map( locations, function( location ){
			location.actors = [];
			for( var i = 1; i <= 3; i++ ){
				var actor = location['actor_'+ i];
				if( actor ) location.actors.push( actor );
			}
			return location;
		});
	},
	initialize: function(){
		this.query;
		this.start = 0;
		_.bindAll( this, 'fetchQuery', 'next', 'prev' );
	},
	fetchQuery: function( query ){
		this.query = query;
		this.start = 0;
		this.fetch({
			reset: true
		});
	},
	// set the next 5 locations as the current selection
	next: function(){
		if( this.length > this.start + PAGINATION_OFFSET ){
			this.start += PAGINATION_OFFSET;
			this.trigger( 'start', this.start );
		}
	},
	// set the previous 5 locations as the current selection
	prev: function(){
		if( this.start - PAGINATION_OFFSET >= 0 ){
			this.start -=PAGINATION_OFFSET;
			this.trigger( 'start', this.start );
		}
	},
	// return the currently active selection
	current: function(){
		var current_locations = this.slice( this.start, this.start + PAGINATION_OFFSET );
		current_locations = _.map( current_locations, function( location ){
			return location.toJSON();
		});
		return current_locations;
	}
});