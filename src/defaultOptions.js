function Defaults() {
  this.host = document.location.host || '';
  this.username = '@Medium';
  this.moreBtn = '#moreBtn';
  this.wrapper = '.mediumWrap';
  this.targetBlank = true;
  this.defaultTemplate = true;
  this.postLimit = 5;

  this.url = function(username = this.username) {
  	return `http://rss2json.com/api.json?rss_url=https%3A//medium.com/feed/${username}`;
  };
};

const defaults = new Defaults();

export default defaults;