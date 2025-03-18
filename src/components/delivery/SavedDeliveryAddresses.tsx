import {
	IconRegularCaretDown,
	IconRegularCaretUp,
	IconRegularClose,
} from '@prism/dropcloth';
import { useState } from 'react';
import { savedAddresses } from '../utils/savedAddressUtil';

const SavedDeliveryAddresses = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0]);

	return (
		<div className="swdc-mt-6 swdc-flex swdc-flex-shrink-0 swdc-flex-col swdc-gap-2 lg:swdc-mr-[20px]">
			<h3 className="swdc-font-bold swdc-uppercase">Delivery Address</h3>
			<div className="swdc-relative">
				<div
					onClick={() => setIsOpen(!isOpen)}
					className="swdc-cursor-pointer swdc-border swdc-p-2"
				>
					<div className="swdc-flex swdc-items-center swdc-justify-between">
						<div className="swdc-truncate swdc-font-medium">
							{selectedAddress.locationName}
						</div>
						{isOpen ? (
							<IconRegularCaretUp className="swdc-relative swdc-top-2" />
						) : (
							<IconRegularCaretDown className="swdc-relative swdc-top-2" />
						)}
					</div>
					<div className="swdc-truncate swdc-text-[#6d6d6e]">
						{selectedAddress.streetAddress} {selectedAddress.city},{' '}
						{selectedAddress.state} {selectedAddress.zip}
					</div>
				</div>

				{isOpen && (
					<div className="swdc-border-top-[0px] swdc-absolute swdc-z-50 swdc-w-full swdc-border-x swdc-border-b swdc-bg-white">
						{savedAddresses.map((address) => (
							<div
								key={address.locationName}
								onClick={() => {
									setSelectedAddress(address);
									setIsOpen(false);
								}}
								className="hover:swdc-bg-gray-100 swdc-cursor-pointer swdc-p-2 hover:swdc-bg-[#f6f6f6]"
							>
								<div className="swdc-truncate swdc-font-bold">
									{address.locationName}
								</div>
								<div className="swdc-truncate">
									{address.streetAddress} {address.city}, {address.state}{' '}
									{address.zip}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
			<div>
				<p className="swdc-ml-2 swdc-mt-2 swdc-flex swdc-font-bold swdc-uppercase swdc-tracking-[1.5px]">
					<IconRegularClose className="swdc-mr-1 swdc-rotate-45" />
					ADD A NEW ADDRESS
				</p>
			</div>
		</div>
	);
};

export default SavedDeliveryAddresses;
