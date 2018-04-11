import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../actions';

import empty from '../../img/empty.png';

class AddEditPatient extends Component {
	constructor(props) {
		super(props);

		this.state = {
			picture: null,
			completed: false,
			isLoading: false,
			errors: {},
		};
	}

	handleSubmit(e) {
		e.preventDefault();

		this.setState({ isLoading: true });

		const firstName = this.refs.firstName.value;
		const lastName = this.refs.lastName.value;
		const address = this.refs.address.value;
		const phoneNumber = this.refs.phoneNumber.value;
		const dob = this.refs.dob.value;
		const social = this.refs.social.value;
		const companyName = this.refs.companyName.value;
		const memberName = this.refs.memberName.value;
		const memberId = this.refs.memberId.value;
		const groupNumber = this.refs.groupNumber.value;
		const roomNumber = this.refs.roomNumber.value;
		const buildingNumber = this.refs.buildingNumber.value;

		if (
			!firstName ||
			!lastName ||
			!phoneNumber ||
			!address ||
			!dob ||
			!social ||
			!companyName ||
			!memberName ||
			!memberId ||
			!groupNumber ||
			!roomNumber ||
			!buildingNumber
		) {
			return this.setState({
				isLoading: false,
				errors: {
					...this.state.errors,
					firstName: !firstName,
					lastName: !lastName,
					phoneNumber: !phoneNumber,
					address: !address,
					dob: !dob,
					social: !social,
					companyName: !companyName,
					memberName: !memberName,
					memberId: !memberId,
					groupNumber: !groupNumber,
					roomNumber: !roomNumber,
					buildingNumber: !buildingNumber,
					message: 'The fields in red are required',
				},
			});
		}

		this.props
			.addPatient({
				firstName,
				lastName,
				address,
				phoneNumber,
				dob,
				social,
				healthInsurance: {
					companyName,
					memberName,
					memberId,
					groupNumber,
				},
				roomNumber,
				buildingNumber,
			})
			.then(res => {
				if (!res.error)
					this.setState({ completed: true, isLoading: false });
			});
	}

	handleFile(e) {
		this.setState({ errors: {} });

		function getExtension(filename) {
			const parts = filename.split('.');
			return parts[parts.length - 1];
		}

		function isImage(filename) {
			const ext = getExtension(filename);
			switch (ext.toLowerCase()) {
				case 'jpg':
				case 'gif':
				case 'bmp':
				case 'png':
					//etc
					return true;

				default:
					return false;
			}
		}

		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('file', file);

		if (!isImage(file.name)) {
			return this.setState({
				errors: {
					message: 'The selected file is not a supported image',
				},
			});
		}

		this.setState({ isUploading: true });

		this.props.uploadImage(formData).then(action => {
			this.setState({
				isUploading: false,
				picture: action.payload.data.filename,
			});
		});
	}

	renderFileName() {
		if (this.state.isUploading) {
			return (
				<span className="file-name vd-file-name">
					<div className="loader" />
				</span>
			);
		}

		if (this.state.picture) {
			return (
				<span className="file-name vd-file-name">
					<span className="icon has-text-primary">
						<i className="fa fa-check" />
					</span>
				</span>
			);
		}

		return null;
	}

