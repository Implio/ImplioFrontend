import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import * as actions from '../../actions';

import Loader from '../loader';

function getSum(total, num) {
	return total + Math.round(num);
}

function renderByDateBill(employee) {
	if (employee.type === 'doctor') return null;

	return employee.hours.map(hour => (
		<tr key={hour._id}>
			<td>
				{moment(hour.start).format('L LT')} -{' '}
				{moment(hour.end).format('LT')}
			</td>
			<td>{hour.shift}</td>
			<td>{`$100 x ${hour.amount} hours ${
				hour.shift === 'Floating Shift' ? ' + $125' : ''
			}`}</td>
			<td>
				${100 * hour.amount +
					(hour.shift === 'Floating Shift' ? 125 : 0)}
			</td>
		</tr>
	));
}

function totalBill(employee) {
	if (employee.type === 'doctor') return employee.salary;

	const totalHours = employee.hours
		.map(
			hour =>
				hour.shift === 'Floating Shift'
					? hour.amount * 100 + 125
					: hour.amount * 100
		)
		.reduce(getSum, 0);

	return totalHours;
}

const EmployeeBill = props => {
	if (!props.employeesList) return <Loader />;

	const selectedEmployee = props.employeesList.find(
		employee => employee._id === props.match.params.id
	);

	if (!selectedEmployee) return <Redirect to="/employees" />;

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
									<th>Date</th>
									<th>
										{selectedEmployee.type === 'nurse'
											? 'Shift'
											: ''}
									</th>
									<th>Amount</th>
									<th>Total</th>
								</tr>
							</thead>
							<tbody>
								{renderByDateBill(selectedEmployee)}
								<tr className="has-text-weight-bold">
									<td>Total</td>
									<td />
									<td />
									<td>${totalBill(selectedEmployee)}</td>
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
		employeesList: state.users.list
	};
}

export default connect(mapStateToProps, actions)(EmployeeBill);
