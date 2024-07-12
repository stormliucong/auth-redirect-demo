from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt


app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG_MODE'] = True
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

with app.app_context():
    db.create_all()

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    print(data)
    email = data['email']
    password = data['password']
    user = User.query.filter_by(email=email).first()

    if user:
        return jsonify({'message': 'Email already exists'}), 409

    new_user = User(email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    if 'callbackUrl' in data:
        return jsonify({'message': 'User registered successfully', 'redirect': True}), 201
    else:
        return jsonify({'message': 'User registered successfully'}), 201

# for debug purposes
@app.route('/show_users', methods=['GET'])
def get_users():
    if not app.config['DEBUG_MODE']:
        return jsonify({'error': 'This endpoint is disabled'}), 403
    
    users = User.query.all()
    users_list = [{'id': user.id, 'email': user.email} for user in users]
    return jsonify(users_list)

@app.route('/delete_user/<int:user_id>', methods=['GET'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'message': 'User not found'}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'}), 200


@app.route('/api', methods=['GET'])
def api():
    return jsonify({'message': 'Use App API'}), 200


if __name__ == '__main__':
    app.run(debug=True, port=5000)
