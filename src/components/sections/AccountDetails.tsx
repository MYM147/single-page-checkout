import { Button, IconRegularCaretRight, Input, InputGroup } from '@prism/dropcloth';
import { useState } from 'react';
import SectionTitle from '../global/SectionTitle';
import AddNewAccountDetails from './subsections/AddNewAccountDetails';

type Props = {
	className?: string;
	isExpanded: boolean;
	onContinue: () => void;
};

const AccountDetails = ({ className, isExpanded, onContinue }: Props) => {
	const [usedAccountNumber, setUsedAccountNumber] = useState(true);

	const changeAccountNumber = () => {
		setUsedAccountNumber(false);
	};

	return (
		<div
			className={`swdc-bg-[#fff] swdc-py-4 swdc-pl-6 swdc-pr-6 swdc-drop-shadow-md ${className}`}
		>
			<SectionTitle title="Account Details" />
			{isExpanded && (
				<>
					{usedAccountNumber ? (
						<>
							<div className="swdc-mt-4 swdc-flex swdc-items-center swdc-justify-between swdc-bg-[#f6f6f6] swdc-p-3">
								<div>
									<p className="swdc-text-lg swdc-font-bold">
										This order belongs to:
									</p>
									<p className="swdc-text-[ #2F2F30]">
										Account: 2954512447 - EXAMPLE ACCOUNT
									</p>
									<p className="swdc-text-[ #2F2F30]">
										Job account: 01-EXAMPLE JOB ACCOUNT
									</p>
								</div>
								<div className="swdc-flex swdc-items-center swdc-font-bold">
									<Button
										kind="standard"
										polarity="dark"
										variant="text"
										className="swdc-text-sm swdc-normal-case"
										onClick={changeAccountNumber}
									>
										Change account
									</Button>
									<IconRegularCaretRight className="swdc-w-2 swdc-font-bold" />
								</div>
							</div>
							<div className="swdc-mt-4">
								<InputGroup
									label="Job or Project Name/PO (optional)"
									maxLength={20}
								>
									<Input />
								</InputGroup>
							</div>
							<Button className="swdc-mt-6" onClick={onContinue}>
								Save and Continue
							</Button>
						</>
					) : (
						<AddNewAccountDetails />
					)}
				</>
			)}
		</div>
	);
};

export default AccountDetails;
