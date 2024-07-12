from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///patient_portal.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Service(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    patients = db.relationship('PatientService', back_populates='service')
    authentication_url = db.Column(db.String(200))
    api_url = db.Column(db.String(200))

class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    services = db.relationship('PatientService', back_populates='patient')

class PatientService(db.Model):
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'), primary_key=True)
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'), primary_key=True)
    is_registered = db.Column(db.Boolean, default=False, nullable=False)
    patient = db.relationship('Patient', back_populates='services')
    service = db.relationship('Service', back_populates='patients')

with app.app_context():
    db.create_all()

@app.route('/refresh_app', methods=['GET'])
def create_tables():
    db.drop_all()
    db.create_all()
    # Create default services
    service1 = Service(name='service1', authentication_url='http://localhost:3000/register', api_url='http://localhost:5000/api')
    db.session.add(service1)
    db.session.commit()
    service2 = Service(name='service2', authentication_url='#', api_url='#')
    db.session.add(service2)
    db.session.commit()
    # Create default patients
    patient1 = Patient(email='abc@gmail.com')
    db.session.add(patient1)
    db.session.commit() 

    return jsonify({'message': 'Tables created successfully'}), 200

@app.route('/update_status', methods=['POST'])
def register():
    data = request.get_json()
    service_id = data['service_id']
    patient_id = data['patient_id']
    is_registered = data['is_registered']
    patient_service = PatientService.query.filter_by(patient_id=patient_id, service_id=service_id).first()
    if patient_service:
        patient_service.is_registered = is_registered
        db.session.commit()
        return jsonify({'message': 'Status updated successfully'}), 200
    else:
        new_patient_service = PatientService(patient_id=patient_id, service_id=service_id, is_registered=is_registered)
        db.session.add(new_patient_service)
        db.session.commit()
        return jsonify({'message': 'Status updated successfully'}), 201
    

@app.route('/get_status', methods=['POST'])
def get_status():
    data = request.get_json()
    service_id = data['service_id']
    patient_id = data['patient_id']
    patient_service = PatientService.query.filter_by(patient_id=patient_id, service_id=service_id).first()
    if patient_service:
        service = Service.query.filter_by(id=service_id).first()
        return jsonify({
            'serviceAppAuthenticationUrl': service.authentication_url,
            'serviceAppApiUrl': service.api_url,
            'isRegistered': patient_service.is_registered
        }), 200
    else:
        service = Service.query.filter_by(id=service_id).first()
        if service:
            return jsonify({
                'serviceAppAuthenticationUrl': service.authentication_url,
                'serviceAppApiUrl': service.api_url,
                'isRegistered': False
            }), 200
        else:
            return jsonify({'message': 'Service not found'}), 404
        
@app.route('/show_services', methods=['GET'])
def show_services():
    services = Service.query.all()
    output = []
    for service in services:
        service_data = {
            'id': service.id,
            'name': service.name,
            'authentication_url': service.authentication_url,
            'api_url': service.api_url
        }
        output.append(service_data)
    return jsonify({'services': output})

@app.route('/show_patients', methods=['GET'])
def show_patients():
    patients = Patient.query.all()
    output = []
    for patient in patients:
        patient_data = {
            'id': patient.id,
            'email': patient.email
        }
        output.append(patient_data)
    return jsonify({'patients': output})

@app.route('/show_patient_services', methods=['GET'])
def show_patient_services():
    patient_services = PatientService.query.all()
    output = []
    for patient_service in patient_services:
        patient_service_data = {
            'patient_id': patient_service.patient_id,
            'service_id': patient_service.service_id,
            'is_registered': patient_service.is_registered
        }
        output.append(patient_service_data)
    return jsonify({'patient_services': output})

if __name__ == '__main__':
    app.run(debug=True, port=5001)