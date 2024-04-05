
import React, { useState, useEffect } from 'react';
import Blog from './Blog';
import BlogForm from './BlogForm';
import LoginForm from './LoginForm';
import Notification from './Notification';
import Togglable from './Togglable';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Initialization code here. For example, fetching initial blog data.
    // Checking localStorage for user data could also be done here.
  }, []);

  const handleLogin = async (username, password) => {
    // Login logic here
  };

  const handleLogout = () => {
    // Logout logic here
  };

  const addBlog = (blogData) => {
    // Add blog logic here
  };

  const updateBlog = (updatedBlog) => {
    // Update blog logic here
  };

  return (
    <div>
      <Notification message={notification?.message} type={notification?.type} />
      {!user ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
          <Togglable buttonLabel="New Blog">
            <BlogForm onCreate={addBlog} />
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} onUpdate={updateBlog} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
