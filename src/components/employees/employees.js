import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Loader from '../loader';
import EmployeeCard from './employee-card.js';

class Employees extends Component {
	renderEmployees(employees) {
		return employees.map(employee => (
			<EmployeeCard key={employee._id} employee={employee} />
		));
	}

	render() {
		if (!this.props.employeesList || !this.props.me) return <Loader />;

		if (!this.props.me.isAdmin) return <Redirect to="/dashboard" />;

		return (
			<section className="section">
				<div className="container has-text-centered">
					<h3 className="title is-3">My Employees</h3>

					{this.renderEmployees(
						this.props.employeesList.filter(
							e => e.managerId === this.props.me._id,
						),
					)}

					<br />
					<br />

					<h3 className="title is-3">All Employees</h3>

					{this.renderEmployees(
						this.props.employeesList.filter(
							e =>
								e.managerId !== this.props.me._id &&
								e._id !== this.props.me._id,
						),
					)}

					<div className="buttons is-centered create-patient">
						<Link className="button is-primary" to="/employees/new">
							Create New Employee
						</Link>
					</div>
				</div>
			</section>
		);
	}
}

function mapStateToProps(state) {
	return {
		employeesList: state.users.list,
		me: state.users.me,
	};
}

export default connect(mapStateToProps)(Employees);
