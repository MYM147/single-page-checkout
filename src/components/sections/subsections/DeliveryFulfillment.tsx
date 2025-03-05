import { Button } from '@prism/dropcloth';
import { useState } from 'react';
import { type Selections } from '../../../types';
import DateSelectMenu from '../../global/DateSelectMenu';
import DeliveryAddress from '../../global/DeliveryAddress';
import PickupOrDeliverySelector from '../../global/PickupOrDeliverySelector';
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
	const [deliverySelections, setDeliverySelections] = useState(selections);

	const isFormValid = () => {
		return (
			deliverySelections.deliveryTimeSlot &&
			deliverySelections.deliveryDetails?.address1
		);
	};

	return (
		<>
			<div className="swdc-mt-6">
				<p className="swdc-text-sm"> * Required</p>
			</div>

			<DeliveryAddress />

			<DateSelectMenu
				title="Delivery Date"
				selectedDate={selections.deliveryDateTime}
				onDateSelect={(date) => {
					onSelectionsChange({
						...selections,
						deliveryDateTime: date,
					});
				}}
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
