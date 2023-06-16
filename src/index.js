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
        // You can log ▲▲▲ the result
        // here ▼▼▼ to view the json object before returning it
        console.log(result);
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
      <div>
        <h1>Stranger's Things</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/logout">Logout</Link>
        </nav>

        <Switch>
          <Route exact path="/">
            <h1>Home</h1>
            {token ? (
              <h2>Welcome to Stranger's Things! You are logged in!</h2>
            ) : (
              <h2>Welcome to Stranger's Things! Please log in!</h2>
            )}

            <h3>Buy and Sell Things with Strangers!</h3>
            <p>
              This is a place where you can post things you want to sell, or
              things you want to buy from strangers!
            </p>
            <p>
              To get started, click on the "Register" link above to create an
              account, or click on the "Login" link if you already have an
              account.
            </p>
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
                      <Delete token={token} post={post} />
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
        </Switch>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
