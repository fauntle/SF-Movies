var Backbone = require('backbone');
var $ = Backbone.$ = require('jquery');
var store = require('store');

var intro_template = require('../templates/intro.hbs');

module.exports = Backbone.View.extend({
	events: {
		'click a[href="#gotit"]': 'clickGotIt'
	},
	initialize: function(){
		var intro_viewed = store.get('sfmovies:intro_viewed');
		if( intro_viewed ) return this.remove();
		this.render();
	},
	render: function(){
		this.$el.html( intro_template() );
	},
	clickGotIt: function( e ){
		console.log('clickind');
		e.preventDefault();
		this.remove();
		store.set( 'sfmovies:intro_viewed', true );
	}
});