import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PatientCard from './patient-card.js';

class MyPatients extends Component {
	render() {
		return (
			<section className="section">
				<div className="container has-text-centered">
					<h2 className="title is-2">My Patients</h2>

					<PatientCard />
					<PatientCard />
					<PatientCard />

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
