import { Button } from '@prism/dropcloth';
import { type Selections } from '../../../types';
import PickupStore from '../../global/PickupStore';
import RadioBtnChoice from '../../global/RadioBtnChoice';
import SpecialInstructions from '../../global/SpecialInstructions';

type Props = {
	onContinue: () => void;
	onSelectionsChange: (selections: Selections) => void;
	selections: Selections;
	setIsSaved: (value: boolean) => void;
};

const PickupFulfillment = ({
	onContinue,
	onSelectionsChange,
	selections,
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
				storeIsOpen={false}
				storeNumber={721107}
				storePhone="(216) 7412-6800"
				storeState="OH"
				storeStreet="4329 Lorain Ave."
				storeZip="44113-3716"
			/>
			<RadioBtnChoice
				name2="pickup-person"
				name="pickup-person"
				onSelectionChange={(selection, details) => {
					onSelectionsChange({
						...selections,
						pickupPerson: selection,
						pickupPersonDetails: details,
					});
				}}
				onSelectionsChange={onSelectionsChange}
				option2="Someone else"
				option="Me"
				pickupPerson={selections.pickupPerson}
				pickupPersonDetails={selections.pickupPersonDetails}
				pickupDateSelection={null} // Add this line
				selections={selections}
				text="Who's picking up this order?"
				title="Pickup Person *"
				value2="someone-else"
				value="self-pickup"
			/>

			<RadioBtnChoice
				name2="pickup-date"
				name="pickup-date"
				onSelectionChange={(selection, details) => {
					onSelectionsChange({
						...selections,
						pickupDate: selection,
						pickupDateSelection: details,
					});
				}}
				onSelectionsChange={onSelectionsChange}
				option2="On a specific day"
				option="As soon as possible"
				pickupDate={selections.pickupDate}
				pickupDateSelection={selections.pickupDateSelection || null} // Add this line
				title="Pickup Date *"
				value2="on-a-specific-day"
				value="as-soon-as-possible"
				selections={selections}
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

export default PickupFulfillment;
