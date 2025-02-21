import { Radio } from '@prism/dropcloth';
// import { useState } from 'react';

type Props = {
	onSelect: (value: string) => void;
};

const PickupOrDeliverySelector = ({ onSelect }: Props) => {

	return (
		<>
			<div className='swdc-flex swdc-mt-12 swdc-flex-shrink-0 swdc-gap-4'>
				<Radio
					name='pickup'
					onChange={(e) => onSelect(e.target.value)}
					value='pickup'
					className='swdc-w-[300px] swdc-items-center swdc-rounded-[1px] swdc-border swdc-border-[#2F2F30]/[0.45] swdc-transition-all swdc-duration-200 has-[input:checked]:swdc-rounded-[2px] has-[input:checked]:swdc-border-[3px] has-[input:checked]:swdc-border-[#2F2F30]'>
					<div>
						<p className='swdc-font-medium swdc-text-base'>Pickup</p>
						<p>Ready in as little as 2 hours</p>
					</div>
				</Radio>

				<Radio
					name='pickup'
					onChange={(e) => onSelect(e.target.value)}
					value='delivery'
					className='swdc-w-[300px] swdc-items-center swdc-rounded-[1px] swdc-border swdc-border-[#2F2F30]/[0.45] swdc-transition-all swdc-duration-200 has-[input:checked]:swdc-rounded-[2px] has-[input:checked]:swdc-border-[3px] has-[input:checked]:swdc-border-[#2F2F30]'>
					<div>
						<p className='swdc-font-medium swdc-text-base'>Delivery</p>
						<p>Standard or rush delivery available</p>
						{/* Make this text a prop after getting fulfillment data */}
					</div>
				</Radio>
			</div>
		</>
	);
};

export default PickupOrDeliverySelector