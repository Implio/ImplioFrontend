import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../img/logo.png';

class Nav extends Component {
	render() {
		return (
			<nav
				className="navbar"
				role="navigation"
				aria-label="dropdown navigation"
			>
				<div className="navbar-menu">
					<div className="navbar-start">
						<Link to="/dashboard" className="navbar-item">
							<img src={logo} width="112" alt="logo" />
						</Link>

						<Link to="/dashboard" className="navbar-item">
							Dashboard
						</Link>
						<Link to="/patients" className="navbar-item">
							Patients
						</Link>
						<Link to="/messages" className="navbar-item">
							Messages
						</Link>

						<div className="navbar-item has-dropdown is-hoverable">
							<a className="navbar-link">Settings</a>

							<div className="navbar-dropdown">
								<Link to="/log-hours" className="navbar-item">
									Log Hours
								</Link>
								<Link to="/schedule" className="navbar-item">
									Schedule
								</Link>
								<Link to="/payments" className="navbar-item">
									Payments
								</Link>
							</div>
						</div>
					</div>
					<div className="navbar-end">
						<a className="navbar-item">Log Out</a>
					</div>
				</div>
			</nav>
		);
	}
}

export default Nav;
