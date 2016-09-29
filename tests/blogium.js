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

  it('check if Blog is an instance of Blogium', () => {
    const blog = new Blogium({
      host: 'http://atilafassina.com'
    });

    assert.instanceOf(blog, Blogium, 'blog is an instance of Blogium');
  });
});
