var SFDATA_API_URL = '/api/v1/locations';

var Backbone = require('backbone');
var $ = jQuery = Backbone.$ = require('jquery');
require('./vendor/jquery.sparkartSuggest.js');
var _ = require('underscore');

var search_template = require('../templates/search.hbs');
var suggestion_template = require('../templates/suggestion.hbs');

module.exports = Backbone.View.extend({
	events: {
		'submit': 'onSubmit',
		'select input[name="query"]': 'onSelect'
	},
	initialize: function(){
		_.bindAll( this, 'onSubmit', 'onSelect' );
		this.render();
	},
	render: function(){
		this.$el.html( search_template() );
		this.$query = this.$('input[name="query"]');
		this.$query.sparkartSuggest({
			source: function( string, options, cb ){
				$.getJSON( SFDATA_API_URL +'?q='+ string, function( suggestions ){
					suggestions = _.uniq( suggestions, function( suggestion ){
						return suggestion.title;
					});
					suggestions = _.pluck( suggestions, 'title' );
					cb( suggestions );
				});
			},
			elementConstructor: suggestion_template,
			threshold: 1,
			max: 5,
			delay: 250
		});
	},
	onSubmit: function( e ){
		e.preventDefault();
		this.collection.fetchQuery( this.$query.val() );
	},
	onSelect: function( e ){
		this.collection.fetchQuery( e.suggestion );
	}
});