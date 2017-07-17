const config = {

  basicSettings: (options = {}) => {

    const defaults = {
      host: document.location.host || '',
      username: '@Medium',
      moreBtn: '#moreBtn',
      wrapper: '.mediumWrap',
      targetBlank: true,
      defaultTemplate: true,
      postLimit: 5,
      customTemplate: false,
      showCategories: true
    }

    for (const prop in defaults) {
      options[prop] = options[prop] || defaults[prop];
    }

    return options;
  },

  url: username => {
    if (!username.startsWith('@')) username = `@${username}`;

  	return `//rss2json.com/api.json?rss_url=https%3A//medium.com/feed/${username}`;
  }
};

export default config;
