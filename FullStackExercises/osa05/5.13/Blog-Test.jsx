function Blog({ blog }) {
  const [detailsVisible, setDetailsVisible] = useState(false);

  return (
    <div className="blog">
      <div className="basic-info">
        {blog.title} by {blog.author}
        <button onClick={() => setDetailsVisible(!detailsVisible)}>
          {detailsVisible ? 'Hide' : 'View'}
        </button>
      </div>
      {detailsVisible && (
        <div className="detailed-info">
          <p className="url">{blog.url}</p>
          <p className="likes">likes {blog.likes}</p>
        </div>
      )}
    </div>
  );
}
