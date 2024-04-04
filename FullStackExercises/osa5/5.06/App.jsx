
import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import BlogForm from './BlogForm';
import Togglable from './Togglable'; // Import Togglable
import Notification from './Notification';

function App() {
  // State and other component logic...

  const createBlog = (blogData) => {
    // Add blog to state and optionally send to backend
    setBlogs([...blogs, { ...blogData, id: blogs.length + 1 }]); // Example logic to add the blog
  
    // Optionally set notification for successful blog creation
  };

  
  return (
    <div>
      <Notification message={notification?.message} type={notification?.type} />
      {!user ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          
          <Togglable buttonLabel='create new blog'>
            <BlogForm onCreate={createBlog} />
          </Togglable>
          
          {/* Display blogs */}
        </div>
      )}
    </div>
  );
}

export default App;
