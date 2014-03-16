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
		var context = {
			results: this.collection.current(),
			// determine if prev/next buttons need to be shown
			next: ( this.collection.start + 5 < this.collection.length ),
			previous: ( this.collection.start > 0 )
		};
		this.$el.html( locations_template( context ) );
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