function Blog({ blog, onUpdate, onDelete, user }) {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible);
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`);
    if (isConfirmed) {
      try {
        await fetch(`/api/blogs/${blog.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`, // Assuming your API requires an auth token
          },
        });
        onDelete(blog.id); // Notify the parent component to remove the blog from the state
      } catch (error) {
        console.error('Failed to delete the blog', error);
        // Optionally, set an error notification here
      }
    }
  };

  return (
    <div>
      {blog.title} by {blog.author}
      <button onClick={toggleDetails}>{detailsVisible ? 'Hide' : 'View'}</button>
      {detailsVisible && (
        <div>
          <p>{blog.url}</p>
          <p>likes {blog.likes}</p>
          {blog.user && user && blog.user.username === user.username && (
            <button onClick={handleDelete}>Delete</button>
          )}
        </div>
      )}
    </div>
  );
}
