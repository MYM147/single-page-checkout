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

	const handleSaveAndContinue = () => {
		setIsSaved(true);
		onContinue();
	};

	// This is the key function that needs to be fixed
	const handleEdit = () => {
		setIsSaved(false);
		onEdit(); // This should trigger the parent to expand this section
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
									<div className="swdc-mt-4 swdc-flex swdc-items-center swdc-justify-between swdc-bg-[#f6f6f6] swdc-p-3">
										<div>
											<p className="swdc-text-lg swdc-font-bold">
												This order belongs to:
											</p>
											<p className="swdc-text-[ #2F2F30]">
												Account: {accountData.accountNumber} -{' '}
												{accountData.accountName}
											</p>
											<p className="swdc-text-[ #2F2F30]">
												Job account: {accountData.jobAccountName}
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
											<Input
												value={accountData.projectName}
												onChange={handleProjectNameChange}
											/>
										</InputGroup>
									</div>
									<Button className="swdc-mt-6" onClick={handleSaveAndContinue}>
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
