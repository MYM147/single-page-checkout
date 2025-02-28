import DeliveryProgressBar from './DeliveryProgressBar';

const FreeDeliveryBanner = () => {
	return (
		<div className="swdc-flex swdc-w-full swdc-items-center swdc-bg-[#fff] swdc-px-3 swdc-py-2 lg:swdc-hidden">
			<p className="swdc-w-1/3 swdc-align-middle">
				Add $XX.XX <br />
				for FREE delivery
			</p>
			<DeliveryProgressBar currentAmount={100} />
		</div>
	);
};

export default FreeDeliveryBanner;
