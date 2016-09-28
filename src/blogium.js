import * as defaults from './defaultOptions.js';

export default class Blogium {
  constructor(options) {

    this.config(options = defaults);
    this.getPosts();

    this.moreBtn.addEventListener('click', this.morePosts, false);
  }

  config(options, defaults) {
    this.host = document.location.host;
    this.moreBtn = document.querySelector('#moreBtn');

    // this.template = options.template || defaults.template;
    // this.url = urlBuilder(options.username);
  }

  getPosts() {
    let getPosts = new Promise((resolve, reject) => {
      let posts = new XMLHttpRequest();
      const url = "http://rss2json.com/api.json?rss_url=https://medium.com/feed/@atilafassina"
      // const url = this.url;

      posts.open("GET", url, true);

      posts.onreadystatechange = function () {
        if (posts.readyState === 4 && posts.status === 200) {
          resolve(JSON.parse(posts.response));
        } else if(posts.status !== 200) {
          reject(posts.response)
        }
      };

      posts.send();
    })
    .then((postList)=> { this.renderPosts(postList.items)})
    .catch((response) => {
      // fire error event with response parameter
      console.error(response);
    });
  }

  setLinkTarget() {
    const allLinks = Array.from(document.querySelectorAll('a'));

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
    mediumWrap.appendChild(ul);

    this.setLinkTarget();
  }

  morePosts() {
    if(!otherPosts) return;
    moreBtn.disabled = true;

    this.renderPosts(otherPosts);
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

// for the demo
// let foo = new Blogium()
