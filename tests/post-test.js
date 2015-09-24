var expect = chai.expect;
require('main');

describe('Post', function(){
  describe("fetch", function(){

    it("should return a promise", function(){
      var promise = Post.fetch();
      expect(promise).to.respondTo('then');
    });

    it("should resolve with an array of posts", function(done){
      Post.fetch().then(function(posts){
        var firstPost = posts[0];
        expect(firstPost).to.have.property('title');
        expect(firstPost).to.have.property('body');
        expect(firstPost).to.have.property('_id');
        expect(firstPost).to.have.property('created_at');
        done();
      });
    });

    it("should trigger a posts:fetched event", function(done){

      $(document).on('posts:fetched', function(event, posts){
        expect(posts).to.be.an.instanceof(Array);
        done();
      });

      Post.fetch();
    });
  });
});

/*
  Post.fetch().then(function(posts){

  })
*/
