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
		<div>
			<div className="swdc-flex">
				<IconRegularPerson />
				<div className="swdc-ml-1">
					<h3 className="swdc-text-base swdc-font-bold swdc-uppercase">Name</h3>
					<p>{`${details.firstName} ${details.lastName}`}</p>
				</div>
			</div>
			<div className="swdc-mt-3 swdc-flex">
				<IconRegularEnvelope />
				<div className="swdc-ml-1">
					<h3 className="swdc-text-base swdc-font-bold swdc-uppercase">
						Email
					</h3>
					<p>{details.email}</p>
				</div>
			</div>
			<div className="swdc-mt-3 swdc-flex">
				<IconRegularSmartphone />
				<div className="swdc-ml-1">
					<h3 className="swdc-text-base swdc-font-bold swdc-uppercase">
						Phone
					</h3>
					<p>{details.phone}</p>
				</div>
			</div>
		</div>
	);
};

export default ContactDetailsSummary;
