import React, { useState } from 'react';
import LoginForm from './LoginForm';

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([{ id: 2, title: 'blog 2' }, { id: 5, title: 'blog 5' }]); // Sample blogs

  const handleLogin = async (username, password) => {
    // Here, you would typically send a request to your backend API to authenticate the user
    // For the sake of this example, let's pretend the login was successful and set a mock user
    setUser({ name: 'Alison Wonderland', subscribedBlogs: [2, 5] });
  };

  return (
    <div>
      {!user ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div>
          <p>{user.name} logged in</p>
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

