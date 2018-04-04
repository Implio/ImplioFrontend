import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import logoIcon from '../../img/logo_icon.png';

class Nav extends Component {
	render() {
		return (
			<nav
				className="navbar has-shadow"
				role="navigation"
				aria-label="dropdown navigation"
			>
				<div className="navbar-brand">
					<NavLink to="/dashboard" className="navbar-item">
						<img src={logoIcon} alt="logo" />
					</NavLink>
				</div>
				<div className="navbar-menu">
					<div className="navbar-start">
						<NavLink
							to="/dashboard"
							className="navbar-item is-tab"
							activeClassName="is-active"
						>
							Dashboard
						</NavLink>
						<NavLink
							to="/patients"
							className="navbar-item is-tab"
							activeClassName="is-active"
						>
							Patients
						</NavLink>
						<NavLink
							to="/messages"
							className="navbar-item is-tab"
							activeClassName="is-active"
						>
							Messages
						</NavLink>

						<div className="navbar-item has-dropdown is-hoverable">
							<a className="navbar-link">Settings</a>

							<div className="navbar-dropdown">
								<NavLink
									to="/log-hours"
									className="navbar-item"
								>
									Log Hours
								</NavLink>
								<NavLink to="/schedule" className="navbar-item">
									Schedule
								</NavLink>
								<NavLink to="/payments" className="navbar-item">
									Payments
								</NavLink>
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
