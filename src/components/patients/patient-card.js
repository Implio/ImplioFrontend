import React from 'react';
import { Link } from 'react-router-dom';

import empty from '../../img/empty.png';

const PatientCard = props => {
	const { firstName, lastName } = props.patient;

	return (
		<Link
			to={`/patients/${props.patient._id}`}
			className="card patient-card has-text-left"
		>
			<div className="card-content">
				<div className="media">
					<div className="media-left">
						<figure className="image is-64x64">
							<img src={empty} alt="patient" />
						</figure>
					</div>
					<div className="media-content">
						<p className="title is-5">{`${firstName} ${lastName}`}</p>
						<p className="subtitle is-7">{props.patient._id}</p>
					</div>
				</div>

				<div className="content">
					<p className="subtitle is-size-7">
						<strong>Room: </strong>
						{props.patient.roomNumber}
						<br />
						<strong>Building: </strong>
						{props.patient.buildingNumber}
						<br />
						<strong>Phone #:</strong> {props.patient.phoneNumber}
					</p>
				</div>
			</div>
		</Link>
	);
};

export default PatientCard;
