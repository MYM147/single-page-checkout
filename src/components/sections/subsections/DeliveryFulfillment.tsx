import { Button } from '@prism/dropcloth';
import { useState } from 'react';
import { type Selections } from '../../../types';
import DateSelectMenu from '../../global/DateSelectMenu';
import DeliveryAddress from '../../global/DeliveryAddress';
import DeliveryNotificationNumber from '../../global/DeliveryNotificationNumber';
import SpecialInstructions from '../../global/SpecialInstructions';

type Props = {
	selections: Selections;
	onSelectionsChange: (selections: Selections) => void;
	onContinue: () => void;
	setIsSaved: (value: boolean) => void;
};

const DeliveryFulfillment = ({
	selections,
	onSelectionsChange,
	onContinue,
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

	const handleAddressChange = (addressData: any) => {
		onSelectionsChange({
			...selections,
			deliveryDetails: {
				...selections.deliveryDetails,
				...addressData,
			},
		});
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

		const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
		const phoneValid = phoneRegex.test(selections.deliveryDetails?.phone);
		const dateValid = selections.deliveryDate;
		const timeValid = selections.deliveryTimeSlot;

		return addressValid && phoneValid && dateValid && timeValid;
	};

	const isAddressValid = () => {
		return (
			selections.deliveryDetails?.address1 &&
			selections.deliveryDetails?.city &&
			selections.deliveryDetails?.state &&
			selections.deliveryDetails?.zip
		);
	};

	return (
		<>
			<div className="swdc-mt-6">
				<p className="swdc-text-sm"> * Required</p>
			</div>

			<DeliveryAddress
				selections={selections}
				onChange={handleAddressChange}
				defaultValues={formData}
			/>

			<DateSelectMenu
				disabled={!isAddressValid()}
				onDateSelect={(date) => {
					onSelectionsChange({
						...selections,
						deliveryDate: date,
					});
				}}
				onSelectionsChange={(newSelections) => {
					onSelectionsChange({
						...selections,
						deliveryTimeSlot: newSelections.deliveryTimeSlot,
						deliveryTime:
							newSelections.deliveryTimeSlot === 'morning'
								? '8AM - NOON'
								: 'NOON - 5PM',
					});
				}}
				rush={true}
				selections={selections}
				selectedDate={selections.deliveryDate}
				selectedTimeSlot={selections.deliveryTimeSlot}
				title="Delivery Date &amp; Time"
			/>

			<DeliveryNotificationNumber
				defaultValue={selections.deliveryDetails?.phone}
				title="Delivery Notification Number"
				selections={selections}
				onChange={handlePhoneChange}
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
				onClick={() => {
					setIsSaved(true);
					const timeDisplay =
						selections.deliveryTimeSlot === 'morning'
							? '8AM - NOON'
							: 'NOON - 5PM';
					onSelectionsChange({
						...selections,
						deliveryTime: timeDisplay,
					});
					onContinue();
				}}
				className="swdc-mt-6"
				disabled={!isFormValid()}
			>
				Save and Continue
			</Button>
		</>
	);
};
export default DeliveryFulfillment;
