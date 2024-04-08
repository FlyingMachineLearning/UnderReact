from flask import Flask, jsonify, request, abort

app = Flask(__name__)

# Existing hardcoded array of telephone number information
persons = [
    {"id": 1, "name": "Alice", "number": "123-456-7890"},
    {"id": 2, "name": "Bob", "number": "098-765-4321"},
    # Add more entries as needed...
]

@app.route('/api/persons/<int:id>', methods=['DELETE'])
def delete_person(id):
    global persons  # To modify the global variable
    # Find the index of the person by id
    person_index = next((index for (index, d) in enumerate(persons) if d["id"] == id), None)

    if person_index is not None:
        del persons[person_index]  # Remove the person from the list
        return '', 204  # Respond with a 204 No Content status code to indicate successful deletion
    else:
        abort(404)  # If not found, respond with a 404 Not Found status code

if __name__ == '__main__':
    app.run(debug=True, port=3001)

