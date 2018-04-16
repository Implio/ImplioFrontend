import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actions from '../../actions';

import Loader from '../loader';
import AddEditPatientForm from './add-edit-patient-form';

class AddEditPatient extends Component {
	handleFormSubmit(values) {
		const patient = {
			...values,
			roomNumber: values.active ? `P${values.roomNumber}` : null,
			buildingNumber: values.active ? values.buildingNumber : null,
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

			if (!patient) return <Redirect to="/dashboard" />;

			initialValues = {
				...patient,
				...patient.healthInsurance,
				roomNumber: patient.roomNumber
					? patient.roomNumber.slice(1)
					: '',
			};
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
								doctors={this.props.doctors}
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
		doctors: state.users.list
			? state.users.list.filter(user => user.type === 'doctor')
			: [],
	};
}

export default withRouter(connect(mapStateToProps, actions)(AddEditPatient));
