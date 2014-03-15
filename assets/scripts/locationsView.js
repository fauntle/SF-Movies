var Backbone = require('backbone');
var $ = Backbone.$ = require('jquery');

var locations_template = require('../templates/locations.hbs');

module.exports = Backbone.View.extend({
	events: {
		'click a[href="#previous"]': 'clickPrevious',
		'click a[href="#next"]': 'clickNext'
	},
	initialize: function(){
		this.listenTo( this.collection, 'reset start', this.render );
		this.render();
	},
	render: function(){
		this.$el.html( locations_template( this.collection.current() ) );
	},
	clickPrevious: function( e ){
		e.preventDefault();
		this.collection.prev();
	},
	clickNext: function( e ){
		e.preventDefault();
		this.collection.next();
	}
})