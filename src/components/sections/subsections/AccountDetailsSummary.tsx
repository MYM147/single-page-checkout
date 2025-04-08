import { IconRegularCalendar, IconRegularProjectUser } from '@prism/dropcloth';

type AccountDetailsSummaryProps = {
	accountDetails: {
		accountNumber: string;
		accountName: string;
		jobAccountName: string;
		projectName: string;
	};
};

const AccountDetailsSummary = ({
	accountDetails,
}: AccountDetailsSummaryProps) => {
	const defaultAccountDetails = {
		accountNumber: '',
		accountName: '',
		jobAccountName: '',
		projectName: '',
	};

	const details = accountDetails || defaultAccountDetails;

	return (
		<>
			<div className="swdc-flex">
				<IconRegularProjectUser className="swdc-flex-shrink-0" />
				<div className="swdc-ml-1">
					<p className="swdc-font-bold swdc-uppercase">
						Account &amp; Job Account
					</p>
					<p className="swdc-mt-1">{`${details.accountNumber} - ${details.accountName}`}</p>
					<p className="swdc-mt-1">{`Job account: ${details.jobAccountName}`}</p>
				</div>
			</div>
      <div className="swdc-my-4 swdc-flex">
        <IconRegularCalendar className="swdc-flex-shrink-0" />
        <div className="swdc-ml-1">
          <p className="swdc-font-bold swdc-uppercase">Project</p>
          <p>{details.projectName || 'N/A'}</p>
        </div>
      </div>
		</>
	);
};

export default AccountDetailsSummary;
