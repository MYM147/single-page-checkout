import SectionTitle from '../global/SectionTitle';
import PickupOrDeliverySelector from '../global/PickupOrDeliverySelector';

type Props = {};

const FulfillmentOptions = ({}: Props) => {
	return (
		<div className='swdc-py-10 swdc-pr-20 swdc-pl-10 bg-[#fff]'>
			<SectionTitle title='Fulfillment Options' />
      <PickupOrDeliverySelector />
    </div>
	);
};

export default FulfillmentOptions;
