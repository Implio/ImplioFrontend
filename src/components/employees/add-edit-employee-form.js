import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import routes from '../../../config/routes';

import empty from '../../img/empty.png';

const validate = values => {
	const errors = {
		firstName: null,
		lastName: null,
		dob: null,
		social: null,
		title: null,
		roomNumber: null,
		buildingNumber: null,
	};

	Object.keys(errors).forEach(
		key => (errors[key] = !values[key] ? 'Required' : null),
	);

	if (values.password !== values.confirmPassword) {
		errors.confirmPassword = 'Passwords do not match';
	}

	return errors;
};

const Input = ({
	input,
	placeholder,
	type,
	label,
	meta: { touched, error },
}) => (
	<div className="field">
		<div className="control">
			<label className="is-size-7">{label}</label>
			<input
				{...input}
				placeholder={placeholder}
				type={type || 'text'}
				className={`input ${touched && error ? 'is-danger' : ''}`}
			/>
			{touched && error && <p className="help is-danger">{error}</p>}
		</div>
	</div>
);

class AddEditEmployeeForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isUploading: false,
			fields: {
				picture: props.initialValues.picture,
			},
		};
	}

	handleImage(e) {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('file', file);

		this.setState({ isUploading: true });

		this.props.uploadFile(formData).then(action => {
			this.setState({
				isUploading: false,
				fields: {
					...this.state.fields,
					picture: action.payload.data.filename,
				},
			});
		});
	}

	renderAdminOptions(isAdmin) {
		if (!isAdmin) return null;

		return (
			<div className="columns">
				<div className="column is-half">
					<h6 className="is-size-6">Admin Options</h6>
					<div className="field">
						<label className="is-size-7">Is Manager?</label>
						<div className="control">
							<div className="select">
								<Field name="isAdmin" component="select">
									<option value={false}>No</option>
									<option value={true}>Yes</option>
								</Field>
							</div>
						</div>
					</div>
					<div className="field">
						<label className="is-size-7">Manager</label>
						<div className="control">
							<div className="select">
								<Field name="managerId" component="select">
									<option value={null}>No manager</option>
									{this.props.managers.map(m => (
										<option key={m._id} value={m._id}>{`${
											m.firstName
										} ${m.lastName}`}</option>
									))}
								</Field>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	render() {
		const { handleSubmit, submitting } = this.props;

		return (
			<form
				onSubmit={handleSubmit(values =>
					this.props.onFormSubmit({
						...values,
						...this.state.fields,
					}),
				)}
			>
				<h6 className="is-size-6">Personal Information</h6>
				<div className="field is-horizontal">
					<div className="field-body">
						<Field
							name="firstName"
							component={Input}
							label="First Name"
						/>
						<Field
							name="lastName"
							component={Input}
							label="Last Name"
						/>
					</div>
				</div>
				<div className="columns">
					<div className="column">
						<Field
							name="social"
							component={Input}
							label="Last 4 digits of SSN"
						/>
						<div className="field is-horizontal">
							<div className="field-body">
								<Field
									name="dob"
									component={Input}
									label="DOB"
									placeholder="MM-DD-YYYY"
								/>
								<Field
									name="title"
									component={Input}
									label="Title"
								/>
							</div>
						</div>
						<div className="field">
							<label className="is-size-7">Room Type:</label>
							<div className="control">
								<div className="select">
									<Field name="roomType" component="select">
										<option value="D">
											Doctors Office
										</option>
										<option value="S">
											Specialization
										</option>
										<option value="E">Emergency</option>
										<option value="S">Surgery</option>
										<option value="N">Nurse Station</option>
										<option value="M">Miscellaneous</option>
									</Field>
								</div>
							</div>
						</div>
						<div className="field is-horizontal">
							<div className="field-body">
								<Field
									name="roomNumber"
									component={Input}
									label="Room Number"
								/>
								<Field
									name="buildingNumber"
									component={Input}
									label="Building Number"
								/>
							</div>
						</div>
					</div>
					<div className="column">
						<figure className="image is-128x128 add-edit-patient-image">
							<img
								src={
									this.state.fields.picture
										? `${routes.files}/${
												this.state.fields.picture
										  }`
										: empty
								}
								alt="patient"
							/>
						</figure>

						<div className="field">
							<div className="control">
								<a
									className={`button is-primary ${
										this.state.isUploading
											? 'is-loading'
											: ''
									}`}
								>
									<input
										className="file-input"
										type="file"
										accept=".jpg, .png, .jpeg"
										onChange={this.handleImage.bind(this)}
									/>
									Upload Picture
								</a>
							</div>
						</div>
					</div>
				</div>
				<h6 className="is-size-6">Password</h6>
				<div className="columns">
					<div className="column is-half">
						<Field
							name="password"
							component={Input}
							label={
								this.props.initialValues._id
									? 'Change Password'
									: 'New Password'
							}
							type="password"
						/>
						<Field
							name="confirmPassword"
							component={Input}
							label="Confirm Password"
							type="password"
						/>
					</div>
				</div>
				{this.renderAdminOptions(this.props.isAdmin)}
				<button
					type="submit"
					className={`button is-primary ${
						submitting ? 'is-loading' : ''
					}`}
				>
					Save
				</button>
			</form>
		);
	}
}

AddEditEmployeeForm = reduxForm({
	form: 'employee',
	validate,
})(AddEditEmployeeForm);

export default AddEditEmployeeForm;
