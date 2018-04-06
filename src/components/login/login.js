import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import logo from '../../img/logo.png';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.error) this.setState({ isLoading: false });
	}

	onFormSubmit(e) {
		e.preventDefault();
		const social = this.refs.social.value;
		const password = this.refs.password.value;
		this.setState({ isLoading: true });

		this.props.login(social, password);
	}

	render() {
		return (
			<div className="login-form-container">
				<form
					onSubmit={this.onFormSubmit.bind(this)}
					className="login-form card"
				>
					<div className="card-content">
						<img
							role="presentation"
							src={logo}
							className="logo"
							width="220"
							height="30"
						/>

						<div className="field">
							<label htmlFor="social" className="is-size-7">
								Social
							</label>
							<div className="control">
								<input
									type="text"
									className="input is-shadowless"
									ref="social"
								/>
							</div>
						</div>

						<div className="field">
							<label htmlFor="password" className="is-size-7">
								Password
							</label>
							<div className="control">
								<input
									type="password"
									className="input is-shadowless"
									ref="password"
								/>
							</div>
							<a className="help has-text-grey is-underlined">
								Forgot password?
							</a>
						</div>

						<div className="field">
							<div className="control">
								<button
									className={`button is-fullwidth is-primary ${
										this.state.isLoading ? 'is-loading' : ''
									}`}
								>
									Log In
								</button>
							</div>
						</div>

						<p className="help is-danger">{this.props.error}</p>
					</div>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { error: state.auth.error };
}

export default connect(mapStateToProps, actions)(Login);
