import React, { useState } from "react";
import { BASE_URL } from "../api";

const Update = ({ post, token }) => {
  const updatePost = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${post._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: {
            title: title,
            description: description,
            price: price,
            willDeliver: willDeliver,
          },
        }),
      });
      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [price, setPrice] = useState(post.price);
  const [willDeliver, setWillDeliver] = useState(post.willDeliver);

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          updatePost();
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <input
          type="text"
          placeholder="Will Deliver"
          value={willDeliver}
          onChange={(event) => setWillDeliver(event.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Update;
