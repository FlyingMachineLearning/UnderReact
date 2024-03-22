import React, { useState, useEffect } from 'react';
import personsService from './services/persons';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
    const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);


    
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


    const personObject = { name: newName, number: newNumber };

    personsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      });
  };
const deletePerson = (id, name) => {
  const isConfirmed = window.confirm(`Delete ${name}?`);

  if (isConfirmed) {
    personsService.remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch(error => {
        alert(`The person '${name}' was already deleted from server`);
        setPersons(persons.filter(person => person.id !== id));
      });
  }
};
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

        <div>
  {personsToShow.map(person =>
    <div key={person.id}>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
    </div>
  )}
</div>
    </div>
  );
};

export default App;
