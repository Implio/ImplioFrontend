import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import Loader from '../loader';
import AddEditPatientForm from './add-edit-patient-form';

const AddEditPatient = props => {
	if (!props.patientsList) return <Loader />;

	let initialValues = {};

	if (props.match.params.id) {
		const patient = props.patientsList.find(
			p => p._id === props.match.params.id,
		);

		initialValues = { ...patient, ...patient.healthInsurance };
	}

	const handleFormSubmit = values => {
		const patient = {
			...values,
			healthInsurance: {
				companyName: values.companyName,
				memberName: values.memberName,
				memberId: values.memberId,
				groupNumber: values.groupNumber,
			},
		};

		if (!props.match.params.id) return props.addPatient(patient);

		return props.editPatient(patient);
	};

	return (
		<section className="section">
			<div className="container">
				<h3 className="title is-3 has-text-centered">
					{`${props.match.params.id ? 'Edit' : 'New'} Patient`}
				</h3>
				<div className="card add-edit-patient-form">
					<div className="card-content">
						<AddEditPatientForm
							onFormSubmit={handleFormSubmit}
							initialValues={initialValues}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

function mapStateToProps(state) {
	return {
		patientsList: state.patients.list,
	};
}

export default connect(mapStateToProps, actions)(AddEditPatient);
