import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import Loader from '../loader';

import MessagesHeader from './messages-header';
import EmployeeMessageCard from './employee-message-card';
import Conversation from './conversation';

class Messages extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeUser: null,
			search: ''
		};
	}

	selectEmployee(id) {
		this.setState({
			activeUser: this.props.usersList.find(user => user._id === id)
		});
	}

	handleSearch(search) {
		this.setState({
			search
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
					this.selectEmployee(user._id);
				}}
			/>
		));
	}

	render() {
		if (!this.props.usersList || !this.props.messagesList || !this.props.me)
			return <Loader />;

		const messages = this.props.messagesList.map(m => {
			const fromUser = this.props.usersList.find(
				u => u._id === m.fromUserId
			);

			return {
				...m,
				fromName: `${fromUser.firstName} ${fromUser.lastName}`
			};
		});

		return (
			<div className="fixed-height">
				<MessagesHeader
					handleSearch={this.handleSearch.bind(this)}
					name={
						this.state.activeUser
							? `${this.state.activeUser.firstName} ${
									this.state.activeUser.lastName
							  }`
							: ''
					}
				/>
				<div className="messages-line" />

				<div className="columns is-fullheight is-gapless is-marginless">
					<div className="column is-one-fifth has-background-primary">
						{this.renderEmployees(
							this.props.usersList.filter(
								u =>
									this.state.search === ''
										? u._id !== this.props.me._id
										: u._id !== this.props.me._id &&
										  u.firstName
												.toUpperCase()
												.includes(
													this.state.search.toUpperCase()
												)
							)
						)}
					</div>

					<div className="column overflow-scroll has-background-white">
						{this.state.activeUser ? (
							<Conversation
								messagesList={messages}
								activeUser={this.state.activeUser}
								addMessage={this.props.addMessage}
							/>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		usersList: state.users.list,
		messagesList: state.messages.list,
		me: state.users.me
	};
}

export default connect(mapStateToProps, actions)(Messages);
