import { Input } from '@prism/dropcloth';
import { useState } from 'react';

// Text only regex for names
const nameRegex = /^[a-zA-Z\s]*$/;
// Email regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Phone regex for format (XXX) XXX-XXXX
const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

type Props = {
	onPersonDetailsChange: (details: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
	}) => void;
	selectedPerson:
		| {
				firstName: string;
				lastName: string;
				email: string;
				phone: string;
		  }
		| undefined;
};

const PickupPersonMenu = ({
	onPersonDetailsChange,
	selectedPerson = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
	},
}: Props) => {
	const [formData, setFormData] = useState({
		firstName: selectedPerson.firstName,
		lastName: selectedPerson.lastName,
		email: selectedPerson.email,
		phone: selectedPerson.phone,
	});

	const [errors, setErrors] = useState({
		firstName: false,
		lastName: false,
		email: false,
		phone: false,
	});

	const validateField = (name: string, value: string) => {
		switch (name) {
			case 'firstName':
			case 'lastName':
				return value.length <= 20 && nameRegex.test(value);
			case 'email':
				return emailRegex.test(value);
			case 'phone':
				return phoneRegex.test(value);
			default:
				return true;
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		// Format phone number if that's the field being changed
		let formattedValue = value;
		if (name === 'phone') {
			formattedValue = formatPhoneNumber(value);
		}

		// Update the form data with the new value
		setFormData((prev) => ({
			...prev,
			[name]: formattedValue,
		}));

		// Check if the field is valid and set error state
		const isValid = validateField(name, formattedValue);
		setErrors((prev) => ({
			...prev,
			[name]: !isValid,
		}));

		const newFormData = {
			...formData,
			[name]: formattedValue,
		};
		setFormData(newFormData);
		onPersonDetailsChange(newFormData);
	};

	const formatPhoneNumber = (value: string) => {
		const numbers = value.replace(/\D/g, '');
		if (numbers.length <= 3) return numbers;
		if (numbers.length <= 6)
			return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
		return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
	};

	return (
		<div className="swdc-mt-2 swdc-grid swdc-gap-2 md:swdc-grid-cols-2">
			<div>
				First Name *
				<br />
				<Input
					as="input"
					name="firstName"
					onChange={handleInputChange}
					value={formData.firstName}
					error={errors.firstName}
					className="swdc-w-full"
				/>
				{errors.firstName && (
					<span className="swdc-text-sm">Please enter letters only</span>
				)}
			</div>
			<div className="swdc-mt-2 md:swdc-mt-0">
				Last Name *
				<br />
				<Input
					as="input"
					name="lastName"
					onChange={handleInputChange}
					value={formData.lastName}
					error={errors.lastName}
					className="swdc-w-full"
				/>
				{errors.lastName && (
					<span className="swdc-text-sm">Please enter letters only</span>
				)}
			</div>
			<div className="swdc-mt-2 md:swdc-mt-0">
				Email Address *
				<br />
				<Input
					as="input"
					name="email"
					type="email"
					onChange={handleInputChange}
					value={formData.email}
					error={errors.email}
					className="swdc-w-full"
				/>
				{errors.email && (
					<span className="swdc-text-sm">
						Please enter a valid email address
					</span>
				)}
			</div>
			<div className="swdc-mt-2 md:swdc-mt-0">
				Phone Number *
				<br />
				<Input
					as="input"
					name="phone"
					onChange={handleInputChange}
					value={formData.phone}
					error={errors.phone}
					className="swdc-w-full"
				/>
				{errors.phone && (
					<span className="swdc-text-sm">
						Please enter a valid phone number
					</span>
				)}
			</div>
		</div>
	);
};

export default PickupPersonMenu;
