var Backbone = require('backbone');
var $ = Backbone.$ = require('jquery');

var search_template = require('../templates/search.hbs');

module.exports = Backbone.View.extend({
	events: {
		'submit': 'onSubmit'
	},
	initialize: function(){
		this.render();
	},
	render: function(){
		this.$el.html( search_template() );
		this.$query = this.$('input[name="query"]');
	},
	onSubmit: function( e ){
		e.preventDefault();
		this.collection.fetchQuery( this.$query.val() );
	}
});