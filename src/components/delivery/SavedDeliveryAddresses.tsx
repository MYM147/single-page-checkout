import { useState } from 'react';
import { savedAddresses } from '../utils/savedAddressUtil';

const SavedDeliveryAddresses = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0]);

	return (
		<div className="swdc-mr-[20px] swdc-mt-6 swdc-flex swdc-flex-shrink-0 swdc-flex-col swdc-gap-4">
			<h3 className="swdc-font-bold swdc-uppercase">Delivery Address</h3>
			<div className="swdc-relative">
				<div
					onClick={() => setIsOpen(!isOpen)}
					className="swdc-cursor-pointer swdc-border swdc-py-2 swdc-pl-2 swdc-pr-6"
				>
					<div className="swdc-truncate swdc-font-medium">
						{selectedAddress.locationName}
					</div>
					<div className="swdc-truncate swdc-text-[#6d6d6e]">
						{selectedAddress.streetAddress} {selectedAddress.city},{' '}
						{selectedAddress.state} {selectedAddress.zip}
					</div>
				</div>

				{isOpen && (
					<div className="swdc-absolute swdc-z-50 swdc-mt-1 swdc-w-full swdc-border swdc-bg-white">
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
						<div
							className="hover:swdc-bg-gray-100 swdc-cursor-pointer swdc-p-2"
							onClick={() => {
								// Handle adding new address
							}}
						>
							Add new address
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default SavedDeliveryAddresses;
