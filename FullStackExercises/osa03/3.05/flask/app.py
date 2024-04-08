
from flask import Flask, request, jsonify, abort
import random

app = Flask(__name__)

# Example data array
persons = [
    {"id": 1, "name": "Alice", "number": "123-456-7890"},
    {"id": 2, "name": "Bob", "number": "098-765-4321"}
]

def generate_unique_id():
    while True:
        id = random.randint(1, 1000000)  # Generate a large random number
        if not any(person['id'] == id for person in persons):  # Check if the ID already exists
            return id

@app.route('/api/persons', methods=['POST'])
def add_person():
    if not request.json or 'name' not in request.json or 'number' not in request.json:
        abort(400, description="The name or number is missing")
    
    name = request.json['name']
    number = request.json['number']

    # Check if the name already exists
    if any(person['name'] == name for person in persons):
        abort(400, description="The name already exists in the phonebook")

    # Create a new person object with a unique ID
    new_person = {
        "id": generate_unique_id(),
        "name": name,
        "number": number
    }

    # Add the new person to the list
    persons.append(new_person)

    # Return the newly added person
    return jsonify(new_person), 201

if __name__ == '__main__':
    app.run(debug=True, port=3001)
