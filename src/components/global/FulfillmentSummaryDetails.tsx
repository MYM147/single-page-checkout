import {
	IconRegularMapPin,
	IconRegularNotepad,
	IconRegularSmartphone,
	IconRegularTruck,
} from '@prism/dropcloth';

interface Props {
	deliveryAddress: string;
	deliveryDateTime: string;
	phoneNumber: string;
	specialInstructions?: string;
}

const FulfillmentSummaryDetails = ({
	deliveryAddress,
	deliveryDateTime,
	phoneNumber,
	specialInstructions,
}: Props) => {
	return (
		<div>
			<div className="swdc-flex">
				<IconRegularMapPin />
				<div>
					<h3 className="swdc-text-base swdc-font-bold swdc-uppercase">
						Delivery Address
					</h3>
					<p>{deliveryAddress}</p>
				</div>
			</div>
			<div className="swdc-flex">
				<IconRegularTruck />
				<h3 className="swdc-text-base swdc-font-bold swdc-uppercase">
					Delivery Date & Time
				</h3>
				<p>{deliveryDateTime}</p>
			</div>
			<div className="swdc-flex">
				<IconRegularSmartphone />
				<h3 className="swdc-text-base swdc-font-bold swdc-uppercase">
					Delivery Notification Number
				</h3>
				<p>{phoneNumber}</p>
			</div>
			<div className="swdc-flex">
				<IconRegularNotepad />
				<h3 className="swdc-text-base swdc-font-bold swdc-uppercase">
					Special Instructions
				</h3>
				<p>{specialInstructions || 'N/A'}</p>
			</div>
		</div>
	);
};

export default FulfillmentSummaryDetails;
