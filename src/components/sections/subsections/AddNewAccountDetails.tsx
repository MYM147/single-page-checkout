import {
  Button,
  IconRegularInformation,
  Input,
  InputGroup,
  Select,
} from '@prism/dropcloth';

type Props = {
	accountNumber: string;
	jobAccount: string;
};

const AddNewAccountDetails = ({accountNumber, jobAccount}: Props) => {
	return (
		<>
			<div className="swdc-w-full">
				<p>Account</p>
				<Select className="swdc-mt-1 swdc-w-full">
					<option value="account-1">{accountNumber}</option>
				</Select>
			</div>
			<div className="swdc-mt-4 swdc-w-full">
				<p>Job Account</p>
				<Select className="swdc-mt-1 swdc-w-full">
					<option value="job-account-1">{jobAccount}</option>
				</Select>
			</div>
			<div className="swdc-mt-4 swdc-w-full">
				<InputGroup label="Job or Project Name/PO" maxLength={20}>
					<Input className="swdc-mt-1"></Input>
				</InputGroup>
			</div>
			<div className="swdc-mt-2 swdc-flex swdc-bg-[#EEC46F] swdc-p-2 swdc-items-center swdc-gap-2 swdc-w-3/4">

        <IconRegularInformation />
				<p className='swdc-text-sm'>Changing accounts may affect pricing and product availability</p>
			</div>
			<div className="swdc-mt-4 swdc-flex swdc-justify-start swdc-gap-2">
				<Button>Save and Continue</Button>
				<Button polarity='dark' variant='outlined'>Cancel</Button>
			</div>
		</>
	);
}

export default AddNewAccountDetails;