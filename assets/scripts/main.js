  (function() {
    'use strict';

    const mediumWrap = document.querySelector('.mediumWrap');

    let blog = new Blogium({
        username: '@medium'
      });

      blog.on('blogium.success', response => { console.info(response) });
      blog.on('blogium.error',   response => { console.error(response) });

    function newInstance() {
      let newUser = document.querySelector('#usernameRequest').value;
      mediumWrap.innerHTML = '';

      let blog = new Blogium({
        username: newUser
      });

      blog.on('blogium.success', response => { console.info(response) });
      blog.on('blogium.error',   response => { console.error(response) });

      }

    let fireBtn = document.querySelector('#fireBtn');
    fireBtn.addEventListener('click', newInstance, false);

}())
