var models = require('models');
var views = require('views');

$(document).ready(function(){
  $('body').prepend(JST.application());

  var view = new PostsView();

  $(document).on('posts:fetched', function(event, posts){
    view.showPosts(posts);
  });

  Post.fetch();
});
