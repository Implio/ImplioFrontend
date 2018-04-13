import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actions from '../../actions';

import Loader from '../loader';
import AddEditEmployeeForm from './add-edit-employee-form';

class AddEditEmployee extends Component {
	handleFormSubmit(values) {
		const employee = {
			...values,
			roomNumber: `${values.roomType}${values.roomNumber}`,
		};

		if (!this.props.match.params.id)
			return this.props
				.addEmployee(employee)
				.then(() => this.props.history.go(-1));

		return this.props
			.editEmployee(employee)
			.then(() => this.props.history.go(-1));
	}

	render() {
		if (!this.props.employeesList || !this.props.me) return <Loader />;

		let initialValues = {};

		if (this.props.match.params.id) {
			const employee = this.props.employeesList.find(
				e => e._id === this.props.match.params.id,
			);

			if (!employee) return <Redirect to="/dashboard" />;

			initialValues = {
				...employee,
				dob: moment(employee.dob).format('MM-DD-YYYY'),
				roomType: employee.roomNumber[0],
				roomNumber: employee.roomNumber.slice(1),
			};
		}

		return (
			<section className="section">
				<div className="container">
					<h3 className="title is-3 has-text-centered">
						{`${
							this.props.match.params.id ? 'Edit' : 'New'
						} Employee`}
					</h3>
					<div className="card add-edit-patient-form">
						<div className="card-content">
							<AddEditEmployeeForm
								onFormSubmit={this.handleFormSubmit.bind(this)}
								uploadFile={this.props.uploadFile}
								initialValues={initialValues}
								isAdmin={this.props.me.isAdmin}
								managers={this.props.managers}
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
		managers: state.users.managers,
		employeesList: state.users.list,
		me: state.users.me,
	};
}

export default withRouter(connect(mapStateToProps, actions)(AddEditEmployee));
