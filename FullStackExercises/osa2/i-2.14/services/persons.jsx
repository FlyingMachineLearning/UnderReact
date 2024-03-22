


// services/persons.js
import axios from 'axios';

const baseUrl = 'http://localhost:3000/persons'; // Adjust this to your server's address

// Existing functions (getAll, create) remain unchanged

const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data);
};

// Update the export to include the new remove function
export default { getAll, create, remove };
