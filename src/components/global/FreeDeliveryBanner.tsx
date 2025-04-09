import { IconRegularTruck } from '@prism/dropcloth';
import { useState } from 'react';
import DeliveryProgressBar from '../delivery/DeliveryProgressBar';

const FreeDeliveryBanner = () => {
	const [deliveryAmount] = useState(62.22);
	return (
		<>
			{deliveryAmount >= 200 ? (
				<div className="swdc-flex swdc-w-full swdc-items-center swdc-bg-[#dae4df] swdc-p-[24px] md:swdc-hidden">
					<IconRegularTruck className="swdc-icon-3 swdc-mr-4 swdc-fill-[#466C5B]" />
					<div className="swdc-text-[#466C5B]">
						<p className="swdc-font-medium">Good News!</p>
						<p className="swdc-text-sm">You&apos;ve unlocked free delivery.</p>
					</div>
				</div>
			) : (
				<div className="swdc-flex swdc-w-full swdc-items-center swdc-bg-[#fff] swdc-px-3 swdc-py-2 md:swdc-hidden">
					<p className="swdc-w-1/3 swdc-align-middle">
						Add ${100 - deliveryAmount}
						<br />
						for FREE delivery
					</p>
					<DeliveryProgressBar currentAmount={deliveryAmount} />
				</div>
			)}
		</>
	);
};

export default FreeDeliveryBanner;
