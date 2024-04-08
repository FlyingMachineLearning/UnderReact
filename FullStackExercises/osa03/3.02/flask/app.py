from flask import Flask
from datetime import datetime

app = Flask(__name__)

# Your existing hardcoded array of telephone number information
persons = [
    {"id": 1, "name": "Alice", "number": "123-456-7890"},
    {"id": 2, "name": "Bob", "number": "098-765-4321"},
    # More entries as needed...
]

@app.route('/info')
def info():
    num_of_people = len(persons)  # Number of people in the phone book
    time_stamp = datetime.now()  # Current timestamp

    # Constructing the response content
    response_content = f"<p>Phonebook has info for {num_of_people} people</p>" \
                       f"<p>{time_stamp}</p>"
    
    return response_content

if __name__ == '__main__':
    app.run(debug=True, port=3001)

