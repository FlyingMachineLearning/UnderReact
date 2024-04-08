const express = require('express');
const app = express();

// Use express.json() middleware to parse JSON bodies
app.use(express.json());

// Existing hardcoded array of telephone number information
let persons = [
    { id: 1, name: 'Alice', number: '123-456-7890' },
    { id: 2, name: 'Bob', number: '098-765-4321' },
    // Add more entries as needed...
];

// DELETE route to remove phone number data by ID
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id); // Convert the id from string to number
    const personIndex = persons.findIndex(p => p.id === id); // Find the index of the person by id

    if (personIndex !== -1) {
        persons = persons.filter(p => p.id !== id); // Remove the person from the array
        res.status(204).end(); // Respond with a 204 No Content status code to indicate successful deletion
    } else {
        res.status(404).end(); // If not found, respond with a 404 Not Found status code
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
