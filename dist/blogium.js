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
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tinyemitter = __webpack_require__(2);
	
	var _tinyemitter2 = _interopRequireDefault(_tinyemitter);
	
	var _defaultOptions = __webpack_require__(3);
	
	var _defaultOptions2 = _interopRequireDefault(_defaultOptions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Blogium = function (_Emitter) {
	  _inherits(Blogium, _Emitter);
	
	  function Blogium(options) {
	    _classCallCheck(this, Blogium);
	
	    var _this = _possibleConstructorReturn(this, (Blogium.__proto__ || Object.getPrototypeOf(Blogium)).call(this));
	
	    _this.config(options);
	    _this.getPosts();
	
	    _this.moreBtn.addEventListener('click', _this.morePosts.bind(_this), false);
	    return _this;
	  }
	
	  _createClass(Blogium, [{
	    key: 'config',
	    value: function config(options) {
	      this.otherPosts = undefined;
	      this.host = options.host || _defaultOptions2.default.host;
	      this.targetBlank = options.targetBlank || _defaultOptions2.default.targetBlank;
	      this.url = 'http://rss2json.com/api.json?rss_url=https://medium.com/feed/' + (options.username || _defaultOptions2.default.username);
	      this.moreBtn = document.querySelector(options.moreBtn) || document.querySelector(_defaultOptions2.default.moreBtn);
	      this.wrapper = document.querySelector(options.wrapper) || document.querySelector(_defaultOptions2.default.wrapper);
	    }
	  }, {
	    key: 'getPosts',
	    value: function getPosts() {
	      var _this2 = this;
	
	      var getPosts = new Promise(function (resolve, reject) {
	        var posts = new XMLHttpRequest();
	
	        posts.open("GET", _this2.url, true);
	
	        posts.onreadystatechange = function () {
	          if (posts.readyState === 4 && posts.status === 200) {
	            resolve(JSON.parse(posts.response));
	          } else if (posts.status !== 200) {
	            reject(posts.response);
	          }
	        };
	
	        posts.send();
	      }).then(function (postList) {
	        _this2.emit('blogium.success', postList);
	        _this2.renderPosts(postList.items);
	      }).catch(function (response) {
	        _this2.emit('blogium.error', response);
	      });
	    }
	  }, {
	    key: 'setLinkTarget',
	    value: function setLinkTarget() {
	      var _this3 = this;
	
	      var scope = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
	
	      var allLinks = Array.from(scope.querySelectorAll('a'));
	
	      allLinks.forEach(function (element) {
	        element.href.includes(_this3.host) ? element.target = '_self' : element.target = '_blank';
	      });
	    }
	  }, {
	    key: 'renderPosts',
	    value: function renderPosts(posts) {
	      var _this4 = this;
	
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
	          cachedPosts += _this4.blogPostTemplate(post);
	        }
	      });
	
	      ul.innerHTML = cachedPosts;
	      this.setLinkTarget(ul);
	      this.wrapper.appendChild(ul);
	    }
	  }, {
	    key: 'morePosts',
	    value: function morePosts() {
	      if (!this.otherPosts) return;
	      this.moreBtn.disabled = true;
	
	      this.renderPosts(this.otherPosts);
	    }
	  }, {
	    key: 'blogPostTemplate',
	    value: function blogPostTemplate(post) {
	      var postDate = new Date(post.pubDate).toDateString();
	
	      return '<li class="blogiumPost">\n        <a class="blogiumPost-link" href="' + post.link + '">\n          <span class="blogiumPost-date">' + postDate + '</span>\n          <h3 class="blogiumPost-title">' + post.title + '</h3>\n        </a>\n        <section class="blogiumPost-description">\n          ' + post.description + '\n        </section>\n      </li>';
	    }
	  }]);
	
	  return Blogium;
	}(_tinyemitter2.default);
	
	exports.default = Blogium;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.TinyEmitter = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	function E () {
		// Keep this empty so it's easier to inherit from
	  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
	}
	
	E.prototype = {
		on: function (name, callback, ctx) {
	    var e = this.e || (this.e = {});
	
	    (e[name] || (e[name] = [])).push({
	      fn: callback,
	      ctx: ctx
	    });
	
	    return this;
	  },
	
	  once: function (name, callback, ctx) {
	    var self = this;
	    function listener () {
	      self.off(name, listener);
	      callback.apply(ctx, arguments);
	    };
	
	    listener._ = callback
	    return this.on(name, listener, ctx);
	  },
	
	  emit: function (name) {
	    var data = [].slice.call(arguments, 1);
	    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
	    var i = 0;
	    var len = evtArr.length;
	
	    for (i; i < len; i++) {
	      evtArr[i].fn.apply(evtArr[i].ctx, data);
	    }
	
	    return this;
	  },
	
	  off: function (name, callback) {
	    var e = this.e || (this.e = {});
	    var evts = e[name];
	    var liveEvents = [];
	
	    if (evts && callback) {
	      for (var i = 0, len = evts.length; i < len; i++) {
	        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
	          liveEvents.push(evts[i]);
	      }
	    }
	
	    // Remove event from queue to prevent memory leak
	    // Suggested by https://github.com/lazd
	    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910
	
	    (liveEvents.length)
	      ? e[name] = liveEvents
	      : delete e[name];
	
	    return this;
	  }
	};
	
	module.exports = E;
	
	},{}]},{},[1])(1)
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var defaults = {
	  // host: document.location.host,
	  username: '@Medium',
	  moreBtn: '#moreBtn', //id
	  wrapper: '.mediumWrap', //class
	  targetBlank: true
	};
	
	exports.default = defaults;

/***/ }
/******/ ]);
//# sourceMappingURL=blogium.js.map