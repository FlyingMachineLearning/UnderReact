from flask import Flask, jsonify

app = Flask(__name__)

# Hardcoded array of telephone number information
persons = [
    {"id": 1, "name": "Alice", "number": "123-456-7890"},
    {"id": 2, "name": "Bob", "number": "098-765-4321"},
    # Add more entries as needed
]

@app.route('/api/persons', methods=['GET'])
def get_persons():
    return jsonify(persons)

if __name__ == '__main__':
    app.run(debug=True, port=3001)

