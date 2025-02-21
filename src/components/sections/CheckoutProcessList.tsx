import { useState } from 'react';
import AccountDetails from './AccountDetails';
import ContactDetails from './ContactDetails';
import FulfillmentOptions from './FulfillmentOptions';
import PaymentMethod from './PaymentMethod';



const CheckoutProcessList = () => {
	const [expandedPanel, setExpandedPanel] = useState(0);

  return (
		<div className='swdc-flex swdc-flex-col swdc-gap-4'>
			<FulfillmentOptions
				isExpanded={expandedPanel === 0}
				onContinue={() => setExpandedPanel(1)}
				className={`
					swdc-transition-all swdc-duration-300 swdc-overflow-hidden
					${
						expandedPanel === 0
							? 'swdc-h-auto swdc-opacity-100'
							: 'swdc-h-[48px] swdc-opacity-75'
					}
				`}
			/>

			<ContactDetails
				isExpanded={expandedPanel === 1}
				onContinue={() => setExpandedPanel(2)}
				className={`
					swdc-transition-all swdc-duration-300 swdc-overflow-hidden
					${
						expandedPanel === 0
							? 'swdc-h-auto swdc-opacity-100'
							: 'swdc-h-[48px] swdc-opacity-75'
					}
				`}
			/>

			<AccountDetails
				isExpanded={expandedPanel === 2}
				onContinue={() => setExpandedPanel(3)}
				className={`
					swdc-transition-all swdc-duration-300 swdc-overflow-hidden
					${
						expandedPanel === 0
							? 'swdc-h-auto swdc-opacity-100'
							: 'swdc-h-[48px] swdc-opacity-75'
					}
				`}
			/>

			<PaymentMethod
				isExpanded={expandedPanel === 3}
				onContinue={() => setExpandedPanel(4)}
				className={`
					swdc-transition-all swdc-duration-300 swdc-overflow-hidden
					${
						expandedPanel === 0
							? 'swdc-h-auto swdc-opacity-100'
							: 'swdc-h-[48px] swdc-opacity-75'
					}
				`}
			/>
		</div>
	);
}
export default CheckoutProcessList;