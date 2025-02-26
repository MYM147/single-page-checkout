import { Button } from '@prism/dropcloth';
import OrderSummaryDetails from '../global/FulfillmentSummaryDetails';
import SectionTitle from '../global/SectionTitle';
// import { saveOrderDetails } from '../utils/orderUtils';

type Props = {
	isExpanded: boolean;
	onContinue: () => void;
	className?: string;
};

const AccountDetails = ({ isExpanded, onContinue, className }: Props) => {
	return (
		<div
			className={`swdc-bg-[#fff] swdc-py-4 swdc-pl-6 swdc-pr-6 swdc-drop-shadow-md ${className}`}
		>
			<SectionTitle title="Account Details" />
			{isExpanded && (
				<>
					<Button onClick={onContinue} className="swdc-mt-6">
						Save and Continue
					</Button>
				</>
			)}
		</div>
	);
};

export default AccountDetails;
