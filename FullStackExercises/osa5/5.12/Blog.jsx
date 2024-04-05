
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
Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.shape({
      username: PropTypes.string,
      name: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired, // Consider defining a more specific shape if you have a consistent user object structure
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
