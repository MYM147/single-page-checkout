import { Button } from '@prism/dropcloth';
import { useState } from 'react';
import { type Selections } from '../../types';

import FulfillmentSummaryDetails from '../global/FulfillmentSummaryDetails';
import PickupOrDeliverySelector from '../global/PickupOrDeliverySelector';
import PickupStore from '../global/PickupStore';
import RadioBtnChoice from '../global/RadioBtnChoice';
import SectionTitle from '../global/SectionTitle';
import SpecialInstructions from '../global/SpecialInstructions';
// import { saveOrderDetails } from '../utils/orderUtils';

type Props = {
	className?: string;
	isExpanded: boolean;
	onContinue: () => void;
	onEdit: () => void;
	onSelectionsChange: (selections: Selections) => void;
	onSelectionChange: (selection: string, details?: any) => void;
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
			className={`swdc-bg-[#fff] swdc-py-4 swdc-pl-6 swdc-pr-6 swdc-drop-shadow-md ${className} swdc-w-full lg:swdc-w-[752px]`}
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
								pickupPerson={selections.pickupPerson}
								pickupPersonDetails={selections.pickupPersonDetails}
								onSelectionChange={(selection, details) => {
									onSelectionsChange({
										...selections,
										pickupPerson: selection,
										pickupPersonDetails: details,
									});
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
								pickupDate={selections.pickupDate}
								pickupDateSelection={selections.pickupDateSelection}
								onSelectionChange={(selection, details) => {
									onSelectionsChange({
										...selections,
										pickupDate: selection,
										pickupDateSelection: details,
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
								text="If you have any special instructions for the store or delivery driver,
									add them here."
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
					)}
					{fulfillmentType === 'delivery' && (
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
								pickupPerson={selections.pickupPerson}
								pickupPersonDetails={selections.pickupPersonDetails}
								onSelectionChange={(selection, details) => {
									onSelectionsChange({
										...selections,
										pickupPerson: selection,
										pickupPersonDetails: details,
									});
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
								pickupDate={selections.pickupDate}
								pickupDateSelection={selections.pickupDateSelection}
								onSelectionChange={(selection, details) => {
									onSelectionsChange({
										...selections,
										pickupDate: selection,
										pickupDateSelection: details,
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
								text="If you have any special instructions for the store or delivery driver,
									add them here."
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
