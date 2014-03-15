var Backbone = require('backbone');
var $ = Backbone.$ = require('jquery');
var _ = require('underscore');

var intro_template = require('../templates/intro.hbs');

module.exports = Backbone.View.extend({
	initialize: function(){
		_.bindAll( this, 'show', 'hide' );
		this.render();
	},
	render: function(){
		this.$el.html( intro_template() );
	},
	show: function(){

	},
	hide: function(){

	}
});