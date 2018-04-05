import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PatientCard from './patient-card.js';

const patientsList = [
	{
		_id: 0,
		firstName: 'John',
		lastName: 'Smith',
		roomNumber: '123',
		buildingNumber: '1',
		address: '1234 West Bimbleton',
		dob: '1997-10-05',
		healthInsurance: {
			companyName: 'Company',
			memberName: 'John',
			memberId: 'p1234567',
			groupNumber: '123'
		},
		phoneNumber: '1234567',
		picture: null,
		documents: []
	},
	{
		_id: 1,
		firstName: 'Johnathan',
		lastName: 'Dunn',
		roomNumber: '123',
		buildingNumber: '1',
		address: '1234 West Bimbleton',
		dob: '1997-10-05',
		healthInsurance: {
			companyName: 'Company',
			memberName: 'Johnathan',
			memberId: 'p1234567',
			groupNumber: '123'
		},
		phoneNumber: '1234567',
		picture: null,
		documents: []
	}
];

class MyPatients extends Component {
	renderPatients(patients) {
		return patients.map(patient => (
			<PatientCard key={patient._id} patient={patient} />
		));
	}

	render() {
		return (
			<section className="section">
				<div className="container has-text-centered">
					<h2 className="title is-2">My Patients</h2>

					{this.renderPatients(patientsList)}

					<div className="buttons is-centered create-patient">
						<Link
							className="button is-primary"
							to="/patients/newpatient"
						>
							Create Patient
						</Link>
					</div>
				</div>
			</section>
		);
	}
}

export default MyPatients;
