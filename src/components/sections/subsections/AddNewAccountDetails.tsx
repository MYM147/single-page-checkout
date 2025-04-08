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

const AddNewAccountDetails = () => {
	// State for account dropdown
	const [isAccountOpen, setIsAccountOpen] = useState(false);
	const [selectedAccount, setSelectedAccount] = useState(accountNumbers[0]);

	// State for job account dropdown
	const [isJobAccountOpen, setIsJobAccountOpen] = useState(false);
	const [selectedJobAccount, setSelectedJobAccount] = useState(jobAccounts[0]);

	return (
		<>
			<div className="swdc-w-full">
				<p>Account</p>
				{/* Custom Account Dropdown */}
				<div className="swdc-relative swdc-mt-1">
					<div
						onClick={() => setIsAccountOpen(!isAccountOpen)}
						className="swdc-cursor-pointer swdc-border swdc-p-2"
					>
						<div className="swdc-flex swdc-items-center swdc-justify-between">
							<div className="swdc-truncate swdc-font-medium">
								{selectedAccount.accountNumber}
							</div>
							{isAccountOpen ? (
								<IconRegularCaretUp className="swdc-flex-shrink-0" />
							) : (
								<IconRegularCaretDown className="swdc-flex-shrink-0" />
							)}
						</div>
					</div>

					{isAccountOpen && (
						<div className="swdc-border-top-[0px] swdc-absolute swdc-z-50 swdc-w-full swdc-border-x swdc-border-b swdc-bg-white">
							{accountNumbers.map((account) => (
								<div
									key={account.accountNumber}
									onClick={() => {
										setSelectedAccount(account);
										setIsAccountOpen(false);
									}}
									className="hover:swdc-bg-gray-100 swdc-cursor-pointer swdc-p-2 hover:swdc-bg-[#f6f6f6]"
								>
									<div className="swdc-truncate swdc-font-medium">
										{account.accountNumber}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			<div className="swdc-mt-4 swdc-w-full">
				<p>Job Account</p>
				{/* Custom Job Account Dropdown */}
				<div className="swdc-relative swdc-mt-1">
					<div
						onClick={() => setIsJobAccountOpen(!isJobAccountOpen)}
						className="swdc-cursor-pointer swdc-border swdc-p-2"
					>
						<div className="swdc-flex swdc-items-center swdc-justify-between">
							<div className="swdc-truncate swdc-font-medium">
								{selectedJobAccount.jobAccountName}
							</div>
							{isJobAccountOpen ? (
								<IconRegularCaretUp className="swdc-flex-shrink-0" />
							) : (
								<IconRegularCaretDown className="swdc-flex-shrink-0" />
							)}
						</div>
					</div>

					{isJobAccountOpen && (
						<div className="swdc-border-top-[0px] swdc-absolute swdc-z-50 swdc-w-full swdc-border-x swdc-border-b swdc-bg-white">
							{jobAccounts.map((job) => (
								<div
									key={job.jobAccountName}
									onClick={() => {
										setSelectedJobAccount(job);
										setIsJobAccountOpen(false);
									}}
									className="hover:swdc-bg-gray-100 swdc-cursor-pointer swdc-p-2 hover:swdc-bg-[#f6f6f6]"
								>
									<div className="swdc-truncate swdc-font-medium">
										{job.jobAccountName}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			<div className="swdc-mt-4 swdc-w-full">
				<InputGroup label="Job or Project Name/PO" maxLength={20}>
					<Input className="swdc-mt-1 swdc-font-medium"></Input>
				</InputGroup>
			</div>
			<div className="swdc-mt-2 swdc-flex swdc-w-3/4 swdc-items-center swdc-gap-2 swdc-bg-[#EEC46F] swdc-p-2">
				<IconRegularInformation />
				<p className="swdc-text-sm">
					Changing accounts may affect pricing and product availability.
				</p>
			</div>
			<div className="swdc-mt-4 swdc-flex swdc-justify-start swdc-gap-2">
				<Button>Save and Continue</Button>
				<Button polarity="dark" variant="outlined">
					Cancel
				</Button>
			</div>
		</>
	);
};

export default AddNewAccountDetails;
