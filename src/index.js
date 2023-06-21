import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Posts from "./components/Posts";
import { BASE_URL } from "./api";
import { fetchPosts } from "./api/index";
import Delete from "./components/Delete";
import Update from "./components/Update";
import Search from "./components/Search";

const App = () => {
  const [token, setToken] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();

        setPosts(result.data.posts);
        setLoading(false);
        return result.data.posts;
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <div></div>
        <Link to="/login">Login</Link>
        <div></div>
        <Link to="/register">Register</Link>
        <div></div>
        <Link to="/logout">Logout</Link>
        <div></div>
        <Link to="/search">Search</Link>
        <div></div>
      </nav>
      <Switch>
        <Route exact path="/">
          <h1>Home</h1>
          <Posts
            posts={posts}
            setPosts={setPosts}
            token={token}
            setToken={setToken}
          />
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            posts.map((post) => {
              return (
                <div key={post._id}>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <p>{post.price}</p>
                  <p>{post.willDeliver}</p>
                  <p>{post.author.username}</p>
                  {post.isAuthor ? (
                    <Delete token={token} post={post} /> && (
                      <Update token={token} post={post} />
                    )
                  ) : (
                    <button>Message</button>
                  )}
                </div>
              );
            })
          )}
        </Route>
        <Route path="/login">
          <Login setToken={setToken} />
        </Route>
        <Route path="/register">
          <Register setToken={setToken} />
        </Route>
        <Route path="/logout">
          <Logout setToken={setToken} />
        </Route>
        <Route path="/posts">
          <Posts posts={posts} loading={loading} />

          {posts.map((post) => {
            return (
              <div key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <p>{post.price}</p>
                <p>{post.willDeliver}</p>
                <p>{post.author.username}</p>
                {post.isAuthor ? (
                  <Delete token={token} post={post} /> && (
                    <Update token={token} post={post} />
                  )
                ) : (
                  <button>Message</button>
                )}
              </div>
            );
          })}
        </Route>
        <Route path="/search">
          <Search setPosts={setPosts} token={token} />

          {posts.map((post) => {
            return (
              <div key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <p>{post.price}</p>
                <p>{post.willDeliver}</p>
                <p>{post.author.username}</p>
                {post.isAuthor ? (
                  <Delete token={token} post={post} /> && (
                    <Update token={token} post={post} />
                  )
                ) : (
                  <button>Message</button>
                )}
              </div>
            );
          })}
        </Route>
        <Route path="/update">
          <Update token={token} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
