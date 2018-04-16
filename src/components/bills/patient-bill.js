import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import * as actions from '../../actions';

import Loader from '../loader';

function renderPatientRoomCharge(patient) {
	if (!patient.active || !patient.activeSince) return null;

	const daysWithRoom = moment().diff(moment(patient.activeSince), 'days');

	if (daysWithRoom <= 0) return null;

	return (
		<tr>
			<td>Patient Room</td>
			<td>$300 x {daysWithRoom} days</td>
			<td>${300 * daysWithRoom}</td>
		</tr>
	);
}

function renderPrimaryPhysicianCharge(patient) {
	if (!patient.primaryPhysician || !patient.activeSince) return null;

	const daysWithRoom = moment().diff(moment(patient.activeSince), 'days');

	if (daysWithRoom <= 0) return null;

	return (
		<tr>
			<td>Primary Physician</td>
			<td>$150 x {daysWithRoom} days</td>
			<td>${150 * daysWithRoom}</td>
		</tr>
	);
}

function renderConsultingPhysicianCharge(patient) {
	if (!patient.consultingPhysician || !patient.activeSince) return null;

	const daysWithRoom = moment().diff(moment(patient.activeSince), 'days');

	if (daysWithRoom <= 0) return null;

	return (
		<tr>
			<td>Consulting Physician</td>
			<td>$50 x {daysWithRoom} days</td>
			<td>${50 * daysWithRoom}</td>
		</tr>
	);
}

function renderProcedureCharges(procedures) {
	if (!procedures) return null;

	return procedures.map(p => (
		<tr key={p._id}>
			<td>Procedure - {p.procedureName}</td>
			<td>$100 x 1</td>
			<td>$100</td>
		</tr>
	));
}

const PatientBill = props => {
	function payBill(patient, procedures) {
		props.editPatient({ ...patient, active: false, activeSince: null });

		procedures.forEach(procedure => {
			props.editProcedure({ ...procedure, paid: true });
		});
	}

	if (!props.patientsList || !props.proceduresList) return <Loader />;

	const selectedPatient = props.patientsList.find(
		patient => patient._id === props.match.params.id,
	);

	if (!selectedPatient) return <Redirect to="/patients" />;

	const procedures = props.proceduresList.filter(
		p => !p.paid && p.patientId === selectedPatient._id,
	);

	const daysWithRoom = moment().diff(
		moment(selectedPatient.activeSince),
		'days',
	);

	let total = 0;

	if (selectedPatient.active && selectedPatient.activeSince)
		total += 300 * daysWithRoom;

	if (selectedPatient.primaryPhysician && selectedPatient.activeSince)
		total += 150 * daysWithRoom;

	if (selectedPatient.consultingPhysician && selectedPatient.activeSince)
		total += 50 * daysWithRoom;

	total += procedures.length * 100;

	return (
		<section className="section">
			<div className="container has-text-centered">
				<h3 className="title is-3">
					{selectedPatient.firstName} {selectedPatient.lastName}
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
								{renderPatientRoomCharge(selectedPatient)}
								{renderPrimaryPhysicianCharge(selectedPatient)}
								{renderConsultingPhysicianCharge(
									selectedPatient,
								)}
								{renderProcedureCharges(procedures)}
								<tr className="has-text-weight-bold">
									<td>Total</td>
									<td />
									<td>${total}</td>
								</tr>
							</tbody>
						</table>
						<div className="buttons is-right">
							<a
								onClick={() => {
									payBill(selectedPatient, procedures);
								}}
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
		patientsList: state.patients.list,
		proceduresList: state.procedures.list,
	};
}

export default connect(mapStateToProps, actions)(PatientBill);
