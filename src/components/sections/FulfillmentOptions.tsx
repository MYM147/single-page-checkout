import { useState } from 'react';
import { type Selections } from '../../types';
import SectionTitle from '../global/SectionTitle';
import DeliveryFulfillment from './subsections/DeliveryFulfillment';
import OrderSummaryDetails from './subsections/OrderSummaryDetails';
import PickupFulfillment from './subsections/PickupFulfillment';
import PickupOrDeliverySelector from './subsections/PickupOrDeliverySelector';

type Props = {
	className?: string;
	isExpanded: boolean;
	onContinue: () => void;
	onEdit: () => void;
	onSelectionsChange: (selections: Selections) => void;
	pickupDate?: string;
	pickupDateSelection?: string;
	pickupPerson?: string;
	pickupPersonDetails?: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
	};
	selections: Selections;
};

const FulfillmentOptions = ({
	className,
	isExpanded,
	onContinue,
	onEdit,
	onSelectionsChange,
	selections,
}: Props) => {
	const [fulfillmentType, setFulfillmentType] = useState(() => {
		if (selections.deliveryDetails?.address1) return 'delivery';
		if (selections.pickupPerson) return 'pickup';
		return 'pickup';
	});
	const [isSaved, setIsSaved] = useState(false);

	return (
		<div
			className={`swdc-bg-[#fff] swdc-px-3 swdc-py-4 swdc-drop-shadow-md lg:swdc-pl-6 lg:swdc-pr-6 ${className} swdc-w-full`}
		>
			<SectionTitle
				onEdit={() => {
					setIsSaved(false);
					onEdit();
				}}
				title="Fulfillment Options"
				showEdit={isSaved}
			/>

			{isExpanded && (
				<>
					<PickupOrDeliverySelector
						defaultValue={fulfillmentType}
						name2="pickup"
						name="pickup"
						onSelect={setFulfillmentType}
						text2="Standard or rush delivery available"
						text="Ready in as little as 2 hours"
						title2="Delivery"
						title="Pickup"
						value2="delivery"
						value="pickup"
					/>
					{fulfillmentType === 'pickup' ? (
						<PickupFulfillment
							onContinue={onContinue}
							onSelectionsChange={onSelectionsChange}
							selections={selections}
							setIsSaved={setIsSaved}
						/>
					) : (
						<DeliveryFulfillment
							onContinue={onContinue}
							onSelectionsChange={onSelectionsChange}
							selections={selections}
							setIsSaved={setIsSaved}
						/>
					)}
				</>
			)}
			{!isExpanded && (
				<OrderSummaryDetails
					deliveryAddress={`${selections.deliveryDetails.address1}${selections.deliveryDetails.address2 ? `, ${selections.deliveryDetails.address2}` : ''}, ${selections.deliveryDetails.city}, ${selections.deliveryDetails.state} ${selections.deliveryDetails.zip}`}
					deliveryDate={selections.deliveryDate}
					deliveryPhone={selections.deliveryDetails.phone}
					deliveryTime={selections.deliveryTime}
					fulfillmentType={fulfillmentType}
					pickupDate={selections.pickupDate}
					pickupDateTime={selections.pickupDateSelection}
					pickupPerson={selections.pickupPerson}
					pickupPersonDetails={selections.pickupPersonDetails}
					pickupPhone={selections.pickupPersonDetails?.phone}
					specialInstructions={selections.specialInstructions}
				/>
			)}
		</div>
	);
};

export default FulfillmentOptions;
