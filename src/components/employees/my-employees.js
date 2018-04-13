import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Loader from '../loader';
import EmployeeCard from './employee-card.js';

class MyEmployees extends Component {
	renderEmployees(employees) {
		return employees.map(employee => (
			<EmployeeCard key={employee._id} employee={employee} />
		));
	}

	render() {
		if (!this.props.employeeList || !this.props.me) return <Loader />;

		return (
			<section className="section">
				<div className="container has-text-centered">
					<h3 className="title is-3">My Employees</h3>

					{this.renderEmployees(
						this.props.employeeList.filter(
							employee => employee.managerId === this.props.me._id
						)
					)}

					<div className="buttons is-centered create-patient">
						<Link
							className="button is-primary"
							to="/patients/new-patient"
						>
							Create Employee
						</Link>
					</div>
				</div>
			</section>
		);
	}
}

function mapStateToProps(state) {
	return {
		employeeList: state.users.list,
		me: state.users.me
	};
}

export default connect(mapStateToProps)(MyEmployees);
