import React from 'react';
import { Field, reduxForm } from 'redux-form';

import empty from '../../img/empty.png';

const validate = values => {
	const errors = {
		firstName: null,
		lastName: null,
		address: null,
		phoneNumber: null,
		dob: null,
		social: null,
		companyName: null,
		memberName: null,
		memberId: null,
		groupNumber: null,
		roomNumber: null,
		buildingNumber: null,
	};

	Object.keys(errors).forEach(key => {
		errors[key] = !values[key] ? 'Required' : null;
	});

	return errors;
};

const Input = ({ input, placeholder, label, meta: { touched, error } }) => (
	<div className="field">
		<div className="control">
			<label className="is-size-7">{label}</label>
			<input
				{...input}
				placeholder={placeholder}
				type="text"
				className={`input ${touched && error ? 'is-danger' : ''}`}
			/>
			{touched && error && <p className="help is-danger">{error}</p>}
		</div>
	</div>
);

let AddEditPatient = props => {
	const { handleSubmit, submitting } = props;

	return (
		<form onSubmit={handleSubmit(values => props.onFormSubmit(values))}>
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
					<Field name="address" component={Input} label="Address" />
					<div className="field is-horizontal">
						<div className="field-body">
							<Field
								name="phoneNumber"
								component={Input}
								label="Phone Number"
								placeholder="(_ _ _) - _ _ _ - _ _ _ _"
							/>
							<Field
								name="dob"
								component={Input}
								label="DOB"
								placeholder="MM-DD-YYYY"
							/>
							<Field
								name="social"
								component={Input}
								label="SSN"
							/>
						</div>
					</div>
				</div>
				<div className="column">
					<figure className="image is-128x128 add-edit-patient-image">
						<img src={empty} alt="patient" />
					</figure>

					<div className="field">
						<div className="control">
							<input className="file-input" type="file" />
							<a
								className={`button is-primary`}
								onClick={() => {
									this.refs.file.click();
								}}
							>
								Upload Picture
							</a>
						</div>
					</div>
				</div>
			</div>
			<h6 className="is-size-6">Insurance Information</h6>
			<div className="field is-horizontal">
				<div className="field-body">
					<Field
						name="companyName"
						component={Input}
						label="Company Name"
					/>
					<Field
						name="memberName"
						component={Input}
						label="Member Name"
					/>
					<Field
						name="memberId"
						component={Input}
						label="Member ID"
					/>

					<Field
						name="groupNumber"
						component={Input}
						label="Group Number"
					/>
				</div>
			</div>
			<h6 className="is-size-6">Hospital Information</h6>
			<div className="columns">
				<div className="column is-half">
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
			</div>
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
};

AddEditPatient = reduxForm({
	// a unique name for the form
	form: 'patient',
	validate,
})(AddEditPatient);

export default AddEditPatient;
