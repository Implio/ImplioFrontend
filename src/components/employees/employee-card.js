import React from 'react';
import { Link } from 'react-router-dom';

import empty from '../../img/empty.png';

const EmployeeCard = props => {
	const { firstName, lastName } = props.employee;

	return (
		<Link
			to={`/user/${props.employee._id}`}
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
						<p className="subtitle is-7">{props.employee._id}</p>
					</div>
				</div>

				<div className="content">
					<p className="subtitle is-size-7">
						<strong>Title: </strong>
						{props.employee.title}
						<br />
						<strong>Room: </strong>
						{props.employee.roomNumber}
					</p>
				</div>
			</div>
		</Link>
	);
};

export default EmployeeCard;
