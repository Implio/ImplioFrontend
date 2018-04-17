import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import * as actions from '../../actions';

import Loader from '../loader';

function getSum(total, num) {
	return total + Math.round(num);
}

function totalBill(employee) {
	if (employee.type === 'doctor') return employee.salary;
	if (employee.type === 'other') {
		// const totalHours = employee.hours
		// 	.map(hours => {
		// 		const a = moment(hours.start);
		// 		const b = moment(hours.end);

		// 		return b.diff(a, 'hours');
		// 	})
		// 	.reduce(getSum, 0);
		// return totalHours * employee.hours.paid;

		return employee.hours[0].amount;
	}

	return 0;
}

const EmployeeBill = props => {
	if (!props.employeesList) return <Loader />;

	const selectedEmployee = props.employeesList.find(
		employee => employee._id === props.match.params.id,
	);

	if (!selectedEmployee) return <Redirect to="/employees" />;

	console.log(totalBill(selectedEmployee));

	return (
		<section className="section">
			<div className="container has-text-centered">
				<h3 className="title is-3">
					{selectedEmployee.firstName} {selectedEmployee.lastName}
				</h3>
				<h4 className="subtitle is-4">Current Statement</h4>
				<div className="card view-patient-card">
					<div className="card-content">
						<table className="table is-fullwidth is-striped">
							<thead>
								<tr>
									<th>Charge</th>
									<th>Amount</th>
									<th>Total</th>
								</tr>
							</thead>
							<tbody>
								<tr className="has-text-weight-bold">
									<td>Total</td>
									<td />
									<td>$0</td>
								</tr>
							</tbody>
						</table>
						<div className="buttons is-right">
							<a
								//onClick=
								className="button is-primary"
							>
								<span className="icon is-small">
									<i className="fas fa-money-bill-alt" />
								</span>
								<span>Mark As Paid</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

function mapStateToProps(state) {
	return {
		employeesList: state.users.list,
	};
}

export default connect(mapStateToProps, actions)(EmployeeBill);
