function PostsView() {
  $('body').append('<ul class="posts">');
}

PostsView.prototype.showPosts = function(posts){
  posts.forEach(function(post){
    $('.posts').append('<li><h1>' + post.title + '</h1><p>' + post.body +'</p></li>');
  });
};

window.PostsView = PostsView;
