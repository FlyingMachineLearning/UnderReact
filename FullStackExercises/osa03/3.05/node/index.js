const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Example data array
let persons = [
    { id: 1, name: 'Alice', number: '123-456-7890' },
    { id: 2, name: 'Bob', number: '098-765-4321' }
];

// Function to generate a unique ID
const generateUniqueId = () => {
    let id;
    do {
        id = Math.floor(Math.random() * 1000000); // Generate a large random number
    } while (persons.some(person => person.id === id)); // Check if the ID already exists and repeat if it does
    return id;
};

// POST route to add a new entry
app.post('/api/persons', (req, res) => {
    const { name, number } = req.body;

    // Check if the name or number is missing
    if (!name || !number) {
        return res.status(400).json({ error: 'The name or number is missing' });
    }

    // Check if the name already exists
    if (persons.some(person => person.name === name)) {
        return res.status(400).json({ error: 'The name already exists in the phonebook' });
    }

    // Create a new person object with a unique ID
    const newPerson = {
        id: generateUniqueId(),
        name,
        number
    };

    // Add the new person to the array
    persons = [...persons, newPerson];

    // Return the newly added person
    res.json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
