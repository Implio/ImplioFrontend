import React from 'react';
import empty from '../../img/empty.png';

const EmployeeMessageCard = props => {
	const { firstName, lastName } = props.user;

	return (
		<nav
			onClick={props.onClick}
			className={`level employee-message-tab ${
				props.active ? 'is-active' : ''
			}`}
		>
			<div className="level-left">
				<figure className="image is-40x40 level-item">
					<img
						className="message-user-image"
						src={empty}
						alt="empty"
					/>
				</figure>

				<p className="title is-6 level-item">{`${firstName} ${lastName}`}</p>
			</div>
		</nav>
	);
};

export default EmployeeMessageCard;
