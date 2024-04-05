import React, { useState } from 'react';

function Blog({ blog, onUpdate }) {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible);
  };

  const likeBlog = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    onUpdate(updatedBlog);
    // Make PUT request to server here
  };

  return (
    <div>
      {blog.title} by {blog.author}
      <button onClick={toggleDetails}>{detailsVisible ? 'Hide' : 'View'}</button>
      {detailsVisible && (
        <div>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={likeBlog}>Like</button></p>
          <p>added by {blog.user.name}</p>
        </div>
      )}
    </div>
  );
}

export default Blog;
