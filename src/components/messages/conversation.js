import React from 'react';

import EmployeeMessage from './employee-message';
import MessagingBar from './messaging-bar';

function renderMessages(messages) {
	return messages.map(message => (
		<EmployeeMessage key={message._id} message={message} />
	));
}

const Conversation = props => {
	return (
		<div>
			{renderMessages(
				props.messagesList.filter(
					m =>
						m.toUserId === props.activeUser._id ||
						m.fromUserId === props.activeUser._id
				)
			)}
			<MessagingBar
				toUserId={props.activeUser._id}
				addMessage={props.addMessage}
			/>
		</div>
	);
};

export default Conversation;
