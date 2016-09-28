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

  it('check instance', () => {
    const blog = new Blogium();

    assert.instanceOf(blog, Blogium);
  });
});
