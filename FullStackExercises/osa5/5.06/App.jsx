
import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import BlogForm from './BlogForm';
import Togglable from './Togglable'; // Import Togglable
import Notification from './Notification';

function App() {
    const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([{ id: 2, title: 'blog 2', author: 'Author A' }, { id: 5, title: 'blog 5', author: 'Author B' }]); // Sample blogs

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (username, password) => {
    // Implement login logic
    const user = { name: 'Alison Wonderland', subscribedBlogs: [2, 5] };
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
    setUser(user);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  };

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


