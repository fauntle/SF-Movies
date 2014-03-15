var Backbone = require('backbone');
var $ = Backbone.$ = require('jquery');

var intro_template = require('../templates/intro.hbs');

module.exports = Backbone.View.extend({
	events: {
		'click a[href="#gotit"]': 'clickGotIt'
	},
	initialize: function(){
		this.render();
	},
	render: function(){
		this.$el.html( intro_template() );
	},
	clickGotIt: function( e ){
		console.log('clickind');
		e.preventDefault();
		this.remove();
	}
});