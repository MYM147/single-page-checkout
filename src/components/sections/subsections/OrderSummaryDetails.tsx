import {
	IconRegularCalendar,
	IconRegularInformation,
	IconRegularMapPin,
	IconRegularNotepad,
	IconRegularPerson,
	IconRegularSmartphone,
	IconRegularStore,
	IconRegularTruck,
} from '@prism/dropcloth';

import PickupStore from '../../pickup/PickupStore';
interface Props {
	deliveryAddress: string;
	deliveryDate: string;
	deliveryPhone: string;
	deliveryTime: string;
	fulfillmentType: string;
	pickupDate: string;
	pickupDateTime: string | Date | null;
	pickupPerson: string;
	pickupPersonDetails?: {
		firstName: string;
		lastName: string;
		phone: string;
	};
	pickupPhone: string;
	specialInstructions: string;
}

const OrderSummaryDetails = ({
	deliveryAddress,
	deliveryDate,
	deliveryPhone,
	deliveryTime,
	fulfillmentType,
	pickupDate,
	pickupDateTime,
	pickupPerson,
	pickupPersonDetails,
	specialInstructions,
}: Props) => {
	return (
		<>
			{fulfillmentType === 'pickup' ? (
				<>
					<div className='swdc-flex'>
						<IconRegularStore />
						<PickupStore
							isHeading={false}
							storeCity='Cleveland'
							storeIsOpen={false}
							storeNumber={721107}
							storePhone='(216) 7412-6800'
							storeState='OH'
							storeStreet='4329 Lorain Ave.'
							storeZip='44113-3716'
						/>
					</div>
					<div className='swdc-mt-3 swdc-flex'>
						<IconRegularCalendar />
						<div className='swdc-ml-1'>
							<h3 className='swdc-text-base swdc-font-bold swdc-uppercase'>
								Pickup Date & Time
							</h3>
							<p className='swdc-mt-1'>
								{pickupDate === 'as-soon-as-possible'
									? 'As soon as possible'
									: typeof pickupDateTime === 'string'
										? pickupDateTime
										: pickupDateTime?.toLocaleDateString('en-US')}
								{pickupDate === 'as-soon-as-possible' && (
									<div className='swdc-mt-1 swdc-flex swdc-items-center swdc-bg-[#d8e8d8] swdc-p-[6px] swdc-text-xs'>
										<IconRegularInformation className='swdc-w-2' />
										<p className='swdc-ml-1'>
											We&apos;ll let you know when your order is ready
										</p>
									</div>
								)}
							</p>
						</div>
					</div>
					<div className='swdc-mt-3 swdc-flex'>
						<IconRegularPerson />
						<div className='swdc-ml-1'>
							<h3 className='swdc-text-base swdc-font-bold swdc-uppercase'>
								Pickup Person
							</h3>
							<p className='swdc-mt-1'>
								{pickupPerson === 'self-pickup'
									? 'Me'
									: `${pickupPersonDetails?.firstName} ${pickupPersonDetails?.lastName} - ${pickupPersonDetails?.phone}`}
							</p>
						</div>
					</div>
				</>
			) : (
				<>
					<div className='swdc-flex'>
						<IconRegularMapPin />
						<div className='swdc-ml-1'>
							<h3 className='swdc-text-base swdc-font-bold swdc-uppercase'>
								Delivery Address
							</h3>
							<p>{deliveryAddress}</p>
						</div>
					</div>
					<div className='swdc-mt-3 swdc-flex'>
						<IconRegularTruck />
						<div className='swdc-ml-1'>
							<h3 className='swdc-text-base swdc-font-bold swdc-uppercase'>
								Delivery Date & Time
							</h3>
							<p>
								{deliveryDate}
								<br />
								{deliveryTime === 'rush' ? '8AM - 11AM' : deliveryTime}
							</p>
						</div>
					</div>
					<div className='swdc-mt-3 swdc-flex'>
						<IconRegularSmartphone />
						<div className='swdc-ml-1'>
							<h3 className='swdc-text-base swdc-font-bold swdc-uppercase'>
								Delivery Phone
							</h3>
							<p>{deliveryPhone}</p>
						</div>
					</div>
				</>
			)}
			<div className='swdc-mt-3 swdc-flex swdc-pb-4'>
				<IconRegularNotepad />
				<div className='swdc-ml-1'>
					<h3 className='swdc-text-base swdc-font-bold swdc-uppercase'>
						Special Instructions
					</h3>
					<p className='swdc-mt-1'>{specialInstructions || 'N/A'}</p>
				</div>
			</div>
		</>
	);
};

export default OrderSummaryDetails;
