import DateSelectMenu from '../../global/DateSelectMenu';
import DeliveryAddress from '../../delivery/DeliveryAddress';
import DeliveryNotificationNumber from '../../delivery/DeliveryNotificationNumber';
import SavedDeliveryAddresses from '../../delivery/SavedDeliveryAddresses';
import SpecialInstructions from '../../global/SpecialInstructions';
import { Button } from '@prism/dropcloth';
import { FulfillmentSelections } from '../../../types';
import { getDates } from '../../utils/dateUtils';
import { phoneRegex } from '../../utils/regexUtils';
import { setLoading, setSaved,	updateDeliveryDetails, updateSelections,} from '../../../store/slices/fulfillmentSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

type Props = {
	onContinue: () => void;
	selections: FulfillmentSelections;
	setIsSaved: (value: boolean) => void;
};

// Form component for delivery options
const DeliveryFulfillment = ({ onContinue, selections, setIsSaved }: Props) => {
	const dispatch = useAppDispatch();
	const { membershipType, savedAddressSelected } = useAppSelector(
		(state) => state.fulfillment
	);

	const weekDates = getDates();

	const handleDateSelect = (date: string) => {
		const isRushDay =
			date ===
			weekDates[0].toLocaleDateString('en-US', {
				weekday: 'long',
				month: 'short',
				day: 'numeric',
			});

		dispatch(
			updateSelections({
				deliveryDate: date,
				deliveryTimeSlot: isRushDay ? 'rush' : selections.deliveryTimeSlot,
				deliveryTime: isRushDay ? '8AM - 11AM' : selections.deliveryTime,
			})
		);
	};

	// Form data for delivery address
	const formData = {
		address1: selections.deliveryDetails?.address1 || '',
		address2: selections.deliveryDetails?.address2 || '',
		city: selections.deliveryDetails?.city || '',
		state: selections.deliveryDetails?.state || '',
		zip: selections.deliveryDetails?.zip || '',
		phone: selections.deliveryDetails?.phone || '',
	};

	// Updates delivery address and triggers loading state when valid
	const handleAddressChange = (addressData: Partial<typeof formData>) => {
		dispatch(updateDeliveryDetails(addressData));

		// Pass addressData to isAddressValid
		if (isAddressValid(addressData)) {
			dispatch(setLoading(true));
			setTimeout(() => {
				dispatch(setLoading(false));
			}, 1000);
		}
	};

	// Validates address has all required fields
	const isAddressValid = (addressData: Partial<typeof formData>) => {
		return (
			addressData.address1 &&
			addressData.city &&
			addressData.state &&
			addressData.zip
		);
	};

	// Updates phone number for delivery notifications
	const handlePhoneChange = (phone: string) => {
		dispatch(updateDeliveryDetails({ phone }));
	};

	// Validates all required fields before enabling continue button
	const isFormValid = () => {
		const { address1, city, state, zip, phone } =
			selections.deliveryDetails || {};
		const addressValid = address1 && city && state && zip;
		const dateValid = selections.deliveryDate;
		const phoneValid = phoneRegex.test(phone); // No optional chaining needed here
		const timeValid = selections.deliveryTimeSlot;

		return addressValid && phoneValid && dateValid && timeValid;
	};

	return (
		<>
			<div className='swdc-mt-6'>
				<p className='md:swdc-text-sm'> *Required</p>
			</div>
			{membershipType === 'PRO' ? (
				<SavedDeliveryAddresses />
			) : (
				<DeliveryAddress
					defaultValues={formData}
					onChange={handleAddressChange}
					selections={selections}
				/>
			)}
			<div className='swdc-relative'>
				<DateSelectMenu
					disabled={
						membershipType === 'PRO'
							? !savedAddressSelected
							: !isAddressValid(selections.deliveryDetails)
					}
					membershipType={membershipType}
					onDateSelect={handleDateSelect}
					onSelectionsChange={(updatedSelections) => {
						dispatch(updateSelections(updatedSelections));
					}}
					rush={true}
					selectedDate={selections.deliveryDate}
					selectedTimeSlot={selections.deliveryTimeSlot}
					selections={selections}
					title='Delivery Date'
				/>
			</div>
			<DeliveryNotificationNumber
				defaultValue={selections.deliveryDetails?.phone}
				onChange={handlePhoneChange}
				selections={selections}
				title='Delivery Notification Number'
			/>
			<SpecialInstructions
				maxLength={100}
				onChange={(value) => {
					dispatch(updateSelections({ specialInstructions: value }));
				}}
				text='If you have any special instructions for the store or delivery driver, add them here.'
				title='Special Instructions (Optional)'
				value={selections.specialInstructions}
			/>
			<Button
				className='swdc-mt-10 swdc-w-full md:swdc-w-1/2'
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
export default DeliveryFulfillment;
