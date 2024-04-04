import React, { useState } from 'react';

function BlogForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreate({ title, author, url });

    // Reset form fields after submission
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            name="Title"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            name="Author"
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            name="URL"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}

export default BlogForm;
