import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	setExpanded,
	setFulfillmentType,
	setSaved,
	updateSelections,
} from '../../store/slices/fulfillmentSlice';
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
	selections: Selections;
};

// Container component that manages fulfillment type selection and displays appropriate forms
const FulfillmentOptions = ({ className, onContinue, onEdit }: Props) => {
	const dispatch = useAppDispatch();
	const { fulfillmentType, selections, isSaved, isExpanded } = useAppSelector(
		(state) => state.fulfillment
	);

	const handleSelectionsChange = (newSelections: Partial<Selections>) => {
		dispatch(updateSelections(newSelections));
	};

	const handleSetIsSaved = (value: boolean) => {
		dispatch(setSaved(value));
	};

	//Determines initial fulfillment type based on existing selections
	const handleFulfillmentTypeChange = (type: string) => {
		if (type === 'pickup' || type === 'delivery') {
			dispatch(setFulfillmentType(type));
		}
	};

	//Toggles between pickup and delivery fulfillment options
	const toggleExpanded = (value: boolean) => {
		dispatch(setExpanded(value));
	};

	const handleContinue = () => {
		dispatch(setExpanded(false));
		dispatch(setSaved(true));
		onContinue();
	};

	return (
		<div
			className={`swdc-bg-[#fff] swdc-px-3 swdc-py-4 swdc-drop-shadow-md lg:swdc-pl-6 lg:swdc-pr-6 ${className} swdc-w-full`}
		>
			<SectionTitle
				onEdit={() => {
					dispatch(setSaved(false));
					toggleExpanded(true);
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
						onSelect={handleFulfillmentTypeChange}
						text2="Standard or rush delivery available"
						text="Ready in as little as 2 hours"
						title2="Delivery"
						title="Pickup"
						value2="delivery"
						value="pickup"
					/>
					{/* Conditionally renders either pickup or delivery form based on user selection */}
					{fulfillmentType === 'pickup' ? (
						<PickupFulfillment
							onContinue={handleContinue}
							selections={selections}
							onSelectionsChange={handleSelectionsChange}
							setIsSaved={handleSetIsSaved}
						/>
					) : (
						<DeliveryFulfillment
							onContinue={handleContinue}
							selections={selections}
							onSelectionsChange={handleSelectionsChange}
							setIsSaved={handleSetIsSaved}
						/>
					)}
				</>
			)}
			{/* Displays read-only summary when section is completed */}
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
