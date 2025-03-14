import { Input, Select } from '@prism/dropcloth';
import { useState } from 'react';
import { type Selections } from '../../types';
import { states } from '../utils/statesUtils';

type Props = {
	defaultValues: {
		address1: string;
		address2: string;
		city: string;
		state: string;
		zip: string;
	};
	onChange: (value: any) => void;
	selections: Selections;
};

const addressRegex = /^[a-zA-Z0-9\s,.-]+$/;
const cityRegex = /^[a-zA-Z\s.-]+$/;
const zipRegex = /^\d{5}$/;

const DeliveryAddress = ({ onChange, selections }: Props) => {
	const [formData, setFormData] = useState({
		address1: selections.deliveryDetails?.address1 || '',
		address2: selections.deliveryDetails?.address2 || '',
		city: selections.deliveryDetails?.city || '',
		state: selections.deliveryDetails?.state || '',
		zip: selections.deliveryDetails?.zip || '',
	});

	const [errors, setErrors] = useState({
		address1: false,
		address2: false,
		city: false,
		state: false,
		zip: false,
	});

	const validateField = (name: string, value: string) => {
		switch (name) {
			case 'address1':
				return (
					value.length > 0 && value.length <= 100 && addressRegex.test(value)
				);
			case 'address2':
				return !value || (value.length <= 100 && addressRegex.test(value));
			case 'city':
				return value.length > 0 && value.length <= 50 && cityRegex.test(value);
			case 'zip':
				return zipRegex.test(value);
			default:
				return true;
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const newFormData = { ...formData, [name]: value };
		setFormData(newFormData);

		// Validate the field
		const isValid = validateField(name, value);
		setErrors((prev) => ({
			...prev,
			[name]: !isValid,
		}));

		onChange(newFormData);
	};

	return (
		<div className="swdc-mr-[20px] swdc-mt-6 swdc-flex swdc-flex-shrink-0 swdc-flex-col swdc-gap-4">
			<h3 className="swdc-font-bold swdc-uppercase">Delivery Address</h3>
			<div className="swdc-gap-4 md:swdc-flex">
				<div className="swdc-w-full md:swdc-w-1/2">
					<p className="swdc-pb-1">Address line 1*</p>
					<Input
						error={errors.address1}
						name="address1"
						onChange={handleInputChange}
						value={formData.address1}
					/>
					{errors.address1 && (
						<span className="swdc-text-sm swdc-text-[#93324C]">
							Please enter a valid street address
						</span>
					)}
				</div>

				<div className="swdc-mt-4 swdc-w-full md:swdc-mt-0 md:swdc-w-1/2">
					<p className="swdc-pb-1">Address line 2 (optional)</p>
					<Input
						error={errors.address2}
						name="address2"
						onChange={handleInputChange}
						value={formData.address2}
					/>
				</div>
			</div>

			<div className="swdc-flex-none swdc-gap-4 md:swdc-flex">
				<div className="swdc-w-full">
					<p className="swdc-pb-1">City*</p>
					<Input
						className="swdc-w-full md:swdc-w-[305px]"
						error={errors.city}
						name="city"
						onChange={handleInputChange}
						value={formData.city}
					/>
					{errors.city && (
						<span className="swdc-text-sm swdc-text-[#93324C]">
							Please enter a US city
						</span>
					)}
				</div>

				<div className="swdc-mt-4 swdc-flex swdc-gap-4 md:swdc-mt-0 md:swdc-flex-none">
					<div className="swdc-w-4/6 md:swdc-w-[180px]">
						<p className="swdc-pb-1">State/Territory*</p>
						<Select
							className="swdc-w-full md:swdc-w-[180px]"
							name="state"
							onChange={(e) => {
								const newFormData = { ...formData, state: e.target.value };
								setFormData(newFormData);
								onChange(newFormData);
							}}
							value={formData.state}
						>
							{states.map((state) => (
								<option key={state.value} value={state.value}>
									{state.label}
								</option>
							))}
						</Select>
					</div>

					<div className="swdc-w-2/6 md:swdc-w-[88px]">
						<p className="swdc-pb-1">Zip Code*</p>
						<Input
							name="zip"
							type="text"
							maxLength={5}
							pattern="\d{5}"
							onChange={handleInputChange}
							value={formData.zip}
							error={errors.zip}
							className="swdc-w-full md:swdc-w-[88px]"
						/>
						{errors.zip && (
							<span className="swdc-text-sm swdc-text-[#93324C]">
								Enter 5 digits
							</span>
						)}
					</div>
				</div>
			</div>
			<p className="swdc-text-sm">
				No address?{' '}
				<a href="#" className="swdc-ml-1 swdc-font-medium hover:swdc-underline">
					Set your delivery spot on a map.
				</a>
			</p>
		</div>
	);
};

export default DeliveryAddress;
