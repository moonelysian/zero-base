(function () {
  "use strict";

  const get = (target) => {
    return document.querySelector(target);
  };

  const $posts = get(".posts");

  const getPosts = async () => {
    const API_URL = "https://jsonplaceholder.typicode.com/posts";
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("error!!");
    }
    return await response.json();
  };

  const showPosts = (posts) => {
    posts.forEach((post) => {
      const $post = document.createElement("div");
      $post.classList.add("post");
      $post.innerHTML = `
      <div class="header">
        <div class="id">${post.id}</div>
        <div class="title">${post.title}</div>
      </div>
      <div class="body">
        ${post.body}
      </div>
      `;
      $posts.appendChild($post);
    });
  };

  const loadPosts = async () => {
    const posts = await getPosts();
    showPosts(posts);
  };

  window.addEventListener("DOMContentLoaded", () => {
    loadPosts();
  });
})();
