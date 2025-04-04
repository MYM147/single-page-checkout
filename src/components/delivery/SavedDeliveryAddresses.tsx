import {
	Button,
	IconRegularCaretDown,
	IconRegularCaretUp,
	IconRegularClose,
} from '@prism/dropcloth';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	setSavedAddressSelected,
	updateDeliveryDetails,
} from '../../store/slices/fulfillmentSlice';
import { locationNameRegex } from '../utils/regexUtils';
import { savedAddresses } from '../utils/savedAddressUtil';
import DeliveryAddress from './DeliveryAddress';

const SavedDeliveryAddresses = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0]);
	const { selections } = useAppSelector((state) => state.fulfillment);
	const [addresses, setAddresses] = useState(savedAddresses);

	const dispatch = useAppDispatch();
	const [addNewAddressForm, setAddNewAddressForm] = useState(false);

	const handleAddNewAddress = () => {
		setAddNewAddressForm(true);
	};

	const handleCancelNewAddress = () => {
		setAddNewAddressForm(false);
	};

	const validateLocationName = (name: string) => {
		return name.length > 0 && name.length <= 50 && locationNameRegex.test(name);
	};

	const [formData, setFormData] = useState({
		address1: '',
		address2: '',
		city: '',
		state: '',
		zip: '',
		phone: '',
	});

	const handleAddressChange = (data: {
		address1: string;
		address2: string;
		city: string;
		state: string;
		zip: string;
		phone?: string;
	}) => {
		setFormData({
			...data,
			phone: data.phone || '',
		});
	};

	const handleSaveNewAddress = (formData: {
		address1: string;
		address2: string;
		city: string;
		state: string;
		zip: string;
		phone?: string;
		locationName?: string;
	}) => {
		// Validate location name if provided
		const locationName =
			formData.locationName || `New Address ${addresses.length + 1}`;
		if (!validateLocationName(locationName)) {
			// Show error or use default name
			return;
		}

		const newAddress = {
			locationName: locationName,
			streetAddress: formData.address1,
			city: formData.city,
			state: formData.state,
			zip: formData.zip,
		};

		setAddresses([...addresses, newAddress]);
		setSelectedAddress(newAddress);
		setAddNewAddressForm(false);
	};

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
					<div className="swdc-truncate swdc-pr-4 swdc-text-[#6d6d6e]">
						{selectedAddress.streetAddress} {selectedAddress.city},{' '}
						{selectedAddress.state} {selectedAddress.zip}
					</div>
				</div>

				{isOpen && (
					<div className="swdc-border-top-[0px] swdc-absolute swdc-z-50 swdc-w-full swdc-border-x swdc-border-b swdc-bg-white">
						{addresses.map((address) => (
							<div
								key={address.locationName}
								onClick={() => {
									setSelectedAddress(address);
									setIsOpen(false);
									dispatch(setSavedAddressSelected(true));
									dispatch(
										updateDeliveryDetails({
											address1: address.streetAddress,
											city: address.city,
											state: address.state,
											zip: address.zip,
										})
									);
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
			{addNewAddressForm ? (
				<>
					<DeliveryAddress
						defaultValues={formData}
						onChange={handleAddressChange}
						selections={selections}
						hideForSavedAddresses={true}
					/>
					<div className="swdc-mt-4 swdc-flex swdc-justify-end swdc-gap-4">
						<Button
							onClick={handleCancelNewAddress}
							polarity="dark"
							type="button"
							variant="outlined"
						>
							Cancel
						</Button>
						<Button
							onClick={() => handleSaveNewAddress(formData)}
							polarity="dark"
							type="button"
							variant="filled"
						>
							Save
						</Button>
					</div>
				</>
			) : (
				<>
					<p
						className="md:swdc-text-md swdc-ml-2 swdc-mt-2 swdc-flex swdc-cursor-pointer swdc-justify-center swdc-text-xl swdc-font-bold swdc-uppercase swdc-tracking-[1.5px] md:swdc-justify-start"
						onClick={handleAddNewAddress}
					>
						<IconRegularClose className="swdc-mr-1 swdc-rotate-45" />
						ADD A NEW ADDRESS
					</p>
				</>
			)}
			<p className="swdc-mt-4 swdc-text-center swdc-text-lg md:swdc-text-left md:swdc-text-sm">
				No address?{' '}
				<a href="#" className="swdc-ml-1 swdc-font-medium hover:swdc-underline">
					Set your delivery spot on a map.
				</a>
			</p>
		</div>
	);
};

export default SavedDeliveryAddresses;
