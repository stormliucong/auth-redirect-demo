from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Flask route for handling registration
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    callback_url = data['callbackUrl']
    # Assume registration is successful
    return jsonify({'message': 'Registration successful', 'redirect': True})

if __name__ == '__main__':
    app.run(debug=True)
