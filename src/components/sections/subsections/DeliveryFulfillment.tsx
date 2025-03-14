import { Button } from '@prism/dropcloth';
import { useState } from 'react';
import { type Selections } from '../../../types';
import DeliveryAddress from '../../Delivery/DeliveryAddress';
import DeliveryNotificationNumber from '../../Delivery/DeliveryNotificationNumber';
import DateSelectMenu from '../../global/DateSelectMenu';
import SpecialInstructions from '../../global/SpecialInstructions';

type Props = {
	onContinue: () => void;
	onSelectionsChange: (selections: Selections) => void;
	selections: Selections;
	setIsSaved: (value: boolean) => void;
};

const DeliveryFulfillment = ({
	onContinue,
	onSelectionsChange,
	selections,
	setIsSaved,
}: Props) => {
	const [formData] = useState({
		address1: selections.deliveryDetails?.address1 || '',
		address2: selections.deliveryDetails?.address2 || '',
		city: selections.deliveryDetails?.city || '',
		state: selections.deliveryDetails?.state || '',
		zip: selections.deliveryDetails?.zip || '',
		phone: selections.deliveryDetails?.phone || '',
	});

	const [, setLoading] = useState(false); // Loading state

	const handleAddressChange = (addressData: any) => {
		onSelectionsChange({
			...selections,
			deliveryDetails: {
				...selections.deliveryDetails,
				...addressData,
			},
		});

		// Check if the address is valid
		if (isAddressValid()) {
			setLoading(true); // Start loading
			setTimeout(() => {
				setLoading(false); // Stop loading after a delay (simulate loading)
			}, 10000); // Simulate a 1 second loading time
		}
	};

	const isAddressValid = () => {
		return (
			selections.deliveryDetails?.address1 &&
			selections.deliveryDetails?.city &&
			selections.deliveryDetails?.state &&
			selections.deliveryDetails?.zip
		);
	};

	const handlePhoneChange = (phone: string) => {
		onSelectionsChange({
			...selections,
			deliveryDetails: {
				...selections.deliveryDetails,
				phone,
			},
		});
	};

	const isFormValid = () => {
		const addressValid = Boolean(
			selections.deliveryDetails?.address1 &&
				selections.deliveryDetails?.city &&
				selections.deliveryDetails?.state &&
				selections.deliveryDetails?.zip
		);

		const dateValid = selections.deliveryDate;
		const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
		const phoneValid = phoneRegex.test(selections.deliveryDetails?.phone);
		const timeValid = selections.deliveryTimeSlot;

		return addressValid && phoneValid && dateValid && timeValid;
	};

	return (
		<>
			<div className="swdc-mt-6">
				<p className="swdc-text-sm"> * Required</p>
			</div>

			<DeliveryAddress
				defaultValues={formData}
				onChange={handleAddressChange}
				selections={selections}
			/>

			<div className="swdc-relative">
				<DateSelectMenu
					disabled={!isAddressValid()}
					onDateSelect={(date) => {
						onSelectionsChange({
							...selections,
							deliveryDate: date,
							deliveryTimeSlot: 'rush', // Set this to indicate rush delivery
							deliveryTime: '8AM - 11AM', // Set the time display for rush delivery
						});
					}}
					onSelectionsChange={onSelectionsChange}
					rush={true}
					selectedDate={selections.deliveryDate}
					selectedTimeSlot={selections.deliveryTimeSlot}
					selections={selections}
					title="Delivery Date"
				/>
			</div>

			<DeliveryNotificationNumber
				defaultValue={selections.deliveryDetails?.phone}
				onChange={handlePhoneChange}
				selections={selections}
				title="Delivery Notification Number"
			/>

			<SpecialInstructions
				label=""
				maxLength={100}
				onChange={(value) => {
					onSelectionsChange({
						...selections,
						specialInstructions: value,
					});
				}}
				text="If you have any special instructions for delivery, add them here."
				title="Special Instructions (Optional)"
				value={selections.specialInstructions}
			/>

			<Button
				className="swdc-mt-6"
				disabled={!isFormValid()}
				onClick={() => {
					onContinue();
					setIsSaved(true);
				}}
			>
				Save and Continue
			</Button>
		</>
	);
};

export default DeliveryFulfillment;
