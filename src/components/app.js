import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Switch>
						<Route path="/" render={() => <h1>Redux Starter</h1>} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
