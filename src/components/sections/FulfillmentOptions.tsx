import { useState } from 'react';
import { type Selections } from '../../types';
import PickupOrDeliverySelector from '../global/PickupOrDeliverySelector';
import SectionTitle from '../global/SectionTitle';
import DeliveryFulfillment from './subsections/DeliveryFulfillment';
import OrderSummaryDetails from './subsections/OrderSummaryDetails';
import PickupFulfillment from './subsections/PickupFulfillment';

type Props = {
	className?: string;
	isExpanded: boolean;
	onContinue: () => void;
	onEdit: () => void;
	onSelectionsChange: (selections: Selections) => void;
	selections: Selections;
	pickupDate?: string;
	pickupDateSelection?: string;
	pickupPerson?: string;
	pickupPersonDetails?: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
	};
};

const FulfillmentOptions = ({
	className,
	isExpanded,
	onContinue,
	onEdit,
	onSelectionsChange,
	selections,
}: Props) => {
	const [fulfillmentType, setFulfillmentType] = useState('pickup');
	const [isSaved, setIsSaved] = useState(false);

	return (
		<div
			className={`swdc-bg-[#fff] swdc-px-3 swdc-py-4 swdc-drop-shadow-md lg:swdc-pl-6 lg:swdc-pr-6 ${className} swdc-w-full`}
		>
			<SectionTitle
				title="Fulfillment Options"
				showEdit={isSaved}
				onEdit={() => {
					setIsSaved(false);
					onEdit();
				}}
			/>

			{isExpanded && (
				<>
					<PickupOrDeliverySelector
						name="pickup"
						name2="pickup"
						text="Ready in as little as 2 hours"
						text2="Standard or rush delivery available"
						title="Pickup"
						title2="Delivery"
						value="pickup"
						value2="delivery"
						onSelect={setFulfillmentType}
					/>
					{fulfillmentType === 'pickup' ? (
						<PickupFulfillment
							selections={selections}
							onSelectionsChange={onSelectionsChange}
							onContinue={onContinue}
							setIsSaved={setIsSaved}
						/>
					) : (
						<DeliveryFulfillment
							selections={selections}
							onSelectionsChange={onSelectionsChange}
							onContinue={onContinue}
							setIsSaved={setIsSaved}
						/>
					)}
				</>
			)}
			{!isExpanded && (
				<OrderSummaryDetails
					fulfillmentType={fulfillmentType}
					pickupDate={selections.pickupDate}
					pickupDateTime={selections.pickupDateSelection}
					pickupPerson={selections.pickupPerson}
					pickupPersonDetails={selections.pickupPersonDetails}
					pickupPhone={selections.pickupPersonDetails?.phone}
					deliveryAddress={selections.deliveryAddress}
					deliveryDateTime={selections.deliveryDateTime}
					deliveryPhone={selections.deliveryDetails?.phone}
					specialInstructions={selections.specialInstructions}
				/>
			)}
		</div>
	);
};

export default FulfillmentOptions;
