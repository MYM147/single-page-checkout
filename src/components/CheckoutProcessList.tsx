import AccountDetails from './sections/AccountDetails';
import ContactDetails from './sections/ContactDetails';
import FulfillmentOptions from './sections/FulfillmentOptions';
import PaymentMethod from './sections/PaymentMethod';

const CheckoutProcessList = () => {
  return (
		<>
			<FulfillmentOptions />
			<AccountDetails />
      <ContactDetails />
      <PaymentMethod />
		</>
	);
}
export default CheckoutProcessList;