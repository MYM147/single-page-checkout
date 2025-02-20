import { Radio } from '@prism/dropcloth';

const PickupDate = () => {
	return (
		<div className='swdc-mt-6'>
			<h3 className='swdc-text-base swdc-font-bold swdc-uppercase'>
				Pickup Date *
			</h3>
			<p className='swdc-mt-2'>Who's picking up this order?'</p>
			<div className='swdc-pt-2'>
				<Radio
					name='pickup-date'
					value='pickup-asap'
					className='hover:swdc-bg-[#fff]'>
					As soon as possible
				</Radio>
				<br />
				<Radio
					name='pickup-date'
					value='pickup-specific'
					className='hover:swdc-bg-[#fff]'>
					On a specific day
				</Radio>
			</div>
		</div>
	);
};

export default PickupDate;
