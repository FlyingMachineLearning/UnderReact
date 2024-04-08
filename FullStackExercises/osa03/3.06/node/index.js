app.post('/api/persons', (req, res) => {
    const { name, number } = req.body;

    // Error handling: Check if the name or number is missing
    if (!name || !number) {
        return res.status(400).json({ error: 'name or number is missing' });
    }

    // Error handling: Check if the name already exists
    if (persons.some(person => person.name === name)) {
        return res.status(400).json({ error: 'name must be unique' });
    }

    // If validations pass, create a new person object with a unique ID
    const newPerson = {
        id: generateUniqueId(), // Assuming generateUniqueId is a function you've defined to generate a unique ID
        name,
        number
    };

    // Add the new person to the persons array
    persons = [...persons, newPerson];

    // Respond with the newly created person object
    res.json(newPerson);
});
