import { Button } from '@prism/dropcloth';
import { useState } from 'react';
import PickupOrDeliverySelector from '../global/PickupOrDeliverySelector';
import PickupStore from '../global/PickupStore';
import RadioBtnChoice from '../global/RadioBtnChoice';
import SectionTitle from '../global/SectionTitle';
import SpecialInstructions from '../global/SpecialInstructions';
import { saveOrderDetails } from '../utils/orderUtils';

type Props = {
	isExpanded: boolean;
	onContinue: () => void;
	className?: string;
};

const FulfillmentOptions = ({ isExpanded, onContinue, className }: Props) => {
	const [fulfillmentType, setFulfillmentType] = useState('');
	const handleSaveAndContinue = () => {
		const fulfillmentData = {
			pickupType: selectedOption,
			pickupPerson: selectedPickupPerson,
			// Add other form data here
		};

		saveOrderDetails('fulfillment', fulfillmentData);
		onContinue();
	};

	return (
		<div
			className={`swdc-drop-shadow-md swdc-py-4 swdc-pr-6 swdc-pl-6 swdc-bg-[#fff] ${className}`}>
			<SectionTitle title='Fulfillment Options' />
			{isExpanded && (
				<>
					<PickupOrDeliverySelector
						name='pickup'
						name2='pickup'
						text='Ready in as little as 2 hours'
						text2='Standard or rush delivery available'
						title='Pickup'
						title2='Delivery'
						value='pickup'
						value2='delivery'
						onSelect={setFulfillmentType}
					/>
					{fulfillmentType === 'pickup' && (
						<>
							<div className='swdc-mt-6'>
								<p className='swdc-text-sm'> * Required</p>
							</div>
							<PickupStore
								storeCity='Cleveland'
								storeState='OH'
								storeNumber={721107}
								storeStreet='4329 Lorain Ave.'
								storeZip='44113-3716'
								storePhone='(216) 7412-6800'
								storeIsOpen={false}
							/>
							<RadioBtnChoice
								name='pickup-person'
								name2='pickup-person'
								option='Self Pickup'
								option2='Someone else'
								title='Pickup Person *'
								text="Who's picking up this order?"
								value='self-pickup'
								value2='someone-else'
							/>
							<RadioBtnChoice
								name="pickup-date"
								name2="pickup-date"
								option='As soon as possible'
								option2='On a specific day'
								title='Pickup Date *'
								value='as-soon-as-possible'
								value2='on-a-specific-day'
							/>
							<SpecialInstructions
								label=''
								maxLength={100}
								text='If you have any special instructions for the store or delivery driver,
									add them here.'
								title='Special Instructions (Optional)'
							/>
							<Button onClick={onContinue} className='swdc-mt-6'>
								Save and Continue
							</Button>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default FulfillmentOptions;
