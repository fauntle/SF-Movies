var SFDATA_API_URL = 'http://data.sfgov.org/resource/yitu-d5am.json';

var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
	url: function(){
		return SFDATA_API_URL +'?$q='+ this.query;
	},
	initialize: function(){
		
	}
});