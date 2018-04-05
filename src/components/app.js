import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './nav/nav.js';
import LoginPage from './login/login';

class App extends Component {
	render() {
		if (!this.props.isLoggedIn) return <LoginPage />;

		return (
			<BrowserRouter>
				<div>
					<Nav />
					<Switch>
						<Route
							path="/patients"
							render={() => <h1>Patients Page</h1>}
						/>

						<Route
							path="/dashboard"
							render={() => <div>Dashboard</div>}
						/>
						<Redirect from="/" to="/dashboard" />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

function mapStateToProps(state) {
	return {
		isLoggedIn: state.auth.isLoggedIn,
	};
}

export default connect(mapStateToProps)(App);
