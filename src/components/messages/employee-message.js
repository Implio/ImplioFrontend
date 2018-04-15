import React from 'react';

const EmployeeMessage = props => {
	return (
		<div className="user-message has-padding">
			<div className="media">
				<nav className="level is-fullheight">
					<div className="content">
						<p className="subtitle is-size-7">
							<strong>{props.message.toUserId}</strong>
						</p>
						<p className="is-size-7">{props.message.message}</p>
					</div>
				</nav>
			</div>
		</div>
	);
};

export default EmployeeMessage;
