var Post = Backbone.Model.extend({
	defaults: {
		title: 'empty',
		content: 'empty'
	}
});

var Posts = Backbone.Collection.extend({
	model: Post,
	url: '/posts'
});

var PostsView = Backbone.View.extend({
    initialize: function() {
      this.collection.bind("add remove change", _.bind(this.render, this));
    },

    events: {
    	'submit form' : 'addPost',
    	'click #feed button' : 'deletePost'
    },

    template: Handlebars.compile(($("#posts-tpl").html())),

    addPost: function(e) {
    	e.preventDefault();
    	if($('input[name=title]').val() == '' || $('textarea[name=content]').val() == '')
    		console.log('empty');
    	else {
	    	this.collection.create({
	    		title: $('input[name=title]').val(),
	    		content: $('textarea[name=content]').val()
	    	});	
	    	e.target.reset();    		
    	}
    },

    deletePost: function(e) {
    	e.preventDefault();
    },

    render: function() {
	    html = this.template({
	        items: this.collection.toJSON()
	    });
	    this.$el.find("#feed").html(html);

	    return this;
    }
});

var posts = new Posts();
posts.fetch();
var postsView = new PostsView({
  el: "#posts",
  collection: posts
}).render();

