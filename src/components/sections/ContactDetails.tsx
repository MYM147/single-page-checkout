import { Button } from '@prism/dropcloth';
import SectionTitle from '../global/SectionTitle';
// import OrderSummaryDetails from './subsections/OrderSummaryDetails';

type Props = {
	isExpanded: boolean;
	onContinue: () => void;
	className?: string;
};

const ContactDetails = ({ isExpanded, onContinue, className }: Props) => {
	return (
		<div
			className={`swdc-bg-[#fff] swdc-py-4 swdc-pl-6 swdc-pr-6 swdc-drop-shadow-md ${className}`}
		>
			<SectionTitle title="Contact Details" />
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

export default ContactDetails;