	render() {
		if (this.state.completed) return <Redirect to="/patients" />;

		return (
			<section className="section">
				<div className="container">
					<h3 className="title is-3 has-text-centered">
						New Patient
					</h3>
					<div className="card add-edit-patient-form">
						<div className="card-content">
							<form
								className="form"
								onSubmit={this.handleSubmit.bind(this)}
							>
								<h5 className="is-size-5">
									Personal Information
								</h5>
								<br />
								<div className="field is-horizontal">
									<div className="field-body">
										<div className="field">
											<div className="control">
												<label className="is-size-7">
													First Name
												</label>
												<input
													className={`input ${
														this.state.errors
															.firstName
															? 'is-danger'
															: ''
													}`}
													ref="firstName"
													type="text"
												/>
											</div>
										</div>
										<div className="field">
											<div className="control">
												<label className="is-size-7">
													Last Name
												</label>
												<input
													className={`input ${
														this.state.errors
															.lastName
															? 'is-danger'
															: ''
													}`}
													ref="lastName"
													type="text"
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="columns">
									<div className="column">
										<div className="field">
											<div className="control">
												<label className="is-size-7">
													Address
												</label>
												<input
													className={`input ${
														this.state.errors
															.address
															? 'is-danger'
															: ''
													}`}
													ref="address"
													type="text"
												/>
											</div>
										</div>
										<div className="field is-horizontal">
											<div className="field-body">
												<div className="field">
													<div className="control">
														<label className="is-size-7">
															Phone Number
														</label>
														<input
															className={`input ${
																this.state
																	.errors
																	.phoneNumber
																	? 'is-danger'
																	: ''
															}`}
															ref="phoneNumber"
															type="text"
															placeholder="(_ _ _) - _ _ _ - _ _ _ _"
														/>
													</div>
												</div>
												<div className="field">
													<div className="control">
														<label className="is-size-7">
															DOB
														</label>
														<input
															className={`input ${
																this.state
																	.errors.dob
																	? 'is-danger'
																	: ''
															}`}
															ref="dob"
															type="text"
															placeholder="MM-DD-YYYY"
														/>
													</div>
												</div>
												<div className="field">
													<div className="control">
														<label className="is-size-7">
															SSN
														</label>
														<input
															className={`input ${
																this.state
																	.errors
																	.social
																	? 'is-danger'
																	: ''
															}`}
															ref="social"
															type="text"
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="column has-text-centered">
										<figure className="image is-128x128 add-edit-patient-image">
											<img src={empty} alt="patient" />
										</figure>

										<div className="field">
											<div className="control">
												<input
													className="file-input"
													type="file"
													ref="file"
													onChange={this.handleFile.bind(
														this,
													)}
												/>
												<a
													className={`button is-primary ${
														this.state.isUploading
															? 'is-loading'
															: ''
													}`}
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
								<h5 className="is-size-5">
									Insurance Information
								</h5>
								<br />
								<div className="field is-horizontal">
									<div className="field-body">
										<div className="field">
											<div className="control">
												<label className="is-size-7">
													Company Name
												</label>
												<input
													className={`input ${
														this.state.errors
															.companyName
															? 'is-danger'
															: ''
													}`}
													ref="companyName"
													type="text"
												/>
											</div>
										</div>
										<div className="field">
											<div className="control">
												<label className="is-size-7">
													Member Name
												</label>
												<input
													className={`input ${
														this.state.errors
															.memberName
															? 'is-danger'
															: ''
													}`}
													ref="memberName"
													type="text"
												/>
											</div>
										</div>
										<div className="field">
											<div className="control">
												<label className="is-size-7">
													Member ID
												</label>
												<input
													className={`input ${
														this.state.errors
															.memberId
															? 'is-danger'
															: ''
													}`}
													ref="memberId"
													type="text"
												/>
											</div>
										</div>
										<div className="field">
											<div className="control">
												<label className="is-size-7">
													Group Number
												</label>
												<input
													className={`input ${
														this.state.errors
															.groupNumber
															? 'is-danger'
															: ''
													}`}
													ref="groupNumber"
													type="text"
												/>
											</div>
										</div>
									</div>
								</div>
								<br />
								<h5 className="is-size-5">
									Hospital Information
								</h5>
								<br />
								<div className="field is-grouped">
									<div className="control">
										<label className="is-size-7">
											Room Number
										</label>
										<input
											className={`input ${
												this.state.errors.roomNumber
													? 'is-danger'
													: ''
											}`}
											ref="roomNumber"
											type="text"
										/>
									</div>
									<div className="control">
										<label className="is-size-7">
											Building Number
										</label>
										<input
											className={`input ${
												this.state.errors.buildingNumber
													? 'is-danger'
													: ''
											}`}
											ref="buildingNumber"
											type="text"
										/>
									</div>
								</div>
								<br />
								<div className="field is-grouped is-grouped-centered">
									<p className="control">
										<button
											type="submit"
											className={`button is-primary ${
												this.state.isLoading
													? 'is-loading'
													: ''
											}`}
										>
											Submit
										</button>
									</p>
									<p className="control">
										<a className="button is-light">
											Cancel
										</a>
									</p>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default connect(null, actions)(AddEditPatient);
