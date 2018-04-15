import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import routes from '../../../config/routes';
import { Input, Select } from '../redux-fields';

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
		primaryPhysician: null,
		groupNumber: null,
	};

	Object.keys(errors).forEach(
		key => (errors[key] = !values[key] ? 'Required' : null),
	);

	if (values.active) {
		if (!values.roomNumber)
			errors.roomNumber = 'Required if patient is active';

		if (!values.buildingNumber)
			errors.buildingNumber = 'Required if patient is active';
	}

	return errors;
};

class AddEditPatientForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isUploading: false,
			fields: {
				picture: props.initialValues.picture,
				documents: props.initialValues.documents || [],
			},
		};
	}

	handleRemoveDocument(index) {
		this.setState({
			fields: {
				...this.state.fields,
				documents: this.state.fields.documents.filter(
					(doc, i) => index !== i,
				),
			},
		});
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

	handleDocument(e) {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('file', file);

		this.setState({ isUploadingFile: true });

		this.props.uploadFile(formData).then(action => {
			this.setState({
				isUploadingFile: false,
				fields: {
					...this.state.fields,
					documents: [
						...this.state.fields.documents,
						action.payload.data.filename,
					],
				},
			});
		});
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
							name="address"
							component={Input}
							label="Address"
						/>
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
				<h6 className="is-size-6">Physician Information</h6>
				<div className="columns">
					<div className="column is-half">
						<div className="field is-horizontal">
							<div className="field-body">
								<Field
									name="primaryPhysician"
									component={Select}
									label="Primary Physician"
									options={[
										{ value: '', label: 'No Physician' },
										...this.props.doctors.map(doc => ({
											value: doc._id,
											label: `${doc.firstName} ${
												doc.lastName
											}`,
										})),
									]}
								/>
								<Field
									name="consultingPhysician"
									component={Select}
									label="Consulting Physician"
									options={[
										{ value: '', label: 'No Physician' },
										...this.props.doctors.map(doc => ({
											value: doc._id,
											label: `${doc.firstName} ${
												doc.lastName
											}`,
										})),
									]}
								/>
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
						<label className="checkbox is-size-7">
							<Field
								name="active"
								id="active"
								component="input"
								type="checkbox"
							/>
							{'  '}Active
						</label>
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
				<h6 className="is-size-6">Documents</h6>
				<ul>
					{this.state.fields.documents.map((doc, index) => (
						<li key={index}>
							<a
								href={`${routes.files}/${doc}`}
								target="_blank"
							>{`${doc} `}</a>
							<a
								className="has-text-danger"
								onClick={() => this.handleRemoveDocument(index)}
							>
								X
							</a>
						</li>
					))}
				</ul>
				<br />
				<div className="field">
					<div className="control">
						<a
							className={`button is-primary ${
								this.state.isUploadingFile ? 'is-loading' : ''
							}`}
						>
							<input
								className="file-input"
								type="file"
								onChange={this.handleDocument.bind(this)}
							/>
							Upload Document
						</a>
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
	}
}

AddEditPatientForm = reduxForm({
	form: 'patient',
	validate,
})(AddEditPatientForm);

export default AddEditPatientForm;
