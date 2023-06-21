import React, { useState } from "react";
import { BASE_URL } from "../api";

const Search = ({ setPosts, token }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/posts?title=${searchTerm}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      setSearchResults(result.data.posts);
      setPosts(result.data.posts);
      setLoading(false);
      return result.data.posts;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {searchResults.map((post) => {
            return (
              <div key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <p>{post.price}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
