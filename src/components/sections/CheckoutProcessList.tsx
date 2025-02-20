import { useState } from 'react';
import AccountDetails from './AccountDetails';
import ContactDetails from './ContactDetails';
import FulfillmentOptions from './FulfillmentOptions';
import PaymentMethod from './PaymentMethod';



const CheckoutProcessList = () => {
	const [expandedPanel, setExpandedPanel] = useState(0);

  return (
		<div className='swdc-flex swdc-flex-col swdc-gap-4 swdc-w-[752px]'>
			<FulfillmentOptions
				isExpanded={expandedPanel === 0}
				onContinue={() => setExpandedPanel(1)}
				className={`
					swdc-transition-all swdc-duration-300
					${expandedPanel === 0 ? 'swdc-h-auto' : 'swdc-h-8'} 
					swdc-overflow-hidden
				`}
			/>

			<ContactDetails
				isExpanded={expandedPanel === 1}
				onContinue={() => setExpandedPanel(2)}
				className={`
					swdc-transition-all swdc-duration-300
					${expandedPanel === 1 ? 'swdc-h-auto' : 'swdc-h-8'}
					swdc-overflow-hidden
				`}
			/>

			<AccountDetails
				isExpanded={expandedPanel === 2}
				onContinue={() => setExpandedPanel(3)}
				className={`
					swdc-transition-all swdc-duration-300
					${expandedPanel === 2 ? 'swdc-h-auto' : 'swdc-h-8'}
					swdc-overflow-hidden
				`}
			/>

			<PaymentMethod
				isExpanded={expandedPanel === 3}
				onContinue={() => setExpandedPanel(4)}
				className={`
					swdc-transition-all swdc-duration-300
					${expandedPanel === 3 ? 'swdc-h-auto' : 'swdc-h-8'}
					swdc-overflow-hidden
				`}
			/>
		</div>
	);
}
export default CheckoutProcessList;