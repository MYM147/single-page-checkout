import {
	IconRegularEnvelope,
	IconRegularPerson,
	IconRegularSmartphone,
} from '@prism/dropcloth';

type Props = {
	contactDetails: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
	};
};

const ContactDetailsSummary = ({ contactDetails }: Props) => {
	const defaultContactDetails = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
	};

	const details = contactDetails || defaultContactDetails;

	return (
		<div className='swdc-pt-4 swdc-pb-5'>
			<div className="swdc-flex">
				<IconRegularPerson />
				<div className="swdc-ml-1">
					<p>{`${details.firstName} ${details.lastName}`}</p>
				</div>
			</div>
			<div className="swdc-mt-3 swdc-flex">
				<IconRegularEnvelope />
				<div className="swdc-ml-1">
					<p>{details.email}</p>
				</div>
			</div>
			<div className="swdc-mt-3 swdc-flex">
				<IconRegularSmartphone />
				<div className="swdc-ml-1">
					<p>{details.phone}</p>
				</div>
			</div>
		</div>
	);
};

export default ContactDetailsSummary;
