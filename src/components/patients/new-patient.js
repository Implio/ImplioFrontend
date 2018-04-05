import React, { Component } from 'react';

class NewPatient extends Component {
	render() {
		return (
			<section className="section">
				<div className="container has-text-centered">
					<h2 className="title is-2">New Patient</h2>

					<div className="buttons is-centered create-patient">
						<button className="button is-primary">
							Create Patient
						</button>
					</div>
				</div>
			</section>
		);
	}
}

export default NewPatient;
