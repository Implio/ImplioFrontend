import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

import Nav from './nav/nav.js';
import LoginPage from './login/login';

import MyPatients from './patients/my-patients';
import AddEditPatient from './patients/add-edit-patient';
import ViewPatient from './patients/view-patient';

class App extends Component {
	constructor(props) {
		super(props);
		const token = localStorage.getItem('x-auth');

		if (token) this.props.fetchAll(token);
	}

	render() {
		if (!this.props.isLoggedIn) return <LoginPage />;

		return (
			<BrowserRouter>
				<div>
					<Nav me={this.props.me} />
					<Switch>
						<Route
							path="/patients/new-patient"
							component={AddEditPatient}
						/>
						<Route
							path="/patients/:id/edit"
							component={AddEditPatient}
						/>
						<Route path="/patients/:id" component={ViewPatient} />
						<Route path="/patients" component={MyPatients} />

						<Route
							path="/dashboard"
							render={() => <div>Dashboard</div>}
						/>

						<Route
							path="/employees"
							render={() => <div>Employees</div>}
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
		me: state.users.me
	};
}

export default connect(mapStateToProps, actions)(App);
