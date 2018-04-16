import React from 'react';

export const Input = ({
	input,
	placeholder,
	label,
	type,
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

export const Select = ({ input, options, label, meta: { touched, error } }) => (
	<div className="field">
		<label className="is-size-7">{label}</label>
		<div className="control">
			<div className={`select ${touched && error ? 'is-danger' : ''}`}>
				<select {...input} component="select">
					{options.map((o, index) => (
						<option key={index} value={o.value}>
							{o.label}
						</option>
					))}
				</select>
			</div>
			{touched && error && <p className="help is-danger">{error}</p>}
		</div>
	</div>
);

export const TextArea = ({
	input,
	placeholder,
	label,
	meta: { touched, error },
}) => (
	<div className="field">
		<div className="control">
			<label className="is-size-7">{label}</label>
			<textarea
				{...input}
				className={`textarea ${touched && error ? 'is-danger' : ''}`}
				placeholder={placeholder}
			/>
			{touched && error && <p className="help is-danger">{error}</p>}
		</div>
	</div>
);
