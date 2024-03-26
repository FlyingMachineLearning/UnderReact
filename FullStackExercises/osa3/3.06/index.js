app.post('/api/persons', (req, res) => {
    const body = req.body;

    // Check if name and number are provided
    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'name or number is missing' });
    }

    // Check if the name already exists in the phonebook
    const nameExists = persons.some(person => person.name === body.name);
    if (nameExists) {
        return res.status(400).json({ error: 'name must be unique' });
    }

    // If validation passes, create a new person object
    const person = {
        id: generateId(), // Assume generateId is a function you've already implemented
        name: body.name,
        number: body.number,
    };

    // Add the new person to the array
    persons = persons.concat(person);

    // Respond with the newly created person object
    res.json(person);
});
