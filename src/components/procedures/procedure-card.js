import React from 'react';

const ProcedureCard = props => {
	return (
		<div className="card">
			<div className="card-content has-text-left">
				<p>
					<strong>Procedure Name</strong>
				</p>
				<br />
				<div className="columns">
					<div className="column is-three-quarters">
						<p>
							<strong>Description: </strong>
							<br />
							Curabitur arcu erat, accumsan id imperdiet et,
							porttitor at sem. Curabitur aliquet quam id dui
							posuere blandit. Vestibulum ac diam sit amet quam
							vehicula elementum sed sit amet dui. Pellentesque in
							ipsum id orci porta dapibus. Praesent sapien massa,
							convallis a pellentesque nec, egestas non nisi.
							Proin eget tortor risus. Cras ultricies ligula sed
							magna dictum porta. Praesent sapien massa, convallis
							a pellentesque nec, egestas non nisi. Lorem ipsum
							dolor sit amet, consectetur adipiscing elit.
						</p>
					</div>
					<div className="column">
						<p>
							<strong>Doctor: </strong> Doctor Name
							<br />
							<strong>Date: </strong> 10/10/13
							<br />
							<strong>Category: </strong> Cardiology
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProcedureCard;
