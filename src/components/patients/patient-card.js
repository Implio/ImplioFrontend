import React, { Component } from 'react';
import logoIcon from '../../img/patient.png';

class PatientCard extends Component {
	render() {
		return (
			<div className="card patient-card has-text-left">
				<div className="card-content">
					<div className="media">
						<div className="media-left">
							<figure className="image is-64x64">
								<img src={logoIcon} alt="logo" />
							</figure>
						</div>
						<div className="media-content">
							<p className="title is-5">John Smith</p>
							<p className="subtitle is-7">P123456</p>
						</div>
					</div>

					<div className="content">
						<p className="subtitle is-size-7">
							<strong>Room:</strong> 111
							<br />
							<strong>Building:</strong> 4
							<br />
							<strong>Phone #:</strong> (111)-123-1234
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default PatientCard;
