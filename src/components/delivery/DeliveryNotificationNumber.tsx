import { Checkbox, Input } from '@prism/dropcloth';
import { useState } from 'react';
import { type FulfillmentSelections } from '../../types';
import DetailTooltip from '../global/tooltips/DetailTooltip';
import { phoneRegex } from '../utils/regexUtils';

type Props = {
	defaultValue: string;
	onChange: (phone: string) => void;
	selections: FulfillmentSelections;
	title?: string;
};

const formatPhoneNumber = (value: string) => {
	const numbers = value.replace(/\D/g, '');
	if (numbers.length <= 3) return numbers;
	if (numbers.length <= 6)
		return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
	return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
};

const DeliveryNotificationNumber = ({ onChange, selections, title }: Props) => {
	const [error, setError] = useState(false);
	const [phone, setPhone] = useState(selections.deliveryDetails?.phone || '');

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formattedNumber = formatPhoneNumber(e.target.value);
		onChange(formattedNumber);
		setError(!phoneRegex.test(formattedNumber));
		setPhone(formattedNumber);
	};

	return (
		<>
			<div className='swdc-mt-6 swdc-items-center md:swdc-flex'>
				<h3 className='swdc-text-base swdc-font-bold swdc-uppercase'>
					{title}
				</h3>
				<DetailTooltip text='This is required in case we need to contact you with questions about your delivery.' />
			</div>
			<p className='swdc-my-1'>Phone number*</p>
			<Input
				value={phone}
				onChange={handlePhoneChange}
				error={error}
				className='swdc-w-full md:swdc-w-[300px]'
			/>
			{error && (
				<div className='swdc-mt-1 swdc-text-sm swdc-text-[#93324C]'>
					Please enter a valid phone number
				</div>
			)}
			<div className='swdc-mt-2 swdc-flex'>
				<Checkbox name='sms-alerts' value='enabled'>
					Please send me text alerts for this order
				</Checkbox>
			</div>
			<p className='swdc-mt-1 swdc-text-sm'>
				We&apos;ll only text you updates for this order. Standard text messaging
				rates apply.
				<br />
				See our{' '}
				<a href='#' className='swdc-text-[#2F2F30] swdc-underline'>
					Privacy Policy
				</a>{' '}
				for details
			</p>
		</>
	);
};

export default DeliveryNotificationNumber;
