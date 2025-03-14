import { Button } from '@prism/dropcloth';
import SectionTitle from '../global/SectionTitle';

type Props = {
	className?: string;
	isExpanded: boolean;
	onContinue: () => void;
};

const AccountDetails = ({ className, isExpanded, onContinue }: Props) => {
	return (
		<div
			className={`swdc-bg-[#fff] swdc-py-4 swdc-pl-6 swdc-pr-6 swdc-drop-shadow-md ${className}`}
		>
			<SectionTitle title="Account Details" />
			{isExpanded && (
				<>
					<Button className="swdc-mt-6" onClick={onContinue}>
						Save and Continue
					</Button>
				</>
			)}
		</div>
	);
};

export default AccountDetails;
