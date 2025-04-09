import {
	Button,
	IconRegularCaretDown,
	IconRegularCaretUp,
	IconRegularInformation,
	Input,
	InputGroup,
} from '@prism/dropcloth';
import { useState } from 'react';
import { accountNumbers, jobAccounts } from '../../utils/accountUtils';

type AddNewAccountDetailsProps = {
	onSave: (data: {
		accountNumber: string;
		jobAccountName: string;
		projectName: string;
	}) => void;
	onCancel: () => void;
};

const AddNewAccountDetails = ({
	onSave,
	onCancel,
}: AddNewAccountDetailsProps) => {
	// State for account dropdown
	const [isAccountOpen, setIsAccountOpen] = useState(false);
	const [selectedAccount, setSelectedAccount] = useState(accountNumbers[0]);

	// State for job account dropdown
	const [isJobAccountOpen, setIsJobAccountOpen] = useState(false);
	const [selectedJobAccount, setSelectedJobAccount] = useState(jobAccounts[0]);

	// State for project name input
	const [projectName, setProjectName] = useState('');
	const [isProjectNameValid, setIsProjectNameValid] = useState(true);
	const [validationError, setValidationError] = useState('');

	// Validate project name for HTML and SQL injection
	const validateProjectName = (value: string) => {
		const htmlRegex = /<[^>]*>/;
		const sqlRegex =
			/(\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|EXEC|UNION|CREATE|WHERE)\b)|('--)|(\b(OR|AND)\b\s+\d+\s*=\s*\d+)/i;

		if (htmlRegex.test(value)) {
			setIsProjectNameValid(false);
			setValidationError('HTML tags are not allowed');
			return false;
		}

		if (sqlRegex.test(value)) {
			setIsProjectNameValid(false);
			setValidationError('Invalid characters detected');
			return false;
		}

		setIsProjectNameValid(true);
		setValidationError('');
		return true;
	};

	// Handle project name change
	const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setProjectName(value);
		validateProjectName(value);
	};

	const handleSave = () => {
		if (isProjectNameValid) {
			onSave({
				accountNumber: selectedAccount.accountNumber,
				jobAccountName: selectedJobAccount.jobAccountName,
				projectName: projectName,
			});
		}
	};

	return (
		<>
			<div className='swdc-w-full'>
				<p>Account</p>
				{/* Custom Account Dropdown */}
				<div className='swdc-relative swdc-mt-1'>
					<div
						onClick={() => setIsAccountOpen(!isAccountOpen)}
						className='swdc-cursor-pointer swdc-border swdc-p-2'
					>
						<div className='swdc-flex swdc-items-center swdc-justify-between'>
							<div className='swdc-truncate swdc-font-medium'>
								{selectedAccount.accountNumber}
							</div>
							{isAccountOpen ? (
								<IconRegularCaretUp className='swdc-flex-shrink-0' />
							) : (
								<IconRegularCaretDown className='swdc-flex-shrink-0' />
							)}
						</div>
					</div>

					{isAccountOpen && (
						<div className='swdc-border-top-[0px] swdc-absolute swdc-z-50 swdc-w-full swdc-border-x swdc-border-b swdc-bg-white'>
							{accountNumbers.map((account) => (
								<div
									key={account.accountNumber}
									onClick={() => {
										setSelectedAccount(account);
										setIsAccountOpen(false);
									}}
									className='hover:swdc-bg-gray-100 swdc-cursor-pointer swdc-p-2 hover:swdc-bg-[#f6f6f6]'
								>
									<div className='swdc-truncate swdc-font-medium'>
										{account.accountNumber}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			<div className='swdc-mt-4 swdc-w-full'>
				<p>Job Account</p>
				{/* Custom Job Account Dropdown */}
				<div className='swdc-relative swdc-mt-1'>
					<div
						onClick={() => setIsJobAccountOpen(!isJobAccountOpen)}
						className='swdc-cursor-pointer swdc-border swdc-p-2'
					>
						<div className='swdc-flex swdc-items-center swdc-justify-between'>
							<div className='swdc-truncate swdc-font-medium'>
								{selectedJobAccount.jobAccountName}
							</div>
							{isJobAccountOpen ? (
								<IconRegularCaretUp className='swdc-flex-shrink-0' />
							) : (
								<IconRegularCaretDown className='swdc-flex-shrink-0' />
							)}
						</div>
					</div>

					{isJobAccountOpen && (
						<div className='swdc-border-top-[0px] swdc-absolute swdc-z-50 swdc-w-full swdc-border-x swdc-border-b swdc-bg-white'>
							{jobAccounts.map((job) => (
								<div
									key={job.jobAccountName}
									onClick={() => {
										setSelectedJobAccount(job);
										setIsJobAccountOpen(false);
									}}
									className='hover:swdc-bg-gray-100 swdc-cursor-pointer swdc-p-2 hover:swdc-bg-[#f6f6f6]'
								>
									<div className='swdc-truncate swdc-font-medium'>
										{job.jobAccountName}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			<div className='swdc-mt-4 swdc-w-full'>
				<InputGroup
					label='Job or Project Name/PO'
					maxLength={20}
					error={!isProjectNameValid}
				>
					<Input
						className='swdc-mt-1 swdc-font-medium'
						value={projectName}
						onChange={handleProjectNameChange}
						error={!isProjectNameValid}
					/>
				</InputGroup>
				{!isProjectNameValid && (
					<p className='swdc-mt-1 swdc-text-sm swdc-text-red-500'>{validationError}</p>
				)}
			</div>
			<div className='swdc-mt-2 swdc-flex md:swdc-w-3/4 swdc-items-center swdc-gap-2 swdc-bg-[#EEC46F] swdc-p-2'>
				<IconRegularInformation className='swdc-icon-3' />
				<p>
					Changing accounts may affect pricing and product availability.
				</p>
			</div>
			<div className='swdc-mt-4 swdc-flex swdc-justify-start swdc-gap-2'>
				<Button onClick={handleSave} disabled={!isProjectNameValid}>
					Save and Continue
				</Button>
				<Button polarity='dark' variant='outlined' onClick={onCancel}>
					Cancel
				</Button>
			</div>
		</>
	);
};

export default AddNewAccountDetails;
