type Props = {
	storeCity: string;
	storeState: string;
	storeNumber: number;
	storeStreet: string;
	storeZip: string;
	storePhone: string;
	storeIsOpen: boolean;
};

const PickupStore = ({
	storeCity,
	storeState,
	storeNumber,
	storeStreet,
	storeZip,
	storePhone,
	storeIsOpen,
}: Props) => {
	return (
		<div className='swdc-mt-6'>
			<h3 className='swdc-text-base swdc-font-bold swdc-uppercase'>
				Pickup Store
			</h3>
			<p className='swdc-mt-2'>
				<span className='swdc-font-medium'>
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
				<p className='swdc-text-sm swdc-flex swdc-mt-1'>
					<div className='swdc-rounded-full swdc-w-[8px] swdc-h-[8px] swdc-bg-[#93324C] swdc-relative swdc-top-[5px] swdc-mr-1'></div>
					Closed until 11:00 AM tomorrow
				</p>
			)}
		</div>
	);
};

export default PickupStore;
