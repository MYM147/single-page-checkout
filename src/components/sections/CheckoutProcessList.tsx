import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { setExpanded as setContactExpanded } from '../../store/slices/contactSlice';
import { setExpanded as setFulfillmentExpanded } from '../../store/slices/fulfillmentSlice';
import { FulfillmentSelections } from '../../types';
import AccountDetails from './AccountDetails';
import ContactDetailsMenu from './ContactDetailsMenu';
import FulfillmentOptions from './FulfillmentOptions';
import PaymentMethod from './PaymentMethod';

// Main component that manages the checkout flow and expanded panel state
const CheckoutProcessList = () => {
	const [expandedPanel, setExpandedPanel] = useState(0);
	const dispatch = useAppDispatch();

	// Initial state for all user selections throughout the checkout process
	const [selections, setSelections] = useState<FulfillmentSelections>({
		fulfillmentType: '',
		deliveryAddress: '',
		deliveryDate: '',
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
		deliveryPhone: '',
		deliveryTime: '',
		deliveryTimeSlot: '',
		pickupDate: '',
		pickupDateSelection: null,
		pickupPerson: '',
		pickupPersonDetails: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
		},
		specialInstructions: '',
		storeDetails: {
			storeCity: 'Cleveland',
			storeState: 'OH',
			storeNumber: 721107,
			storeStreet: '4329 Lorain Ave.',
			storeZip: '44113-3716',
		},
	});

	const handleEdit = (panelIndex: number) => {
		setExpandedPanel(panelIndex);

		// Set the appropriate component as expanded in Redux
		if (panelIndex === 0) {
			dispatch(setFulfillmentExpanded(true));
			dispatch(setContactExpanded(false));
		} else if (panelIndex === 1) {
			dispatch(setFulfillmentExpanded(false));
			dispatch(setContactExpanded(true));
		} else {
			dispatch(setFulfillmentExpanded(false));
			dispatch(setContactExpanded(false));
		}
	};

	const handleFulfillmentContinue = () => {
		setExpandedPanel(1);
		dispatch(setFulfillmentExpanded(false));
		dispatch(setContactExpanded(true));
	};

	const handleContactContinue = () => {
		setExpandedPanel(2);
		dispatch(setContactExpanded(false));
	};

	return (
		<div className="swdc-flex swdc-w-full swdc-max-w-[752px] swdc-flex-col swdc-gap-4">
			{/* Controls which panel is currently expanded in the checkout flow */}
			<FulfillmentOptions
				className={`swdc-overflow-hidden swdc-transition-all swdc-duration-300 ${expandedPanel === 0 ? 'swdc-h-auto swdc-opacity-100' : 'swdc-pb-0 swdc-pt-[32px]'} `}
				onContinue={handleFulfillmentContinue}
				onEdit={() => handleEdit(0)}
				onSelectionsChange={setSelections}
				selections={selections}
			/>
			<ContactDetailsMenu
				className={`swdc-overflow-hidden swdc-transition-all swdc-duration-300 ${
					expandedPanel === 1
						? 'swdc-h-auto swdc-opacity-100'
						: 'swdc-pb-0 swdc-pt-[32px]'
				} `}
				onContinue={handleContactContinue}
				onEdit={() => handleEdit(1)}
				isActive={expandedPanel === 1}
			/>
			<AccountDetails
				className={`swdc-overflow-hidden swdc-transition-all swdc-duration-300 ${
					expandedPanel === 2
						? 'swdc-h-auto swdc-opacity-100'
						: 'swdc-pb-0 swdc-pt-[32px]'
				} `}
				isExpanded={expandedPanel === 2}
				onContinue={() => setExpandedPanel(3)}
			/>
			<PaymentMethod
				className={`swdc-overflow-hidden swdc-transition-all swdc-duration-300 ${
					expandedPanel === 3
						? 'swdc-h-auto swdc-opacity-100'
						: 'swdc-pb-0 swdc-pt-[32px]'
				} `}
				isExpanded={expandedPanel === 3}
				onContinue={() => setExpandedPanel(4)}
			/>
		</div>
	);
};

export default CheckoutProcessList;
