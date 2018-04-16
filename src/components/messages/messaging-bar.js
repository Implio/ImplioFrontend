import React, { Component } from 'react';

class MessagingBar extends Component {
	handleSubmit(e) {
		e.preventDefault();

		const message = this.refs.message.value;

		if (message) {
			this.props.addMessage({ message, toUserId: this.props.toUserId });
			this.refs.message.value = '';
		}
	}

	render() {
		return (
			<form
				className="stay-bottom"
				onSubmit={this.handleSubmit.bind(this)}
			>
				<div className="field has-background-white has-addons has-addons-centered has-padding">
					<p className="control full-width">
						<input
							className="input has-background-primary-light"
							type="text"
							ref="message"
							placeholder="Message"
						/>
					</p>
					<p className="control">
						<button className="button is-primary">Send</button>
					</p>
				</div>
			</form>
		);
	}
}

export default MessagingBar;
