// Your existing hardcoded array of telephone number information
const persons = [
    { id: 1, name: 'Alice', number: '123-456-7890' },
    { id: 2, name: 'Bob', number: '098-765-4321' },
    // More entries as needed...
];

// New route for /info
app.get('/info', (req, res) => {
    const numOfPeople = persons.length; // Number of people in the phone book
    const timeStamp = new Date(); // Current time stamp

    // Constructing the response content
    const responseContent = `
        <p>Phonebook has info for ${numOfPeople} people</p>
        <p>${timeStamp}</p>
    `;

    res.send(responseContent);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
