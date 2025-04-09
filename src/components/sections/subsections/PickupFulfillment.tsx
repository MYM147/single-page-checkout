import { Button } from '@prism/dropcloth';
import { useAppDispatch } from '../../../store/hooks';
import {
	setSaved,
	updateSelections,
} from '../../../store/slices/fulfillmentSlice';
import { FulfillmentSelections } from '../../../types';
import RadioBtnChoice from '../../global/RadioBtnChoice';
import SpecialInstructions from '../../global/SpecialInstructions';
import PickupStore from '../../pickup/PickupStore';

type PickupPersonDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type PickupDateDetails = string | Date | null;

type Props = {
	onContinue: () => void;
	onSelectionsChange: (selections: Partial<FulfillmentSelections>) => void;
	selections: FulfillmentSelections;
	setIsSaved: (value: boolean) => void;
	onSelectionChange: (selection: string, details?: PickupPersonDetails | PickupDateDetails) => void;
};

//Form component for store pickup options
const PickupFulfillment = ({
	onContinue,
	onSelectionsChange,
	selections,
	setIsSaved,
}: Props) => {
	const dispatch = useAppDispatch();

	// Validates all required fields are completed before enabling continue button
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
			<div className='swdc-mt-6'>
				<p className='swdc-text-sm'> * Required</p>
			</div>
			{/* Store location information display, will be dynamic */}
			<PickupStore
				isHeading
				storeCity='Cleveland'
				storeIsOpen={false}
				storeNumber={721107}
				storePhone='(216) 7412-6800'
				storeState='OH'
				storeStreet='4329 Lorain Ave.'
				storeZip='44113-3716'
			/>
			{/* Pickup person selection (self or someone else) */}
			<RadioBtnChoice
				name2='pickup-person'
				name='pickup-person'
				onSelectionChange={(selection, details) => {
					if (selection === 'someone-else' && details) {	
					const personDetails = details as {
						firstName: string;
						lastName: string;
						email: string;
						phone: string;
					};
					
					dispatch(
						updateSelections({
							pickupPerson: selection,
							pickupPersonDetails: personDetails,
						})
					);
					onSelectionsChange({
						...selections,
						pickupPerson: selection,
						pickupPersonDetails: personDetails,
					});
				} else {
					// If no details or self-pickup, just update the selection
					dispatch(
						updateSelections({
							pickupPerson: selection,
							// Clear pickup person details if selecting self
							pickupPersonDetails: selection === 'self-pickup' ? undefined : selections.pickupPersonDetails,
						})
					);
					onSelectionsChange({
						...selections,
						pickupPerson: selection,
						pickupPersonDetails: details,
					});
				}}}
				onSelectionsChange={onSelectionsChange}
				option2='Someone else'
				option='Me'
				pickupPerson={selections.pickupPerson}
				pickupPersonDetails={selections.pickupPersonDetails}
				pickupDateSelection={null}
				selections={selections}
				text='Who&apos;s picking up this order?'
				title='Pickup Person *'
				value2='someone-else'
				value='self-pickup'
			/>
			{/* Pickup date selection (ASAP or specific date) */}
			<RadioBtnChoice
				name2='pickup-date'
				name='pickup-date'
				onSelectionChange={(selection, details) => {
					dispatch(
						updateSelections({
							pickupDate: selection,
							pickupDateSelection: details,
						})
					);
					onSelectionsChange({
						...selections,
						pickupDate: selection,
						pickupDateSelection: details,
					});
				}}
				onSelectionsChange={onSelectionsChange}
				option2='On a specific day'
				option='As soon as possible'
				pickupDate={selections.pickupDate}
				pickupDateSelection={selections.pickupDateSelection || null}
				selections={selections}
				title='Pickup Date *'
				value2='on-a-specific-day'
				value='as-soon-as-possible'
			/>

			<SpecialInstructions
				maxLength={100}
				onChange={(value) => {
					dispatch(
						updateSelections({
							specialInstructions: value,
						})
					);
					onSelectionsChange({
						...selections,
						specialInstructions: value,
					});
				}}
				text='If you have any special instructions for the store or delivery driver, add them here.'
				title='Special Instructions (Optional)'
				value={selections.specialInstructions}
			/>
			<Button
				className='swdc-mt-6 swdc-full md:swdc-w-[250px]'
				disabled={!isFormValid()}
				onClick={() => {
					onContinue();
					setIsSaved(true);
					dispatch(setSaved(true));
				}}
			>
				Save and Continue
			</Button>
		</>
	);
};

export default PickupFulfillment;
