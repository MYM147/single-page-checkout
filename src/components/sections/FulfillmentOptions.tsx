import { Button } from '@prism/dropcloth';
import { useState } from 'react';
import FulfillmentSummaryDetails from '../global/FulfillmentSummaryDetails';
import PickupOrDeliverySelector from '../global/PickupOrDeliverySelector';
import PickupStore from '../global/PickupStore';
import RadioBtnChoice from '../global/RadioBtnChoice';
import SectionTitle from '../global/SectionTitle';
import SpecialInstructions from '../global/SpecialInstructions';
// import { saveOrderDetails } from '../utils/orderUtils';

type Props = {
	isExpanded: boolean;
	onContinue: () => void;
	className?: string;
};

const FulfillmentOptions = ({ isExpanded, onContinue, className }: Props) => {
	const [fulfillmentType, setFulfillmentType] = useState('pickup');
	const [selections, setSelections] = useState({
		pickupPerson: '',
		pickupPersonDetails: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
		},
		pickupDate: '',
		pickupDateSelection: null,
		storeDetails: {
			storeCity: 'Cleveland',
			storeState: 'OH',
			storeNumber: 721107,
			storeStreet: '4329 Lorain Ave.',
			storeZip: '44113-3716',
		},
		specialInstructions: '',
	});

	const isFormValid = () => {
		// Check if someone else is picking up
		if (selections.pickupPerson === 'someone-else') {
			if (
				!selections.pickupPersonDetails?.firstName ||
				!selections.pickupPersonDetails?.lastName ||
				!selections.pickupPersonDetails?.email ||
				!selections.pickupPersonDetails?.phone
			) {
				return false;
			}
		}

		// Check if specific date is selected
		if (
			selections.pickupDate === 'on-a-specific-day' &&
			!selections.pickupDateSelection
		) {
			return false;
		}

		return selections.pickupPerson && selections.pickupDate;
	};

	return (
		<div
			className={`swdc-bg-[#fff] swdc-py-4 swdc-pl-6 swdc-pr-6 swdc-drop-shadow-md ${className} lg:swdc-w-[752px]`}
		>
			<SectionTitle title="Fulfillment Options" />
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
					{fulfillmentType === 'pickup' && (
						<>
							<div className="swdc-mt-6">
								<p className="swdc-text-sm"> * Required</p>
							</div>
							<PickupStore
								storeCity="Cleveland"
								storeState="OH"
								storeNumber={721107}
								storeStreet="4329 Lorain Ave."
								storeZip="44113-3716"
								storePhone="(216) 7412-6800"
								storeIsOpen={false}
							/>
							<RadioBtnChoice
								name="pickup-person"
								name2="pickup-person"
								option="Self Pickup"
								option2="Someone else"
								title="Pickup Person *"
								text="Who's picking up this order?"
								value="self-pickup"
								value2="someone-else"
								onSelectionChange={(selection, details) => {
									setSelections((prev) => ({
										...prev,
										pickupPerson: selection,
										pickupPersonDetails: details,
									}));
								}}
							/>
							<RadioBtnChoice
								name="pickup-date"
								name2="pickup-date"
								option="As soon as possible"
								option2="On a specific day"
								title="Pickup Date *"
								value="as-soon-as-possible"
								value2="on-a-specific-day"
								onSelectionChange={(selection, details) => {
									setSelections((prev) => ({
										...prev,
										pickupDate: selection,
										pickupDateSelection: details,
									}));
								}}
							/>
							<SpecialInstructions
								label=""
								maxLength={100}
								text="If you have any special instructions for the store or delivery driver,
									add them here."
								title="Special Instructions (Optional)"
							/>
							<Button
								onClick={onContinue}
								className="swdc-mt-6"
								disabled={!isFormValid()}
							>
								Save and Continue
							</Button>
						</>
					)}
				</>
			)}
			{!isExpanded && (
				<FulfillmentSummaryDetails
					deliveryAddress={`${selections.storeDetails.storeStreet}, ${selections.storeDetails.storeCity}, ${selections.storeDetails.storeState} ${selections.storeDetails.storeZip}`}
					deliveryDateTime={selections.pickupDateSelection || ''}
					phoneNumber={selections.pickupPersonDetails?.phone || ''}
					specialInstructions={selections.specialInstructions}
				/>
			)}
		</div>
	);
};

export default FulfillmentOptions;
