import React, { Component } from 'react';

import ProcedureCard from './procedure-card';

class Procedures extends Component {
	render() {
		return (
			<section className="section">
				<div className="container has-text-centered">
					<h3 className="title is-3">History</h3>
					<div className="field is-grouped is-grouped-right">
						<div className="control">
							<a className="button is-primary">
								<span className="icon is-small">
									<i className="fas fa-plus" />
								</span>
								<span>Add</span>
							</a>
						</div>
					</div>
					<ProcedureCard />
				</div>
			</section>
		);
	}
}

export default Procedures;
