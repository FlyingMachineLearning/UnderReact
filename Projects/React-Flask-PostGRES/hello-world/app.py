from flask import Flask, jsonify
import psycopg2

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(
        host='localhost',
        database='hello_world_db',
        user='yourusername',
        password='yourpassword')
    return conn

@app.route('/api/greeting', methods=['GET'])
def get_greeting():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT message FROM greetings LIMIT 1;')
    greeting = cur.fetchone()
    cur.close()
    conn.close()
    return jsonify({'message': greeting[0]})

if __name__ == '__main__':
    app.run(debug=True)
