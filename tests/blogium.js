import Blogium from '../src/blogium.js';
import fetchMock from 'fetch-mock';

describe('Blogium', () => {
  let blog;

  const wrapperLinks = (href, target) => {
    for(let i = 0; i < 10; i++) {
      let element = document.createElement('a');
      element.href = href;
      element.setAttribute('target', target);
      global.wrapper.appendChild(element);
    }
  }


  beforeEach(() => {
    fetchMock.get('*', { "hello": "world"});

    global.wrapper = document.createElement('div');
    global.wrapper.setAttribute('class', 'mediumWrap');

    global.moreBtn = document.createElement('button');
    global.moreBtn.id = 'moreBtn';

    document.body.appendChild(global.wrapper);
    document.body.appendChild(global.moreBtn);

    blog = new Blogium({
      host: 'atilafassina.com'
    });
  });

  afterEach(() => fetchMock.restore());

  describe('#constructor', () => {
    it('check if Blog is an instance of Blogium', () => {

      assert.instanceOf(blog, Blogium, 'blog is an instance of Blogium');
    });
  });

  describe('#blogPostTemplate', () => {
    it('should return a string with html code', () => {

      const mockPost = {
        title: "post title",
        link: "https://post.url",
        pubDate: "Wed, 21 Sep 2016 12:50:35 GMT",
        author: "Átila Fassina",
        categories: ['writing', 'medium', 'cms'],
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto saepe temporibus iure odio eaque dolor."
      };

      const post = blog.blogPostTemplate(mockPost);
      assert.equal(typeof post, 'string', 'post must be a string');
    });
  });

  describe('#setLinkTarget', () => {
    afterEach(() => global.wrapper.innerHTML = '');

    it('should change target of outbound links to _blank', () => {
      wrapperLinks('github.com', '_blank');
      blog.setLinkTarget(global.wrapper);
      assert.equal(global.wrapper.querySelector('a').getAttribute('target'), '_blank', 'target is blank');
    });

    it('should keep target of inbound links as _self', () => {
      wrapperLinks('https://atilafassina.com', '_self');
      blog.setLinkTarget(global.wrapper);
      assert.equal(global.wrapper.querySelector('a').getAttribute('target'), '_self', 'target is _self');
    });
  });

  describe('#fetch-test', () => {
    it('should request the default url', () => {
      assert.equal(fetchMock.lastUrl(), '//rss2json.com/api.json?rss_url=https%3A//medium.com/feed/@Medium');
    });

    it('should request only once', () => {
      assert.equal(fetchMock.calls('*').length, 1);
    });
  });
});
