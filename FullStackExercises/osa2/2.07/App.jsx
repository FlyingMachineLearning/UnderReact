import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

const addPerson = (event) => {
  event.preventDefault();

  // Check if the name already exists in the persons array
  if (persons.some(person => person.name === newName)) {
    // If the name exists, show an alert and return early from the function
    window.alert(`${newName} is already added to phonebook`);
    return;
  }

  const personObject = {
    name: newName
  };

  // Add the new person to the persons array and reset the newName state
  setPersons(persons.concat(personObject));
  setNewName('');
};

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <div key={person.name}>{person.name}</div>)}
      </div>
    </div>
  );
};

export default App;
