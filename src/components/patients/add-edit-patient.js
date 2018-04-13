import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import Loader from '../loader';
import AddEditPatientForm from './add-edit-patient-form';

class AddEditPatient extends Component {
	handleFormSubmit(values) {
		const patient = {
			...values,
			healthInsurance: {
				companyName: values.companyName,
				memberName: values.memberName,
				memberId: values.memberId,
				groupNumber: values.groupNumber,
			},
		};

		if (!this.props.match.params.id)
			return this.props
				.addPatient(patient)
				.then(() => this.props.history.go(-1));

		return this.props
			.editPatient(patient)
			.then(() => this.props.history.go(-1));
	}

	render() {
		if (!this.props.patientsList) return <Loader />;

		let initialValues = {};

		if (this.props.match.params.id) {
			const patient = this.props.patientsList.find(
				p => p._id === this.props.match.params.id,
			);

			initialValues = { ...patient, ...patient.healthInsurance };
		}

		return (
			<section className="section">
				<div className="container">
					<h3 className="title is-3 has-text-centered">
						{`${
							this.props.match.params.id ? 'Edit' : 'New'
						} Patient`}
					</h3>
					<div className="card add-edit-patient-form">
						<div className="card-content">
							<AddEditPatientForm
								onFormSubmit={this.handleFormSubmit.bind(this)}
								uploadFile={this.props.uploadFile}
								initialValues={initialValues}
							/>
						</div>
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

export default withRouter(connect(mapStateToProps, actions)(AddEditPatient));
