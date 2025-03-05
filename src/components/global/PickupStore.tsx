type Props = {
	isHeading: boolean;
	storeCity: string;
	storeState: string;
	storeNumber: number;
	storeStreet: string;
	storeZip: string;
	storePhone: string;
	storeIsOpen: boolean;
};

const PickupStore = ({
	isHeading,
	storeCity,
	storeState,
	storeNumber,
	storeStreet,
	storeZip,
	storePhone,
	storeIsOpen,
}: Props) => {
	return (
		<div className={`${isHeading ? 'swdc-mt-6' : 'swdc-ml-1'}`}>
			<h3 className="swdc-font-bold swdc-uppercase">Pickup Store</h3>
			<p className="swdc-mt-1">
				<span className="swdc-font-medium">
					{storeCity}, {storeState}: #{storeNumber}
				</span>
				<br />
				{storeStreet}
				<br />
				{storeCity}, {storeState} {storeZip}
				<br />
				{storePhone}
			</p>
			{!storeIsOpen && (
				<p className="swdc-text-md swdc-mt-1 swdc-flex lg:swdc-text-sm">
					<div className="swdc-relative swdc-top-[10px] swdc-mr-1 swdc-h-[10px] swdc-w-[10px] swdc-rounded-full swdc-bg-[#93324C] lg:swdc-top-[5px] lg:swdc-h-[8px] lg:swdc-w-[8px]"></div>
					Closed until 11:00 AM tomorrow
				</p>
			)}
		</div>
	);
};

export default PickupStore;
