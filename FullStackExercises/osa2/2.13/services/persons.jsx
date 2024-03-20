// services/persons.js
import axios from 'axios';

const baseUrl = 'http://localhost:3000/persons'; // Adjust this to your server's address

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = newObject => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => response.data);
};

// Export functions for use in other parts of the application
export default { getAll, create };
