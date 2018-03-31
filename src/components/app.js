import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Nav from './nav/nav.js';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoggedIn: false
		};
	}

	render() {
		if (!this.state.isLoggedIn) {
			return (
				<button
					onClick={() => {
						this.setState({
							isLoggedIn: true
						});
					}}
				>
					Log In
				</button>
			);
		}

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

export default App;
