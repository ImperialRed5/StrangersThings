import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { fetchPosts } from "./api/index";

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetchPosts();
      setPosts(response.data.posts);
    };
    fetchResults();
  }, []);

  return (
    <div>
      <h1>Stranger's Things</h1>
      <h2>Posts</h2>
      {posts &&
        posts.map((post) => {
          return (
            <div key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </div>
          );
        })}
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
