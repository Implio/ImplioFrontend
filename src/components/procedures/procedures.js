import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Loader from '../loader';
import ProcedureCard from './procedure-card';

const Procedures = props => {
	if (!props.proceduresList || !props.usersList) return <Loader />;

	const procedures = props.proceduresList
		.filter(p => p.patientId === props.match.params.id)
		.map(p => {
			const doctor = props.usersList.find(d => d._id === p.doctorId);

			return {
				...p,
				doctorName: `${doctor.firstName} ${doctor.lastName}`,
			};
		});

	const user = props.patientsList.find(p => p._id === props.match.params.id);

	return (
		<section className="section">
			<div className="container has-text-centered procedure-container">
				<h3 className="title is-3">
					{user.firstName} {user.lastName}
				</h3>
				<h4 className="subtitle is-4">Medical History</h4>
				<div className="field is-grouped is-grouped-right">
					<div className="control">
						<Link
							to={`/patients/${user._id}/history/new`}
							className="button is-primary"
						>
							<span className="icon is-small">
								<i className="fas fa-plus" />
							</span>
							<span>Add</span>
						</Link>
					</div>
				</div>
				{procedures.map(p => (
					<ProcedureCard key={p._id} procedure={p} />
				))}
			</div>
		</section>
	);
};

function mapStateToProps(state) {
	return {
		proceduresList: state.procedures.list,
		usersList: state.users.list,
		patientsList: state.patients.list,
	};
}

export default connect(mapStateToProps)(Procedures);
