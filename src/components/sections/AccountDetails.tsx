import { Button, IconRegularCaretRight, Input, InputGroup } from '@prism/dropcloth';
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
					<div className="swdc-mt-4 swdc-flex swdc-items-center swdc-justify-between swdc-bg-[#f6f6f6] swdc-p-3">
						<div>
							<p className="swdc-text-lg swdc-font-bold">
								This order belongs to:
							</p>
							<p className="swdc-text-[ #2F2F30]">
								Account: 2954512447 - EXAMPLE ACCOUNT
							</p>
							<p className="swdc-text-[ #2F2F30]">Jo  account: 01-EXAMPLE JOB
								ACCOUNT
							</p>
						</div>
						<div className="swdc-flex swdc-font-bold">
							<p>Change account</p>
							<IconRegularCaretRight className="swdc-ml-1 swdc-w-2 swdc-font-bold" />
						</div>
					</div>
					<div className='swdc-mt-4'>
						<InputGroup
							label='Job or Project Name/PO (optional)'
							maxLength={20}
						>
							<Input/>
						</InputGroup>
					</div>
					<Button className="swdc-mt-6" onClick={onContinue}>
						Save and Continue
					</Button>
				</>
			)}
		</div>
	);
};

export default AccountDetails;
