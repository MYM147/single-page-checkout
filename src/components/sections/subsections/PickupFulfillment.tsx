import { Button } from '@prism/dropcloth';
import { type Selections } from '../../../types';
import PickupStore from '../../global/PickupStore';
import RadioBtnChoice from '../../global/RadioBtnChoice';
import SpecialInstructions from '../../global/SpecialInstructions';

type Props = {
	selections: Selections;
	onSelectionsChange: (selections: Selections) => void;
	onContinue: () => void;
	setIsSaved: (value: boolean) => void;
};

const PickupFulfillment = ({
	selections,
	onSelectionsChange,
	onContinue,
	setIsSaved,
}: Props) => {
	// Move the isFormValid function here
	const isFormValid = () => {
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

		if (
			selections.pickupDate === 'on-a-specific-day' &&
			!selections.pickupDateSelection
		) {
			return false;
		}

		return selections.pickupPerson && selections.pickupDate;
	};

	return (
		<>
			<div className="swdc-mt-6">
				<p className="swdc-text-sm"> * Required</p>
			</div>
			<PickupStore
				isHeading
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
				option="Me"
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
				text="If you have any special instructions for the store or delivery driver, add them here."
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

export default PickupFulfillment;
