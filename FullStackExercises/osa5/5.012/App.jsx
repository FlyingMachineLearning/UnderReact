import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([{ id: 2, title: 'blog 2' }, { id: 5, title: 'blog 5' }]); // Sample blogs

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      // Here, you could also set up your blog service to use the token from the logged-in user
    }
  }, []);

  const handleLogin = async (username, password) => {
    // Replace this with actual login logic
    const user = { name: 'Alison Wonderland', subscribedBlogs: [2, 5] };
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user)); // Save user to localStorage
    setUser(user);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  };

  return (
    <div>
      {!user ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          {blogs
            .filter(blog => user.subscribedBlogs.includes(blog.id))
            .map(blog => (
              <div key={blog.id}>{blog.title}</div>
            ))}
        </div>
      )}
    </div>
  );
}

export default App;

