import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Loader from '../loader';
import PatientCard from './patient-card.js';

class MyPatients extends Component {
	renderPatients(patients) {
		return patients.map(patient => (
			<PatientCard key={patient._id} patient={patient} />
		));
	}

	render() {
		if (!this.props.patientsList) return <Loader />;

		return (
			<section className="section">
				<div className="container has-text-centered">
					<h3 className="title is-3">My Patients</h3>

					{this.renderPatients(this.props.patientsList)}

					<div className="buttons is-centered create-patient">
						<Link className="button is-primary" to="/patients/new">
							Create Patient
						</Link>
					</div>
				</div>
			</section>
		);
	}
}

function mapStateToProps(state) {
	return {
		patientsList: state.patients.list,
	};
}

export default connect(mapStateToProps)(MyPatients);
