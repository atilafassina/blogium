import Blogium from '../src/blogium.js';

describe('Blogium', () => {

  before(() => {
    global.wrapper = document.createElement('div');
    global.wrapper.setAttribute('class', 'mediumWrap');

    global.moreBtn = document.createElement('button');
    global.moreBtn.id = 'moreBtn';

    document.body.appendChild(global.wrapper);
    document.body.appendChild(global.moreBtn);
  });

  describe('#constructor', () => {
    it('check if Blog is an instance of Blogium', () => {
      const blog = new Blogium({
        host: 'atilafassina.com'
      });

      assert.instanceOf(blog, Blogium, 'blog is an instance of Blogium');
    });
  });

  describe('#blogPostTemplate', () => {
    it('should return a string with html code', () => {
      const blog = new Blogium({
        host: 'atilafassina.com'
      });

      const mockPost = {
        items: [{
          title: "post title",
          link: "http://post.url",
          pubDate: "Wed, 21 Sep 2016 12:50:35 GMT",
          author: "Átila Fassina",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui excepturi sit modi.",
          content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto saepe temporibus iure odio eaque dolor."
        }]
      };

      let post = blog.blogPostTemplate(mockPost);

      assert.equal(typeof post, 'string', 'post must be a string');
    });
  });

  describe('#setLinkTarget', () => {
    it('should change target of outbound links to _blank', () => {
      const blog = new Blogium({
        host: 'atilafassina.com'
      });

      for(let i=0; i < 10; i++) {
        let newLink = document.createElement('a');
        newLink.href = 'github.com';
        newLink.setAttribute('target', '_self');
        global.wrapper.appendChild(newLink);
      }

      blog.setLinkTarget(global.wrapper);

      assert.equal(global.wrapper.querySelector('a').getAttribute('target'), '_blank', 'target is blank');

      global.wrapper.innerHTML='';
    });

    it('should keep target of inbound links as _self', () => {
      const blog = new Blogium({
        host: 'atilafassina.com'
      });

      for(let i=0; i < 10; i++) {
        let otherLink = document.createElement('a');
        otherLink.href = 'http://atilafassina.com';
        otherLink.setAttribute('target', '_self');
        global.wrapper.appendChild(otherLink);
      }

      blog.setLinkTarget(global.wrapper);

      assert.equal(global.wrapper.querySelector('a').getAttribute('target'), '_self', 'target is _self');
    });
  });

  // describe('#getPosts', () => {
  //   it('check if fake request is hey', function(done) {

  //   });
  // });
});



