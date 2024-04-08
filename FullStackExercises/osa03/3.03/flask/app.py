from flask import Flask, jsonify, abort

app = Flask(__name__)

# Existing hardcoded array of telephone number information
persons = [
    {"id": 1, "name": "Alice", "number": "123-456-7890"},
    {"id": 2, "name": "Bob", "number": "098-765-4321"},
    # Add more entries as needed...
]

@app.route('/api/persons/<int:id>', methods=['GET'])
def get_person(id):
    # Find the person by id
    person = next((p for p in persons if p['id'] == id), None)

    if person:
        return jsonify(person)  # If found, return the person's information as JSON
    else:
        abort(404)  # If not found, return a 404 Not Found status code

if __name__ == '__main__':
    app.run(debug=True, port=3001)
