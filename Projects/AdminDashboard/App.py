from flask import Flask, jsonify
from datetime import datetime, timedelta

app = Flask(__name__)

# Sample data generation
def generate_data():
    base_date = datetime.now()
    data = []
    followers = 1000  # Starting number of followers
    for i in range(10):
        data.append({
            "date": (base_date - timedelta(days=i)).strftime("%Y-%m-%d"),
            "followers": followers
        })
        followers += i * 10  # Simulate growth
    growth_rate = ((data[0]["followers"] - data[-1]["followers"]) / data[-1]["followers"]) * 100
    return data, growth_rate

@app.route('/api/followers-growth', methods=['GET'])
def followers_growth():
    data, growth_rate = generate_data()
    return jsonify({"data": data, "growthRate": growth_rate})

if __name__ == '__main__':
    app.run(debug=True)
