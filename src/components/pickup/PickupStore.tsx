import { useState } from 'react';

type Props = {
	isHeading: boolean;
	storeCity: string;
	storeIsOpen: boolean;
	storeNumber: number;
	storePhone: string;
	storeState: string;
	storeStreet: string;
	storeZip: string;
};

const PickupStore = ({
	isHeading,
	storeCity,
	storeIsOpen,
	storeNumber,
	storePhone,
	storeState,
	storeStreet,
	storeZip,
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
			{!storeIsOpen ? (
				<p className="swdc-text-md swdc-mt-1 swdc-flex md:swdc-text-sm">
					<div className="swdc-relative swdc-top-[10px] swdc-mr-1 swdc-h-[10px] swdc-w-[10px] swdc-rounded-full swdc-bg-[#93324C] md:swdc-top-[5px] md:swdc-h-[8px] md:swdc-w-[8px]"></div>
					Closed until 11:00 AM tomorrow
				</p>
			) : (
				<p className="swdc-text-md swdc-mt-1 swdc-flex md:swdc-text-sm">
					<div className="swdc-relative swdc-top-[10px] swdc-mr-1 swdc-h-[10px] swdc-w-[10px] swdc-rounded-full swdc-bg-[#329352] md:swdc-top-[5px] md:swdc-h-[8px] md:swdc-w-[8px]"></div>
					Open until 9:00 PM today
				</p>
			)}
		</div>
	);
};

export default PickupStore;
