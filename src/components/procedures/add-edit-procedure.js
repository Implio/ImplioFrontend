import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import Loader from '../loader';
import AddEditProcedureForm from './add-edit-procedure-form';

class AddEditProcedure extends Component {
	handleFormSubmit(values) {
		const procedure = values;

		if (!this.props.match.params.procedureId)
			return this.props
				.addProcedure(procedure)
				.then(() => this.props.history.go(-1));

		return this.props
			.editProcedure(procedure)
			.then(() => this.props.history.go(-1));
	}

	render() {
		if (!this.props.proceduresList) return <Loader />;

		if (!this.props.match.params.id) return <Redirect to="/patients" />;

		let initialValues = { patientId: this.props.match.params.id };

		if (this.props.match.params.procedureId) {
			const procedure = this.props.proceduresList.find(
				p => p._id === this.props.match.params.procedureId,
			);

			if (!procedure) return <Redirect to="/dashboard" />;

			initialValues = { ...initialValues, ...procedure };
		}

		return (
			<section className="section">
				<div className="container">
					<h3 className="title is-3 has-text-centered">
						{`${
							this.props.match.params.procedureId ? 'Edit' : 'New'
						} Procedure`}
					</h3>
					<div className="card add-edit-patient-form">
						<div className="card-content">
							<AddEditProcedureForm
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
		proceduresList: state.procedures.list,
		doctors: state.users.list
			? state.users.list.filter(user => user.type === 'doctor')
			: [],
	};
}

export default withRouter(connect(mapStateToProps, actions)(AddEditProcedure));
