import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import routes from '../../../config/routes';

import empty from '../../img/empty.png';
import Loader from '../loader';

const ViewEmployee = props => {
	if (!props.employeesList || !props.managers) return <Loader />;

	const selectedEmployee = props.employeesList.find(
		employee => employee._id === props.match.params.id
	);

	if (!selectedEmployee) return <Redirect to="/employees" />;

	const manager = props.managers
		.filter(user => user.isAdmin)
		.find(m => m._id === selectedEmployee.managerId);

	const events = selectedEmployee.hours.map(h => ({
		title: `${h.amount} hours${h.shift ? ` - ${h.shift}` : ''}`,
		start: new Date(h.start),
		end: new Date(h.end)
	}));

	BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
	const allViews = Object.keys(BigCalendar.Views).map(
		k => BigCalendar.Views[k]
	);

	return (
		<section className="section">
			<div className="container">
				<div className="card view-patient-card">
					<div className="card-content">
						<div className="columns">
							<div className="column has-text-centered">
								<h3 className="title is-3">{`${
									selectedEmployee.firstName
								} ${selectedEmployee.lastName}`}</h3>

								<figure className="image is-256x256 view-patient-image">
									<img
										src={
											selectedEmployee.picture
												? `${routes.files}/${
														selectedEmployee.picture
												  }`
												: empty
										}
										alt="patient"
									/>
								</figure>
							</div>
							<div className="column">
								<br />
								<h6 className="is-size-6">
									<strong>First Name: </strong>
									{selectedEmployee.firstName}
								</h6>
								<h6 className="is-size-6">
									<strong>Last Name: </strong>
									{selectedEmployee.lastName}
								</h6>
								<br />
								<h6 className="is-size-6">
									<strong>Last 4 digits of SSN: </strong>
									{selectedEmployee.social}
								</h6>
								<br />
								<h6 className="is-size-6">
									<strong>Title: </strong>
									{selectedEmployee.title}
								</h6>
								<h6 className="is-size-6 is-capitalized">
									<strong>Type: </strong>
									{selectedEmployee.type}
								</h6>
								<h6 className="is-size-6">
									<strong>Date of Birth: </strong>
									{moment(selectedEmployee.dob).format(
										'MM-DD-YYYY'
									)}
								</h6>
								{selectedEmployee.type === 'doctor' ? (
									<h6 className="is-size-6 is-capitalized">
										<strong>Monthly Salary: </strong>
										${selectedEmployee.salary.toLocaleString()}
									</h6>
								) : null}
								<br />
								<h6 className="is-size-6">
									<strong>Room Number: </strong>
									{selectedEmployee.roomNumber}
								</h6>
								<h6 className="is-size-6">
									<strong>Building Number: </strong>
									{selectedEmployee.buildingNumber}
								</h6>
								<br />
								<h6 className="is-size-6">
									<strong>Admin Level: </strong>
									{selectedEmployee.isAdmin
										? 'Manager'
										: 'Employee'}
								</h6>
								<h6 className="is-size-6">
									<strong>Manager: </strong>
									{manager
										? `${manager.firstName} ${
												manager.lastName
										  }`
										: 'No manager'}
								</h6>
							</div>
						</div>

						<div className="buttons is-centered">
							<Link
								className="button is-primary"
								to={`/employees/${selectedEmployee._id}/edit`}
							>
								<span className="icon is-small">
									<i className="fas fa-edit" />
								</span>
								<span>Edit</span>
							</Link>

							<Link
								className="button is-primary"
								to={`/employees/${selectedEmployee._id}/bill`}
							>
								<span className="icon is-small">
									<i className="fas fa-money-bill-alt" />
								</span>
								<span>Paycheck</span>
							</Link>
						</div>

						<h4 className="title is-4">Hours Logged</h4>
						<div className="calendar-container">
							<BigCalendar
								events={events}
								views={allViews}
								step={60}
								defaultDate={new Date()}
							/>
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
		managers: state.users.list
			? state.users.list.filter(user => user.isAdmin)
			: []
	};
}

export default connect(mapStateToProps)(ViewEmployee);
