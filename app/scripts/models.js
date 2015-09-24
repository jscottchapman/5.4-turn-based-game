function Post() {
}

Post.fetch = function(){
  return new $.ajax("http://tiny-lasagna-server.herokuapp.com/collections/posts").then(function(posts){
    $(document).trigger('posts:fetched', [posts]);
    return posts;
  });
}


window.Post = Post;
