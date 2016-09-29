import Emitter from '../node_modules/tiny-emitter/dist/tinyemitter.js';
import defaults from './defaultOptions.js';

export default class Blogium extends Emitter {
  constructor(options) {
    super();

    this.config(options);
    this.getPosts();

    this.moreBtn.addEventListener('click', this.morePosts.bind(this), false);
  }

  config(options) {
    this.otherPosts = undefined;
    this.host = options.host || defaults.host;
    this.targetBlank = options.targetBlank || defaults.targetBlank;
    this.url = `http://rss2json.com/api.json?rss_url=https://medium.com/feed/${options.username || defaults.username}`;
    this.moreBtn = document.querySelector(options.moreBtn) || document.querySelector(defaults.moreBtn);
    this.wrapper = document.querySelector(options.wrapper) || document.querySelector(defaults.wrapper);
  }

  getPosts() {
    let getPosts = new Promise((resolve, reject) => {
      let posts = new XMLHttpRequest();

      posts.open("GET", this.url, true);

      posts.onreadystatechange = function () {
        if (posts.readyState === 4 && posts.status === 200) {
          resolve(JSON.parse(posts.response));
        } else if(posts.status !== 200) {
          reject(posts.response)
        }
      };

      posts.send();
    })
    .then((postList)=> {
      this.emit('blogium.success', postList);
      this.renderPosts(postList.items)
    })
    .catch((response) => {
      this.emit('blogium.error', response);
    });
  }

  setLinkTarget(scope = document) {
    const allLinks = Array.from(scope.querySelectorAll('a'));

    allLinks.forEach((element) => {
      element.href.includes(this.host) ? element.target = '_self' : element.target = '_blank';
    });

  }

  renderPosts(posts) {
    let cachedPosts = '',
        ul = document.createElement('ul'),
        mediumWrap = document.querySelector('.mediumWrap');

    if (posts.length > 5) {
      this.otherPosts = posts.slice(4);
      this.moreBtn.disabled = false;
    } else {
      this.otherPosts = undefined;
    }

    ul.classList.add('postList');

    posts.forEach((post, index) => {
      if (index < 4) {
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
