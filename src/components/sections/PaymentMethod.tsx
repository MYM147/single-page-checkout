import { Button } from '@prism/dropcloth';
import SectionTitle from '../global/SectionTitle';

type Props = {
	className?: string;
	isExpanded: boolean;
	onContinue: () => void;
};

const PaymentMethod = ({ className, isExpanded, onContinue }: Props) => {
	return (
		<div
			className={`swdc-bg-[#fff] swdc-py-4 swdc-pl-6 swdc-pr-6 swdc-drop-shadow-md ${className}`}
		>
			<SectionTitle title="Payment Method" />
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

export default PaymentMethod;
