const express = require('express');
const app = express();

// Existing hardcoded array of telephone number information
const persons = [
    { id: 1, name: 'Alice', number: '123-456-7890' },
    { id: 2, name: 'Bob', number: '098-765-4321' },
    // Add more entries as needed...
];

// Route to get individual phone number information by ID
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id); // Convert the id from string to number
    const person = persons.find(p => p.id === id); // Find the person by id

    if (person) {
        res.json(person); // If found, return the person's information
    } else {
        res.status(404).end(); // If not found, respond with a 404 status code
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
