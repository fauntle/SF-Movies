var SFDATA_API_URL = 'http://data.sfgov.org/resource/yitu-d5am.json';

var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.Collection.extend({
	url: function(){
		return SFDATA_API_URL +'?$q='+ this.query;
	},
	initialize: function(){
		this.query;
		this.start = 0;
		_.bindAll( this, 'fetchQuery', 'next', 'prev' );
		this.fetchQuery('');
	},
	fetchQuery: function( query ){
		this.query = query;
		this.start = 0;
		this.fetch({
			dataType: 'jsonp',
			jsonp: '$jsonp',
			reset: true
		});
	},
	// set the next 5 locations as the current selection
	next: function(){
		if( this.length > this.start + 5 ){
			this.start += 5;
			this.trigger( 'start', this.start );
		}
	},
	// set the previous 5 locations as the current selection
	prev: function(){
		if( this.start - 5 >= 0 ){
			this.start -=5;
			this.trigger( 'start', this.start );
		}
	}
});