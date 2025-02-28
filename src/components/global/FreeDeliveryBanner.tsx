import DeliveryProgressBar from './DeliveryProgressBar';

const FreeDeliveryBanner = () => {
	return (
		<div className="swdc-flex swdc-w-full swdc-bg-[#fff] swdc-px-6 swdc-py-4 lg:swdc-hidden">
			<p className="swdc-w-1/3 swdc-text-sm">Add $XX.XX <br/>for FREE delivery</p>
			<DeliveryProgressBar currentAmount={100} />
		</div>
	);
};

export default FreeDeliveryBanner;
