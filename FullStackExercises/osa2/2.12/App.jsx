import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch the initial state from the server
    axios
      .get('http://localhost:3000/persons')
      .then(response => {
        setPersons(response.data);
      });
  }, []); // The empty array as the second argument ensures this effect runs only once after the initial render

  // Event handlers remain the same

    const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

const addPerson = (event) => {
  event.preventDefault();
  if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
    window.alert(`${newName} is already added to phonebook`);
    return;
  }

  const personObject = {
    name: newName,
    number: newNumber,
    // If your server automatically generates IDs, you can omit the id field
    // id: persons.length + 1 
  };

  axios
    .post('http://localhost:3000/persons', personObject)
    .then(response => {
      setPersons(persons.concat(response.data)); // Update the state with the new person returned from the server
      setNewName('');
      setNewNumber('');
    })
    .catch(error => {
      console.error('Error adding the person:', error);
      // Handle the error appropriately in your application
    });
};
  
  const personsToShow = searchTerm
    ? persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : persons;

  return (
    <div>
      {/* The rest of your component */}
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
