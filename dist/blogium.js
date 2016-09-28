/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _defaultOptions = __webpack_require__(2);
	
	var defaults = _interopRequireWildcard(_defaultOptions);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Blogium = function () {
	  function Blogium(options) {
	    _classCallCheck(this, Blogium);
	
	    this.config(options = defaults);
	    this.getPosts();
	
	    this.moreBtn.addEventListener('click', this.morePosts, false);
	  }
	
	  _createClass(Blogium, [{
	    key: 'config',
	    value: function config(options, defaults) {
	      this.host = document.location.host;
	      this.moreBtn = document.querySelector('#moreBtn');
	
	      // this.template = options.template || defaults.template;
	      // this.url = urlBuilder(options.username);
	    }
	  }, {
	    key: 'getPosts',
	    value: function getPosts() {
	      var _this = this;
	
	      var getPosts = new Promise(function (resolve, reject) {
	        var posts = new XMLHttpRequest();
	        var url = "http://rss2json.com/api.json?rss_url=https://medium.com/feed/@atilafassina";
	        // const url = this.url;
	
	        posts.open("GET", url, true);
	
	        posts.onreadystatechange = function () {
	          if (posts.readyState === 4 && posts.status === 200) {
	            resolve(JSON.parse(posts.response));
	          } else if (posts.status !== 200) {
	            reject(posts.response);
	          }
	        };
	
	        posts.send();
	      }).then(function (postList) {
	        _this.renderPosts(postList.items);
	      }).catch(function (response) {
	        // fire error event with response parameter
	        console.error(response);
	      });
	    }
	  }, {
	    key: 'setLinkTarget',
	    value: function setLinkTarget() {
	      var _this2 = this;
	
	      var allLinks = Array.from(document.querySelectorAll('a'));
	
	      allLinks.forEach(function (element) {
	        element.href.includes(_this2.host) ? element.target = '_self' : element.target = '_blank';
	      });
	    }
	  }, {
	    key: 'renderPosts',
	    value: function renderPosts(posts) {
	      var _this3 = this;
	
	      var cachedPosts = '',
	          ul = document.createElement('ul'),
	          mediumWrap = document.querySelector('.mediumWrap');
	
	      if (posts.length > 5) {
	        this.otherPosts = posts.slice(4);
	        this.moreBtn.disabled = false;
	      } else {
	        this.otherPosts = undefined;
	      }
	
	      ul.classList.add('postList');
	
	      posts.forEach(function (post, index) {
	        if (index < 4) {
	          cachedPosts += _this3.blogPostTemplate(post);
	        }
	      });
	
	      ul.innerHTML = cachedPosts;
	      mediumWrap.appendChild(ul);
	
	      this.setLinkTarget();
	    }
	  }, {
	    key: 'morePosts',
	    value: function morePosts() {
	      if (!otherPosts) return;
	      moreBtn.disabled = true;
	
	      this.renderPosts(otherPosts);
	    }
	  }, {
	    key: 'blogPostTemplate',
	    value: function blogPostTemplate(post) {
	      var postDate = new Date(post.pubDate).toDateString();
	
	      return '<li class="blogiumPost">\n        <a class="blogiumPost-link" href="' + post.link + '">\n          <span class="blogiumPost-date">' + postDate + '</span>\n          <h3 class="blogiumPost-title">' + post.title + '</h3>\n        </a>\n        <section class="blogiumPost-description">\n          ' + post.description + '\n        </section>\n      </li>';
	    }
	  }]);
	
	  return Blogium;
	}();
	
	// for the demo
	
	
	var foo = new Blogium();

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	// configuration
	// template for list
	// url for medium service
	// medium user
	// class destination of output
	// post link target
	// post link class
	// infinite scroll
	
	// const template = `<li class="blogiumPost">
	//    <a class="blogiumPost-link" href="${post.link}">
	//      <span class="blogiumPost-date">${postDate}</span>
	//      <h3 class="blogiumPost-title">${post.title}</h3>
	//    </a>
	//    <section class="blogiumPost-description">
	//      ${post.description}
	//    </section>
	//  </li>`;
	
	var url = "http://rss2json.com/api.json?rss_url=https://medium.com/feed/@atilafassina";

/***/ }
/******/ ]);
//# sourceMappingURL=blogium.js.map