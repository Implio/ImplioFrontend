import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Messages extends Component {
	render() {
		return (
			<div className="is-fullheight">
				<div className="columns is-gapless is-marginless">
					<div className="column is-one-fifth has-background-primary">
						<section className="has-padding">
							<div className="field">
								<div className="control has-icons-right">
									<input
										className="input has-background-white"
										type="text"
									/>
									<span className="icon is-small is-right">
										<i className="fas fa-search fa-xs" />
									</span>
								</div>
							</div>
						</section>
					</div>
					<div className="column has-background-white ">
						<nav className="level is-fullheight has-padding">
							<div className="level-left">
								<p className="title is-6 level-item">
									My Patients
								</p>
							</div>
						</nav>
					</div>
				</div>
				<div className="messages-line" />

				<div className="columns is-gapless is-marginless is-fullheight">
					<div className="column is-one-fifth has-background-primary">
						<section className="has-padding" />
					</div>
					<div className="column has-background-white " />
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { error: state.auth.error };
}

export default connect(mapStateToProps, actions)(Messages);
