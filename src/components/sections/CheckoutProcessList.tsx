import { useState } from 'react';
import { type Selections } from '../../types';
import AccountDetails from './AccountDetails';
import ContactDetails from './ContactDetails';
import FulfillmentOptions from './FulfillmentOptions';
import PaymentMethod from './PaymentMethod';

const CheckoutProcessList = () => {
	const [expandedPanel, setExpandedPanel] = useState(0);

	const [selections, setSelections] = useState<Selections>({
		fulfillmentType: '',
		pickupPerson: '',
		pickupPersonDetails: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
		},
		pickupDate: '',
		pickupDateSelection: null,
		storeDetails: {
			storeCity: 'Cleveland',
			storeState: 'OH',
			storeNumber: 721107,
			storeStreet: '4329 Lorain Ave.',
			storeZip: '44113-3716',
		},
		specialInstructions: '',
		deliveryAddress: '',
		deliveryDetails: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			address1: '',
			address2: '',
			city: '',
			state: '',
			zip: '',
		},
		deliveryDate: '',
		deliveryTime: '',
		deliveryTimeSlot: '',
		deliveryPhone: '',
	});

	const handleEdit = (panelIndex: number) => {
		setExpandedPanel(panelIndex);
	};

	return (
		<div className="swdc-flex swdc-w-full swdc-flex-col swdc-gap-4">
			<FulfillmentOptions
				className={`swdc-overflow-hidden swdc-transition-all swdc-duration-300 ${expandedPanel === 0 ? 'swdc-h-auto swdc-opacity-100' : ''} `}
				isExpanded={expandedPanel === 0}
				onContinue={() => setExpandedPanel(1)}
				onEdit={() => handleEdit(0)}
				onSelectionsChange={setSelections}
				selections={selections}
			/>

			<ContactDetails
				isExpanded={expandedPanel === 1}
				onContinue={() => setExpandedPanel(2)}
				className={`swdc-overflow-hidden swdc-transition-all swdc-duration-300 ${
					expandedPanel === 1
						? 'swdc-h-auto swdc-opacity-100'
						: 'swdc-pb-0 swdc-pt-[32px]'
				} `}
			/>

			<AccountDetails
				isExpanded={expandedPanel === 2}
				onContinue={() => setExpandedPanel(3)}
				className={`swdc-overflow-hidden swdc-transition-all swdc-duration-300 ${
					expandedPanel === 2
						? 'swdc-h-auto swdc-opacity-100'
						: 'swdc-pb-0 swdc-pt-[32px]'
				} `}
			/>

			<PaymentMethod
				isExpanded={expandedPanel === 3}
				onContinue={() => setExpandedPanel(4)}
				className={`swdc-overflow-hidden swdc-transition-all swdc-duration-300 ${
					expandedPanel === 3
						? 'swdc-h-auto swdc-opacity-100'
						: 'swdc-pb-0 swdc-pt-[32px]'
				} `}
			/>
		</div>
	);
};
export default CheckoutProcessList;
