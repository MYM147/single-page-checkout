import { Button, Input, InputGroup, Radio } from '@prism/dropcloth';
import { useState } from 'react';
import PickupOrDeliverySelector from '../global/PickupOrDeliverySelector';
import PickupStore from '../global/PickupStore';
import SectionTitle from '../global/SectionTitle';

type Props = {
	isExpanded: boolean;
	onContinue: () => void;
	className?: string;
};

const FulfillmentOptions = ({ isExpanded, onContinue, className }: Props) => {
	const [fulfillmentType, setFulfillmentType] = useState('');

	return (
		<div
			className={`swdc-drop-shadow-md swdc-py-4 swdc-pr-6 swdc-pl-6 swdc-bg-[#fff] ${className}`}>
			<SectionTitle title='Fulfillment Options' />
			{isExpanded && (
				<>
					<PickupOrDeliverySelector onSelect={setFulfillmentType} />
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
							<div className='swdc-mt-6'>
								<h3 className='swdc-text-base swdc-font-bold swdc-uppercase'>
									Pickup Person *
								</h3>
								<p className='swdc-mt-2'>Who's picking up this order?'</p>
								<div className='swdc-pt-2'>
									<Radio
										name='pickup-person'
										value='pickup-self'
										className='hover:swdc-bg-[#fff]'>
										Me
									</Radio>
									<br />
									<Radio
										name='pickup-person'
										value='pickup-someone'
										className='hover:swdc-bg-[#fff]'>
										Someone else
									</Radio>
								</div>
							</div>
							<div className='swdc-mt-6'>
								<h3 className='swdc-text-base swdc-font-bold swdc-uppercase'>
									Special Instructions (Optional)
								</h3>
								<p>
									If you have any special instructions for the store or delivery
									driver, add them here.
								</p>
								<InputGroup label='' maxLength={100} className='swdc-h-10'>
									<Input maxLength={100} className='swdc-h-10' />
								</InputGroup>
							</div>
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
