import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';

import routes from '../../../config/routes';

import empty from '../../img/empty.png';
import Loader from '../loader';

const ViewPatient = props => {
	if (!props.patientsList) return <Loader />;

	const selectedPatient = props.patientsList.find(
		patient => patient._id === props.match.params.id,
	);

	if (!selectedPatient) return <Redirect to="/patients" />;

	const primaryPhysician = props.doctors.find(
		doc => doc._id === selectedPatient.primaryPhysician,
	);

	const consultingPhysician = props.doctors.find(
		doc => doc._id === selectedPatient.consultingPhysician,
	);

	return (
		<section className="section">
			<div className="container">
				<div className="card view-patient-card">
					<div className="card-content">
						<div className="columns">
							<div className="column has-text-centered">
								<h3 className="title is-3">{`${
									selectedPatient.firstName
								} ${selectedPatient.lastName}`}</h3>

								<figure className="image is-256x256 view-patient-image">
									<img
										src={
											selectedPatient.picture
												? `${routes.files}/${
														selectedPatient.picture
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
									{selectedPatient.firstName}
								</h6>
								<h6 className="is-size-6">
									<strong>Last Name: </strong>
									{selectedPatient.lastName}
								</h6>
								<br />
								<h6 className="is-size-6">
									<strong>Active: </strong>
									{selectedPatient.active ? 'Yes' : 'No'}
								</h6>
								{selectedPatient.activeSince ? (
									<h6 className="is-size-6">
										<strong>Active Since: </strong>
										{moment(
											selectedPatient.activeSince,
										).format('lll')}
									</h6>
								) : null}
								{selectedPatient.roomNumber ? (
									<h6 className="is-size-6">
										<strong>Room Number: </strong>
										{selectedPatient.roomNumber}
									</h6>
								) : null}
								{selectedPatient.buildingNumber ? (
									<h6 className="is-size-6">
										<strong>Building Number: </strong>
										{selectedPatient.buildingNumber}
									</h6>
								) : null}
								<br />
								<h6 className="is-size-6">
									<strong>Phone Number: </strong>
									{selectedPatient.phoneNumber}
								</h6>
								<h6 className="is-size-6">
									<strong>Address: </strong>
									{selectedPatient.address}
								</h6>
								<br />
								<h6 className="is-size-6">
									<strong>Date of Birth: </strong>
									{moment(selectedPatient.dob).format(
										'MM-DD-YYYY',
									)}
								</h6>
								<h6 className="is-size-6">
									<strong>SSN: </strong>
									{selectedPatient.social}
								</h6>
								<br />
								<h6 className="is-size-6">
									<strong>Primary Physician: </strong>
									{primaryPhysician
										? `${primaryPhysician.firstName} ${
												primaryPhysician.lastName
										  }`
										: 'No Physician'}
								</h6>
								<h6 className="is-size-6">
									<strong>Consulting Physician: </strong>
									{consultingPhysician
										? `${consultingPhysician.firstName} ${
												consultingPhysician.lastName
										  }`
										: 'No Physician'}
								</h6>
								<br />
								<h6 className="is-size-6">
									<strong>Insurance Company Name: </strong>
									{
										selectedPatient.healthInsurance
											.companyName
									}
								</h6>
								<h6 className="is-size-6">
									<strong>Member Name: </strong>
									{selectedPatient.healthInsurance.memberName}
								</h6>
								<h6 className="is-size-6">
									<strong>Member ID: </strong>
									{selectedPatient.healthInsurance.memberId}
								</h6>
								<h6 className="is-size-6">
									<strong>Group Number: </strong>
									{
										selectedPatient.healthInsurance
											.groupNumber
									}
								</h6>
								<br />
								<h6 className="is-size-6">
									<strong>Documents: </strong>
								</h6>
								<ul>
									{selectedPatient.documents.map(
										(doc, index) => (
											<li key={index}>
												<a
													href={`${
														routes.files
													}/${doc}`}
													target="_blank"
												>{`${doc} `}</a>
											</li>
										),
									)}
								</ul>
							</div>
						</div>
						<div className="buttons is-centered">
							<Link
								className="button is-primary"
								to={`/patients/${selectedPatient._id}/edit`}
							>
								<span className="icon is-small">
									<i className="fas fa-edit" />
								</span>
								<span>Edit</span>
							</Link>
							<Link
								className="button is-primary"
								to={`/patients/${selectedPatient._id}/history`}
							>
								<span className="icon is-small">
									<i className="fas fa-clipboard" />
								</span>
								<span>Medical History</span>
							</Link>
							<Link
								className="button is-primary"
								to={`/patients/${selectedPatient._id}/bill`}
							>
								<span className="icon is-small">
									<i className="fas fa-money-bill-alt" />
								</span>
								<span>Current Bill</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

function mapStateToProps(state) {
	return {
		patientsList: state.patients.list,
		doctors: state.users.list
			? state.users.list.filter(user => user.type === 'doctor')
			: [],
	};
}

export default connect(mapStateToProps)(ViewPatient);
