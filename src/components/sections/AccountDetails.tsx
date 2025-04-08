import {
	Button,
	IconRegularCaretRight,
	Input,
	InputGroup,
} from '@prism/dropcloth';
import { useState } from 'react';
import SectionTitle from '../global/SectionTitle';
import AccountDetailsSummary from './subsections/AccountDetailsSummary';
import AddNewAccountDetails from './subsections/AddNewAccountDetails';

type Props = {
	className?: string;
	isExpanded: boolean;
	onContinue: () => void;
	onEdit: () => void;
	isActive?: boolean; // Add this to match ContactDetailsMenu pattern
};

const AccountDetails = ({
	className,
	isExpanded,
	onContinue,
	onEdit,
	isActive = true, // Default to true if not provided
}: Props) => {
	const [usedAccountNumber, setUsedAccountNumber] = useState(true);
	const [isSaved, setIsSaved] = useState(false);
	const [accountData, setAccountData] = useState({
		accountNumber: '2954512447',
		accountName: 'EXAMPLE ACCOUNT',
		jobAccountName: '01-EXAMPLE JOB ACCOUNT',
		projectName: '',
	});

	const changeAccountNumber = () => {
		setUsedAccountNumber(false);
		setIsSaved(false);
	};

	const handleSaveNewAccount = (data: {
		accountNumber: string;
		jobAccountName: string;
		projectName: string;
	}) => {
		setAccountData({
			...accountData,
			accountNumber: data.accountNumber,
			jobAccountName: data.jobAccountName,
			projectName: data.projectName,
		});
		setUsedAccountNumber(true);
		setIsSaved(false);
	};

	const handleCancelNewAccount = () => {
		setUsedAccountNumber(true);
	};

	const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAccountData({
			...accountData,
			projectName: e.target.value,
		});
	};

	const handleEdit = () => {
		setIsSaved(false);
		onEdit();
	};

	return (
		<div
			className={`swdc-bg-[#fff] swdc-py-4 swdc-pl-6 swdc-pr-6 swdc-drop-shadow-md ${className}`}
		>
			<SectionTitle
				title="Account Details"
				showEdit={!isExpanded && isSaved}
				onEdit={handleEdit}
			/>
			{isExpanded && isActive ? (
				<>
					{isSaved ? (
						<AccountDetailsSummary accountDetails={accountData} />
					) : (
						<>
							{usedAccountNumber ? (
								<>
									<div className="swdc-mt-4 swdc-items-center swdc-justify-between swdc-bg-[#f6f6f6] swdc-p-3 swdc-text-center md:swdc-flex md:swdc-text-left">
										<div className="swdc-items-center">
											<p className="swdc-text-lg swdc-font-bold">
												This order belongs to:
											</p>
											<p className="swdc-text-[ #2F2F30] swdc-pt-2 md:swdc-pt-0">
												Account: {accountData.accountNumber} -{' '}
												{accountData.accountName}
											</p>
											<p className="swdc-text-[ #2F2F30]">
												Job account: {accountData.jobAccountName}
											</p>
										</div>
										<div className="swdc-flex swdc-items-center">
											<Button
												kind="standard"
												polarity="dark"
												variant="text"
												className="swdc-text-sm swdc-normal-case hover:swdc-bg-transparent swdc-font-bold"
												onClick={changeAccountNumber}
											>
												Change account <span className='swdc-w-2 swdc-text-lg swdc-font-medium'>&gt;</span>
											</Button>
										</div>
									</div>
									<div className="swdc-mt-4">
										<InputGroup
											label="Job or Project Name/PO (optional)"
											maxLength={20}
										>
											<Input
												value={accountData.projectName}
												onChange={handleProjectNameChange}
											/>
										</InputGroup>
									</div>
									<Button
										className="swdc-mt-6 swdc-w-full md:swdc-w-[250px]"
										onClick={() => {
											setIsSaved(true);
											onContinue();
										}}
									>
										Save and Continue
									</Button>
								</>
							) : (
								<AddNewAccountDetails
									onSave={handleSaveNewAccount}
									onCancel={handleCancelNewAccount}
								/>
							)}
						</>
					)}
				</>
			) : (
				isSaved && <AccountDetailsSummary accountDetails={accountData} />
			)}
		</div>
	);
};

export default AccountDetails;
