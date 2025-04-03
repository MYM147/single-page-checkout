import { useEffect, useState } from 'react';
import { Selections } from '../../types';
import SectionTitle from '../global/SectionTitle';
import ContactDetailsForm from '../sections/subsections/ContactDetailsForm';
import ContactDetailsSummary from './subsections/ContactDetailsSummary';

type Props = {
	className?: string;
	isExpanded: boolean;
	onContinue: () => void;
	onEdit: () => void;
	onSelectionsChange: (selections: Selections) => void;
	selections: Selections;
};

const ContactDetailsMenu = ({
	className,
	isExpanded,
	onContinue,
	onEdit,
	onSelectionsChange,
	selections,
}: Props) => {
	const [isSaved, setIsSaved] = useState(false);

	useEffect(() => {
		if (!isExpanded) {
			setIsSaved(false);
		}
	}, [isExpanded]);

	const defaultContactDetails = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
	};

	const contactDetails = selections.contactDetails || defaultContactDetails;

	return (
		<div
			className={`swdc-bg-[#fff] swdc-px-3 swdc-py-4 swdc-drop-shadow-md lg:swdc-pl-6 lg:swdc-pr-6 ${className} swdc-w-full`}
		>
			<SectionTitle
				onEdit={() => {
					setIsSaved(false);
					onEdit();
				}}
				title="Contact Details"
				showEdit={isSaved}
			/>
			{isExpanded && (
				<ContactDetailsForm
					onContinue={() => {
						setIsSaved(true);
						onContinue();
					}}
					onSelectionsChange={onSelectionsChange}
					selections={selections}
					setIsSaved={setIsSaved}
				/>
			)}
				{!isExpanded && (
					<ContactDetailsSummary contactDetails={contactDetails} />
				)}
		</div>
	);
};

export default ContactDetailsMenu;
