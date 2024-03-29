import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import BlogForm from './BlogForm'; // Import the new BlogForm component

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

  const createBlog = (newBlog) => {
    newBlog.id = Math.max(...blogs.map(b => b.id)) + 1; // Assign a new ID; for production use a more robust method
    setBlogs(blogs.concat(newBlog));
    // In a real app, here you would also make an API call to save the blog on your server
  };

  return (
    <div>
      {!user ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <BlogForm onCreate={createBlog} />
          {blogs.map(blog => (
            <div key={blog.id}>{blog.title} by {blog.author}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
