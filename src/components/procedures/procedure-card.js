import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import routes from '../../../config/routes';

const ProcedureCard = props => {
	return (
		<div className="card procedure-card">
			<div className="card-content has-text-left">
				<div className="level is-marginless">
					<div className="level-left">
						<p>
							<strong>{props.procedure.procedureName}</strong>
						</p>
					</div>
					<div className="level-right">
						<div className="buttons">
							<Link
								to={`/patients/${
									props.procedure.patientId
								}/history/${props.procedure._id}/edit`}
								className="button is-text has-no-text-decoration"
							>
								<span className="icon is-small">
									<i className="fas fa-edit" />
								</span>
							</Link>
						</div>
					</div>
				</div>
				<br />
				<div className="columns">
					<div className="column is-three-quarters">
						<p>
							<strong>Description: </strong>
							<br />
							{props.procedure.description}
						</p>
					</div>
					<div className="column">
						<p>
							<strong>Doctor: </strong>{' '}
							{props.procedure.doctorName}
							<br />
							<strong>Date: </strong>{' '}
							{moment(props.procedure.date).format('lll')}
							<br />
							<strong>Category: </strong>{' '}
							{props.procedure.category}
						</p>

						<br />

						<p>
							<strong>Documents: </strong>
						</p>
						<ul>
							{props.procedure.documents.map((doc, index) => (
								<li key={index}>
									<a
										href={`${routes.files}/${doc}`}
										target="_blank"
									>{`${doc} `}</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProcedureCard;
