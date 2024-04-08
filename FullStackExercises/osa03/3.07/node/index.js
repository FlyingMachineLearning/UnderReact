const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(morgan('tiny')); // Morgan middleware for logging

let persons = [
    { id: 1, name: 'Alice', number: '123-456-7890' },
    { id: 2, name: 'Bob', number: '098-765-4321' },
    // Add more entries as needed...
];

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const personIndex = persons.findIndex(p => p.id === id);

    if (personIndex !== -1) {
        persons = persons.filter(p => p.id !== id);
        res.status(204).end();
    } else {
        res.status(404).end();
    }
});

// Middleware for handling 404 Not Found errors
app.use((req, res, next) => {
    res.status(404).send('404 Not Found: The requested resource was not found on this server.');
});

// Middleware for handling other types of errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('500 Internal Server Error: Something broke!');
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

