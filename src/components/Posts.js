import React, { useState } from "react";
import { BASE_URL } from "../api";

const Posts = ({ token, setToken }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [willDeliver, setWillDeliver] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const description = event.target.description.value;
    const price = event.target.price.value;
    const willDeliver = event.target.willDeliver.value;
    if (title === "") {
      return alert("Please enter a title");
    }
    if (description.length < 8) {
      return alert("Description must be 8 characters or more");
    }

    console.log(title);

    setTitle("");
    setDescription("");
    setPrice("");
    setWillDeliver("");

    const createPost = async () => {
      try {
        const response = await fetch(`${BASE_URL}/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            post: {
              title: `${title}`,
              description: `${description}`,
              price: `${price}`,
              willDeliver: `${willDeliver}`,
            },
          }),
        });
        const result = await response.json();
        // You can log ▲▲▲ the result
        // here ▼▼▼ to view the json object before returning it
        console.log(result);
        return result;
      } catch (err) {
        console.error(err);
      }
    };

    createPost();
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleWillDeliverChange = (event) => {
    setWillDeliver(event.target.value);
  };

  return (
    <div>
      <h1>Posts</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={handleDescriptionChange}
        />
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="text"
          value={price}
          onChange={handlePriceChange}
        />
        <label htmlFor="willDeliver">Will Deliver</label>
        <input
          id="willDeliver"
          type="text"
          value={willDeliver}
          onChange={handleWillDeliverChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Posts;
