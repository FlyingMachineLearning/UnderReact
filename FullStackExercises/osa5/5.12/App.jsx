
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
  // Check for logged in user in localStorage
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    setUser(user);
    // Optionally, set up the token for your blog service here if you use one
  }

  // Fetch initial blog data
  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      if (!response.ok) {
        throw new Error('Blog data fetch failed');
      }
      const initialBlogs = await response.json();
      setBlogs(sortBlogs(initialBlogs)); // Assuming sortBlogs is a function that sorts blogs by likes
    } catch (error) {
      console.error(error);
      setNotification({ message: 'Failed to load blogs', type: 'error' });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  fetchBlogs();
}, []);


const handleLogin = async (username, password) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const user = await response.json();
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user)); // Save the user info in localStorage
    setUser(user); // Update state to reflect the user is logged in
    setNotification({ message: 'Login successful', type: 'success' });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  } catch (error) {
    console.error(error);
    setNotification({ message: 'Wrong username or password', type: 'error' });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }
};


const handleLogout = () => {
  window.localStorage.removeItem('loggedBlogAppUser'); // Remove the user info from localStorage
  setUser(null); // Reset the user state to reflect that no user is logged in
  setNotification({ message: 'Successfully logged out', type: 'success' });
  setTimeout(() => {
    setNotification(null);
  }, 5000);
};


const addBlog = async (blogData) => {
  try {
    const response = await fetch('/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization header may be required if your API is protected
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(blogData),
    });

    if (!response.ok) {
      throw new Error('Failed to add new blog');
    }

    const newBlog = await response.json();
    setBlogs(blogs.concat(newBlog)); // Update the local state to include the new blog
    setNotification({ message: `A new blog '${newBlog.title}' by ${newBlog.author} added!`, type: 'success' });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  } catch (error) {
    console.error(error);
    setNotification({ message: 'Failed to add new blog', type: 'error' });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }
};


const updateBlog = async (updatedBlog) => {
  try {
    const response = await fetch(`/api/blogs/${updatedBlog.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Authorization header may be required if your API is protected
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(updatedBlog),
    });

    if (!response.ok) {
      throw new Error('Failed to update blog');
    }

    const returnedBlog = await response.json();
    setBlogs(blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog)); // Update the blog in the local state
    setNotification({ message: `Blog '${returnedBlog.title}' updated!`, type: 'success' });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  } catch (error) {
    console.error(error);
    setNotification({ message: 'Failed to update blog', type: 'error' });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }
};

const deleteBlog = (id) => {
  setBlogs(blogs.filter(blog => blog.id !== id)); // Remove the blog from the state
  setNotification({ message: 'Blog successfully deleted', type: 'success' });
  setTimeout(() => {
    setNotification(null);
  }, 5000);
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
