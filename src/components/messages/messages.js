import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Loader from '../loader';

import MessagesHeader from './messages-header';
import EmployeeMessageCard from './employee-message-card';
import EmployeeMessage from './employee-message';
import MessagingBar from './messaging-bar';

class Messages extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeUser: null
		};
	}

	onEmployeeMessage(id) {
		this.setState({
			activeUser: this.props.usersList.find(user => user._id === id)
		});
	}

	renderEmployees(users) {
		return users.map(user => (
			<EmployeeMessageCard
				key={user._id}
				user={user}
				active={
					this.state.activeUser &&
					this.state.activeUser._id === user._id
				}
				onClick={() => {
					this.onEmployeeMessage(user._id);
				}}
			/>
		));
	}

	renderMessages(messages) {
		return messages.map(message => (
			<EmployeeMessage key={message._id} message={message} />
		));
	}

	render() {
		if (!this.props.usersList || !this.props.messagesList)
			return <Loader />;
		return (
			<div className="is-fullheight">
				<MessagesHeader
					name={
						this.state.activeUser
							? `${this.state.activeUser.firstName} ${
									this.state.activeUser.lastName
							  }`
							: ''
					}
				/>
				<div className="messages-line" />

				<div className="columns is-gapless is-marginless is-fullheight">
					<div className="column is-one-fifth has-background-primary">
						<section />

						{this.renderEmployees(this.props.usersList)}
					</div>

					<div className="column has-background-white">
						<section />
						{this.renderMessages(this.props.messagesList)}
						<MessagingBar />
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		usersList: state.users.list,
		messagesList: state.messages.list
	};
}

export default connect(mapStateToProps, actions)(Messages);
