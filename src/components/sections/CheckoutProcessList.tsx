import AccountDetails from './AccountDetails';
import ContactDetails from './ContactDetails';
import FulfillmentOptions from './FulfillmentOptions';
import PaymentMethod from './PaymentMethod';

const CheckoutProcessList = () => {
  return (
		<div className='swdc-flex swdc-flex-col swdc-gap-4 swdc-w-[752px]'>
			<FulfillmentOptions />
			<AccountDetails />
      <ContactDetails />
      <PaymentMethod />
		</div>
	);
}
export default CheckoutProcessList;