import { Button } from '@prism/dropcloth';
import SectionTitle from '../global/SectionTitle';

type Props = {
	isExpanded: boolean;
	onContinue: () => void;
	className?: string;
};

const PaymentMethod = ({ isExpanded, onContinue, className }: Props) => {
	return (
		<div className={`pr-20 bg-[#fff] py-10 pl-10 ${className}`}>
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
