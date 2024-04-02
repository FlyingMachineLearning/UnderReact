
import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import BlogForm from './BlogForm';
import Notification from './Notification'; // Import the Notification component

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([...]); // your initial blogs
  const [notification, setNotification] = useState(null); // For notification messages

  // Other component logic...

  const createBlog = (newBlog) => {
    // Try to add a new blog
    try {
      newBlog.id = ...; // Assign a new ID
      setBlogs(blogs.concat(newBlog));
      setNotification({ message: `A new blog '${newBlog.title}' by ${newBlog.author} added!`, type: 'success' });
      setTimeout(() => {
        setNotification(null);
      }, 5000); // Clear notification after 5 seconds
    } catch (exception) {
      setNotification({ message: 'Failed to add blog', type: 'error' });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  // Include handleLogin and handleLogout functions

  return (
    <div>
      <Notification message={notification?.message} type={notification?.type} />
      {/* The rest of your component */}
    </div>
  );
}

export default App;
