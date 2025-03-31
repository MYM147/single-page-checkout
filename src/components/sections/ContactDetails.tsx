import { Button, Input } from '@prism/dropcloth';
import { useState } from 'react';
import { Selections } from '../../types';
import SectionTitle from '../global/SectionTitle';
import PickupPersonMenu from '../pickup/PickupPersonMenu';

type Props = {
	className: string;
	isExpanded: boolean;
	onContinue: () => void;
	onEdit: () => void;
	onPersonDetailsChange: (details: {
		email: string;
		firstName: string;
		lastName: string;
		phone: string;
	}) => void;
	selectedPerson:
		| {
				firstName: string;
				lastName: string;
				email: string;
				phone: string;
		  }
		| undefined;
	onSelectionChange: (selection: string, details?: any) => void;
	pickupPersonDetails?: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
	};

	selections: Selections;
};

const ContactDetails = ({
	className,
	isExpanded,
	onContinue,
	onEdit,
	onSelectionChange,
	pickupPersonDetails,
	selections,
	onPersonDetailsChange,
}: Props) => {
	return (
		<div
			className={`swdc-bg-[#fff] swdc-py-4 swdc-pl-6 swdc-pr-6 swdc-drop-shadow-md ${className}`}
		>
			<SectionTitle title="Contact Details" />

			{isExpanded && (
				<>
					{/* <PickupPersonMenu selectedPerson={pickupPersonDetails} /> */}
					<Button onClick={onContinue} className="swdc-mt-6">
						Save and Continue
					</Button>
				</>
			)}
		</div>
	);
};

export default ContactDetails;
