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

  describe('#setLinkTarget', () => {
    if (typeof Array.from !== 'function') {
      Array.from = function(list) {
        return [].slice.call(list);
      }
    }

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
});


