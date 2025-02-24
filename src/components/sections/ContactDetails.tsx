import { Button } from '@prism/dropcloth';
import SectionTitle from '../global/SectionTitle';
import { saveOrderDetails } from '../utils/orderUtils';

type Props = {
	isExpanded: boolean;
	onContinue: () => void;
	className?: string;
};

const ContactDetails = ({ isExpanded, onContinue, className }: Props) => {
	return (
		<div className={`swdc-py-10 swdc-pr-20 swdc-pl-10 bg-[#fff] ${className}`}>
			<SectionTitle title='Contact Details' />
			{isExpanded && (
				<>
					<Button onClick={onContinue} className='swdc-mt-6'>
						Save and Continue
					</Button>
				</>
			)}
		</div>
	);
};

export default ContactDetails;