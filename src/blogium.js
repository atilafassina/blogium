import Emitter from '../node_modules/tiny-emitter/dist/tinyemitter.js';
import config from './config.js';

class Blogium extends Emitter {
  constructor(options) {
    super();
    this.settings = config.basicSettings(options);
    this.url = config.url(this.settings.username);
    this.getPosts();
    this.handleListener();
  }

  handleListener() {
    const moreBtn = document.querySelector(this.settings.moreBtn) || null;
    if (moreBtn) {
      moreBtn.addEventListener('click', this.morePosts.bind(this), false);
    }
  }

  getPosts() {
    fetch(this.url)

    .then(response => {
      if (response.status !== 200) {
        this.emit('blogium.error', response);
        return;
      }

      return response.json();
    })

    .then(postList => {
      this.emit('blogium.success', postList);

      if (this.settings.defaultTemplate) this.renderPosts(postList.items);

    });
  }

  setLinkTarget(scope = document) {
    const allLinks = Array.from(scope.querySelectorAll('a'));

    allLinks.forEach((element) => {
      if (element.href.includes(this.settings.host)) {
        element.target = '_self';
      } else {
        element.target = '_blank';
      }
    });
  }

  renderPosts(posts) {
    const wrapper = document.querySelector(this.settings.wrapper) || null;
    let cachedPosts = '',
        ul = document.createElement('ul');

    if (posts.length > this.settings.postLimit - 1) {
      this.otherPosts = posts.slice(this.postLimit-1);
      // this.settings.moreBtn.disabled = false;
    } else {
      this.otherPosts = undefined;
    }

    ul.classList.add('postList');

    posts.forEach((post, index) => {
      if (index < this.settings.postLimit) {
        cachedPosts += this.blogPostTemplate(post);
      }
    });

    ul.innerHTML = cachedPosts;
    this.setLinkTarget(ul);

    if (!wrapper) {
      console.error('we need a container');

    } else {
      wrapper.appendChild(ul);
    }
  }

  morePosts() {
    if(!this.otherPosts) return;
    this.moreBtn.disabled = true;

    this.renderPosts(this.otherPosts);
  }

  buildCategories(array) {
    const list = array.map( category  => {
      return `<li class="homePost-tagItem">${category}</li>`
    })

    const categories = list.join('')

    return (`<ul class="blogiumPost-categories">
        ${categories}
      </ul>`)
  }

  blogPostTemplate({ pubDate, link, title, categories }) {
    let postDate = new Date(pubDate).toDateString();

    return `<li class="blogiumPost">
        <a class="blogiumPost-link" href="${link}">
          <span class="blogiumPost-date">${postDate}</span>
          <h3 class="blogiumPost-title">${title}</h3>
        </a>
        ${this.settings.showCategories && this.buildCategories(categories)}
      </li>`;
  };
}

module.exports = Blogium;
