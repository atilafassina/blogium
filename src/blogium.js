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
    let getPosts = new Promise((resolve, reject) => {
      let posts = new XMLHttpRequest();

      posts.open("GET", this.url, true);

      posts.onreadystatechange = function () {
        if (posts.readyState === 4 && posts.status === 200) {
          resolve(JSON.parse(posts.response));
        } else if(posts.status !== 200) {
          reject(posts.response);
        }
      };
      posts.send();
    })
    .then((postList)=> {
      this.emit('blogium.success', postList);
      if (this.defaultTemplate) this.renderPosts(postList.items);
    })
    .catch((response) => {
      this.emit('blogium.error', response);
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
    let cachedPosts = '',
        ul = document.createElement('ul');

    if (posts.length > this.postLimit - 1) {
      this.otherPosts = posts.slice(this.postLimit-1);
      this.settings.moreBtn.disabled = false;
    } else {
      this.otherPosts = undefined;
    }

    ul.classList.add('postList');

    posts.forEach((post, index) => {
      if (index < this.postLimit) {
        cachedPosts += this.blogPostTemplate(post);
      }

    });

    ul.innerHTML = cachedPosts;
    this.setLinkTarget(ul);
    this.wrapper.appendChild(ul);
  }

  morePosts() {
    if(!this.otherPosts) return;
    this.moreBtn.disabled = true;

    this.renderPosts(this.otherPosts);
  }

  blogPostTemplate(post) {
    let postDate = new Date(post.pubDate).toDateString();

    return `<li class="blogiumPost">
        <a class="blogiumPost-link" href="${post.link}">
          <span class="blogiumPost-date">${postDate}</span>
          <h3 class="blogiumPost-title">${post.title}</h3>
        </a>
        <section class="blogiumPost-description">
          ${post.description}
        </section>
      </li>`;
  };
}

module.exports = Blogium;
