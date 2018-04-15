import React from 'react';

const MessagesHeader = props => (
	<div className="columns is-gapless is-marginless">
		<div className="column is-one-fifth has-background-primary">
			<section className="has-padding">
				<div className="field">
					<div className="control has-icons-right">
						<input
							className="input has-background-white"
							type="text"
						/>
						<span className="icon is-small is-right">
							<i className="fas fa-search fa-xs" />
						</span>
					</div>
				</div>
			</section>
		</div>
		<div className="column has-background-white ">
			<nav className="level is-fullheight has-padding">
				<div className="level-left">
					<p className="title is-6 level-item">{props.name}</p>
				</div>
			</nav>
		</div>
	</div>
);

export default MessagesHeader;
