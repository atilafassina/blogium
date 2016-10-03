![blogium-logo](https://github.com/atilafassina/blogium/blob/master/blogium.png?raw=true)
[![Build Status](https://img.shields.io/travis/atilafassina/blogium/master.svg?style=flat)](https://travis-ci.org/atilafassina/blogium)

## Install

- as a script inclusion

```html
<script src="./dist/blogium.js"></script>
```

- as an npm package
```
npm i --save blogium
```

- as a bower package
```
bower i --save blogium
```

Alternatively, you can always download a [.zip file](https://github.com/atilafassina/blogium/archive/master.zip)

---

## Get started

After including the script anyway suited you best, just instantiate `Blogium` with the desired set of options

```js
const blog = new Blogium(options);
```

## Basic Usage

**Blogium** fires `success` and `error` event for the post request, you can listen to them:

```js
blog.on('blogium.success', response => { console.info('I have posts!', response) });
blog.on('blogium.error',   response => { console.error('Oops, something has gone wrong', response) });
```

## Options

### host (string)
You can pass a string to what will be considered by **Blogium** your root host.

**Default**: `document.location.host`
    
### targetBlank (boolean)
If you want to set all outbound links (not directed to your host) as `_blank`.

**Default**: `true`

### username (string)
The [Medium](https://medium.com/) handler to fetch the RSS Feed from.

**Default**: **@Medium**

### moreBtn (string)
`id` to the more vouchers button.

**Default**: `#moreBtn`

### Wrapper (class)
`class` to the element(s) posts will be appended in.

**Default**: `.mediumWrap`

### defaultTemplate (boolean)
Weather to use the default template to list the posts or handle the data by yourself

**Default**: `true`

### postLimit (number)
Number of posts to be listed on each view. (infinite scroll is always on, posts are all cached on first request)

**Default**: `5`

---

[MIT License - Atila Fassina](https://atilafassina.mit-license.org/)
