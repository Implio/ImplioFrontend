import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import routes from '../../../config/routes';
import { Input, Select, TextArea } from '../redux-fields';

const validate = values => {
	const errors = {
		patientId: null,
		procedureName: null,
		date: null,
		category: null,
		doctorId: null,
		description: null,
	};

	Object.keys(errors).forEach(
		key => (errors[key] = !values[key] ? 'Required' : null),
	);

	return errors;
};

class AddEditProcedureForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isUploadingFile: false,
			fields: {
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
				<h6 className="is-size-6">Procedure Information</h6>
				<div className="field is-horizontal">
					<div className="field-body">
						<Field
							name="procedureName"
							label="Procedure Name"
							component={Input}
						/>
						<Field
							name="doctorId"
							options={[
								{ value: '', label: 'No Physician' },
								...this.props.doctors.map(d => ({
									value: d._id,
									label: `${d.firstName} ${d.lastName}`,
								})),
							]}
							label="Primary Physician"
							component={Select}
						/>
						<Field
							name="category"
							options={[
								{ value: '', label: 'No Category' },
								{ value: 'cardiology', label: 'Cardiology' },
								{ value: 'neurology', label: 'Neurology' },
								{ value: 'surgery', label: 'Surgery' },
								{ value: 'endoscopy', label: 'Endoscopy' },
								{ value: 'radiography', label: 'Radiography' },
								{ value: 'biopsy', label: 'Biopsy' },
								{ value: 'test', label: 'Lab Test' },
							]}
							label="Category"
							component={Select}
						/>
					</div>
				</div>

				<div className="field is-grouped">
					<Field
						name="date"
						label="Date"
						component={Input}
						placeholder="MM-DD-YYYY"
					/>
				</div>

				<Field
					name="description"
					label="Description"
					component={TextArea}
				/>

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

AddEditProcedureForm = reduxForm({
	form: 'patient',
	validate,
})(AddEditProcedureForm);

export default AddEditProcedureForm;
