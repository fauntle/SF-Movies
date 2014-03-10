var SFDATA_API_URL = 'http://data.sfgov.org/resource/yitu-d5am.json';

var Backbone = require('backbone');
var _ = require('underscore');

module.exports = Backbone.Collection.extend({
	url: function(){
		return SFDATA_API_URL +'?$q='+ this.query;
	},
	initialize: function(){
		_.bindAll( this, 'fetchQuery' );
	},
	fetchQuery: function( query ){
		this.query = query;
		this.fetch({
			dataType: 'jsonp',
			jsonp: '$jsonp',
			reset: true
		});
	}
});