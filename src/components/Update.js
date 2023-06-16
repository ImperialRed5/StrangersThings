// import React, { useState } from "react";
// import { BASE_URL } from "../api";

// const Update = ({ post, token }) => {
//   const updatePost = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/posts/${post._id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           post: {
//             title: `${title}`,
//             description: `${description}`,
//             price: `${price}`,
//             willDeliver: `${willDeliver}`,
//           },
//         }),
//       });
//       const result = await response.json();
//       console.log(result);
//       return result;
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   return (
//     <div>
//       <button onClick={updatePost}>Update</button>
//     </div>
//   );
// };

// export default Update;
