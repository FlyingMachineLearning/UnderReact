const express = require('express');
const app = express();

// Use express.json() middleware to parse JSON request bodies
app.use(express.json());

// Existing hardcoded array of telephone number information
let persons = [
    { id: 1, name: 'Alice', number: '123-456-7890' },
    { id: 2, name: 'Bob', number: '098-765-4321' },
    // More entries as needed...
];

// Function to generate a unique ID
const generateId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0;
    return Math.floor(Math.random() * 1000000) + maxId + 1;
};

// POST route to add new phone information
app.post('/api/persons', (req, res) => {
    const body = req.body;

    // Simple validation to check if name and number are provided
    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'name or number is missing' });
    }

    // Check if the name already exists
    const nameExists = persons.some(p => p.name === body.name);
    if (nameExists) {
        return res.status(400).json({ error: 'name must be unique' });
    }

    // Create a new person object
    const person = {
        id: generateId(), // Generate a unique ID
        name: body.name,
        number: body.number,
    };

    // Add the new person to the array
    persons = persons.concat(person);

    // Respond with the newly created person object
    res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
