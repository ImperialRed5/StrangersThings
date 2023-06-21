import React from "react";
import { BASE_URL } from "../api";

const Delete = ({ post, token }) => {
  const deletePost = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${post._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <button onClick={deletePost}>Delete</button>
    </div>
  );
};

export default Delete;
