import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';

import * as actions from '../../actions';
import Loader from '../loader';

import { Input, Select } from '../redux-fields';

const validate = values => {
	const errors = {
		date: null,
		in: null,
		out: null,
	};

	Object.keys(errors).forEach(
		key => (errors[key] = !values[key] ? 'Required' : null),
	);

	return errors;
};

class LogHours extends Component {
	renderShifts(employeeType) {
		if (employeeType !== 'nurse') return null;

		return (
			<Field
				name="shift"
				component={Select}
				label="Shift Type"
				options={[
					{ value: '1st Shift', label: '1st Shift' },
					{ value: '2nd Shift', label: '2nd Shift' },
					{ value: '3rd Shift', label: '3rd Shift' },
					{ value: 'Floating Shift', label: 'Floating Shift' },
				]}
			/>
		);
	}

	onFormSubmit(values) {
		const a = moment(`${values.date}T${values.in}`);
		const b = moment(`${values.date}T${values.out}`);

		const hours = {
			amount: b.diff(a, 'hours'),
			shift: `${values.shift ? `${values.shift}` : ''}`,
			start: `${values.date}T${values.in}`,
			end: `${values.date}T${values.out}`,
		};

		return this.props.addHours(hours).then(() => this.props.history.go(-1));
	}

	render() {
		const { handleSubmit, submitting } = this.props;

		if (!this.props.me) return <Loader />;

		return (
			<section className="section">
				<div className="container">
					<h3 className="title is-3 has-text-centered">Log Hours</h3>
					<div className="card log-hours">
						<div className="card-content">
							<form
								onSubmit={handleSubmit(values =>
									this.onFormSubmit(values),
								)}
							>
								{this.renderShifts(this.props.me.type)}

								<Field
									name="date"
									component={Input}
									label="Date"
									type="date"
								/>
								<div className="field is-horizontal">
									<div className="field-body">
										<Field
											name="in"
											component={Input}
											label="In"
											type="time"
										/>
										<Field
											name="out"
											component={Input}
											label="Out"
											type="time"
										/>
									</div>
								</div>
								<br />
								<button
									type="submit"
									className={`button is-primary is-fullwidth ${
										submitting ? 'is-loading' : ''
									}`}
								>
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

function mapStateToProps(state) {
	return {
		me: state.users.me,
		initialValues: {
			date: moment().format('YYYY-MM-DD'),
		},
	};
}

LogHours = reduxForm({
	form: 'logHours',
	validate,
})(LogHours);

export default withRouter(connect(mapStateToProps, actions)(LogHours));
