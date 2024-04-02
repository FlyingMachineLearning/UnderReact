import React from 'react';

function Notification({ message, type }) {
  if (message === null) {
    return null;
  }

  const notificationStyle = {
    color: type === 'success' ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    borderWidth: '2px',
    borderColor: type === 'success' ? 'green' : 'red',
  };

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  );
}

export default Notification;
