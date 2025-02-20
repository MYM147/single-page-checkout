import { Button, Radio } from '@prism/dropcloth';
import PickupOrDeliverySelector from '../global/PickupOrDeliverySelector';
import PickupStore from '../global/PickupStore';
import SectionTitle from '../global/SectionTitle';

type Props = {
	isExpanded: boolean;
	onContinue: () => void;
	className?: string;
};

const FulfillmentOptions = ({ isExpanded, onContinue, className }: Props) => {
	return (
		<div className={`swdc-py-10 swdc-pr-20 swdc-pl-10 bg-[#fff] ${className}`}>
			<SectionTitle title='Fulfillment Options' />
			{isExpanded && (
				<>
					<PickupOrDeliverySelector />
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
					<Button onClick={onContinue} className='swdc-mt-6'>
						Save and Continue
					</Button>
				</>
			)}
		</div>
	);
};

export default FulfillmentOptions;
