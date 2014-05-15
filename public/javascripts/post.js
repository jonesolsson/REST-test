var Post = Backbone.Model.extend({
    defaults: {
      title: 'title',
      content: 'content'
    },
    urlRoot: '/posts'
});

var Posts = Backbone.Collection.extend({
	model: Post,
	url: '/posts'
});

//ALL POSTs VIEW
var PostsView = Backbone.View.extend({
    initialize: function() {
      this.collection.bind("add remove change", _.bind(this.render, this));      
    },

    events: {
    	'submit form' : 'addPost',
    	'click #feed .remove' : 'deletePost',
      'click #feed .update' : 'updatePost',
      'click #feed .edit'   : 'editPost'  
    },

    template: Handlebars.compile(($("#posts-tpl").html())),

    addPost: function(e) {
    	e.preventDefault();
    	if($('input[name=title]').val() == '' || $('textarea[name=content]').val() == '')
    		$('.error').addClass('show');
    	else {        
	    	this.collection.create({
	    		title: $('#addPostForm input[name=title]').val(),
	    		content: $('#addPostForm textarea[name=content]').val()
	    	});	
	    	e.target.reset();
        $('.error').removeClass('show');    		
    	}
    },

    deletePost: function(e) {
    	e.preventDefault();
        var model = this.collection.get(e.target.dataset.id);
        model.destroy();        
    },

    updatePost: function(e) {
        e.preventDefault();
        var model = this.collection.get(e.target.dataset.id);     
        model.save({
          title: $(e.target).parent().find('input').val(),
          content: $(e.target).parent().find('textarea').val()
        });        
    },

    editPost: function(e) {
      id = $(e.target).parent().find('.remove').attr('data-id');         
      $('.' + id).toggleClass('hide');
    },

    render: function() {
	    html = this.template({
	     items: this.collection.toJSON()
	    });
	    this.$el.find("#feed").html(html);

	    return this;
    }
});

//SINGEL POST VIEW
var PostView = Backbone.View.extend({
    initialize: function() {
      this.model.bind("add remove change", _.bind(this.render, this));  
    },

    template: Handlebars.compile(($("#single-post-tpl").html())),
    render: function() {
      html = this.template({
        item: this.model.toJSON()
      });
      this.$el.find("#post").html(html);

      return this;
    }    
});

var AppRouter = Backbone.Router.extend({
    routes: { '': 'home',
              'posts/:id' : 'view', 
    },
    home: function() {

      $('#post').empty();

      var posts = new Posts();
      posts.fetch();
      var postsView = new PostsView({
        el: "#posts",
        collection: posts
      }).render();
    },
    view: function(id) { 

     $('#posts').empty(); 

     var post = new Post({id: id});
     post.fetch();
     var postView = new PostView({
      el: '#single-post',
      model: post
     }).render();
    }
});

router = new AppRouter();
Backbone.history.start();

