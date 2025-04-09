import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	setExpanded,
	setSaved,
	updateContactDetails,
} from '../../store/slices/contactSlice';
import { ContactDetails } from '../../types';
import SectionTitle from '../global/SectionTitle';
import ContactDetailsForm from '../sections/subsections/ContactDetailsForm';
import ContactDetailsSummary from './subsections/ContactDetailsSummary';

type Props = {
	className?: string;
	onContinue: () => void;
	onEdit: () => void;
	isActive?: boolean; // New prop to control whether this component is active
};

const ContactDetailsMenu = ({
	className,
	onContinue,
	onEdit,
	isActive = false,
}: Props) => {
	const dispatch = useAppDispatch();
	const { isExpanded, isSaved, contactDetails } = useAppSelector(
		(state) => state.contact
	);

	const handleContactDetailsChange = (newDetails: Partial<ContactDetails>) => {
		dispatch(updateContactDetails(newDetails));
	};

	const handleContinue = () => {
		dispatch(setExpanded(false));
		dispatch(setSaved(true));
		onContinue();
	};

	return (
		<div
			className={`swdc-bg-[#fff] swdc-px-3 swdc-py-4 swdc-drop-shadow-md lg:swdc-pl-6 lg:swdc-pr-6 ${className} swdc-w-full`}
		>
			<SectionTitle
				onEdit={() => {
					dispatch(setSaved(false));
					dispatch(setExpanded(true));
					onEdit();
				}}
				title='Contact Details'
				showEdit={!isExpanded && isSaved}
			/>
			{isExpanded && isActive && (
				<ContactDetailsForm
					onContinue={handleContinue}
					onSelectionsChange={handleContactDetailsChange}
					selections={contactDetails}
					setIsSaved={(value: boolean) => dispatch(setSaved(value))}
				/>
			)}
			{!isExpanded && isSaved && (
				<ContactDetailsSummary contactDetails={contactDetails} />
			)}
		</div>
	);
};

export default ContactDetailsMenu;
