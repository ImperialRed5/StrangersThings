import React, { useState } from "react";
import ReactDOM from "react-dom";

import { fetchPosts } from "./api/index";

const App = () => {
  const [posts, setPosts] = useState("");
  const fetchResults = fetchPosts();
  // console.log(fetchResults);
  // fetchPosts();
  return <div></div>;

  fetchPosts();
};

// fetchPosts();
ReactDOM.render(<App />, document.getElementById("app"));
