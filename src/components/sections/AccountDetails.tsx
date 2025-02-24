import { Button } from '@prism/dropcloth';
import SectionTitle from '../global/SectionTitle';
// import { saveOrderDetails } from '../utils/orderUtils';

type Props = {
	isExpanded: boolean;
	onContinue: () => void;
	className?: string;
};

const AccountDetails = ({ isExpanded, onContinue, className }: Props) => {
	return (
		<div className={`swdc-pr-20 bg-[#fff] swdc-py-10 swdc-pl-10 ${className}`}>
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
