import React from 'react';

const MessagingBar = () => {
	return (
		<div className="field has-padding">
			<p className="control has-icons-left has-icons-right">
				<input
					className="input has-background-primary has-text-primary-light"
					type="textarea"
					placeholder="Message"
				/>
				<span className="icon is-left">
					<i className="fas fa-plus has-text-primary-light" />
				</span>
				<span className="icon is-right">
					<i className="fas fa-check has-text-primary-light" />
				</span>
			</p>
		</div>
	);
};

export default MessagingBar;
