import React, { useState } from "react";
import { BASE_URL } from "../api";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;
    if (username === "") {
      return alert("Please enter a Username");
    }
    if (password.length < 8) {
      return alert("Password must be 8 characters or more");
    }

    console.log(username);

    setUsername("");
    setPassword("");

    const loginUser = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              username: `${username}`,
              password: `${password}`,
            },
          }),
        });
        const result = await response.json();
        // You can log ▲▲▲ the result
        // here ▼▼▼ to view the json object before returning it
        console.log(result);
        setToken(result.data.token);
        localStorage.setItem("token", result.data.token);
        return result.data.token;
      } catch (err) {
        console.error(err);
      }
    };

    loginUser();
  };
  const handleNameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePassChange = (event) => {
    setPassword(event.target.value);
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleNameChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePassChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
