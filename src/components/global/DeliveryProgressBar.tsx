type Props = {
	currentAmount: number;
};

const DeliveryProgressBar = ({ currentAmount }: Props) => {
	const targetAmount = 200;
	const progress = Math.min((currentAmount / targetAmount) * 100, 100);

	return (
		<div className="swdc-flex swdc-w-2/3">
			<p className="swdc-pr-1 swdc-font-medium">$0</p>
			<div className="swdc-relative swdc-h-2 swdc-w-full swdc-rounded-full swdc-bg-[#DCDEDC]">
				<div
					className="swdc-absolute swdc-h-2 swdc-rounded-full swdc-bg-black"
					style={{ width: `${progress}%` }}
				/>
			</div>
			<p className="swdc-pl-1 swdc-font-medium">$200</p>
		</div>
	);
};

export default DeliveryProgressBar;
