import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	setExpanded,
	setSaved,
	updateSelections,
} from '../../store/slices/contactDetailsSlice';
import SectionTitle from '../global/SectionTitle';
import ContactDetailsForm from '../sections/subsections/ContactDetailsForm';
import ContactDetailsSummary from './subsections/ContactDetailsSummary';

type Props = {
	className?: string;
	onContinue: () => void;
	onEdit: () => void;
};

const ContactDetailsMenu = ({ className, onContinue, onEdit }: Props) => {
	const dispatch = useAppDispatch();
	const { isExpanded, isSaved, selections } = useAppSelector(
		(state) => state.contactDetails
	);

	useEffect(() => {
		if (!isExpanded) {
			dispatch(setSaved(false));
		}
	}, [isExpanded, dispatch]);

	const handleSelectionsChange = (newSelections: Partial<Selections>) => {
		dispatch(updateSelections(newSelections));
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
				title="Contact Details"
				showEdit={!isExpanded && isSaved}
			/>
			{isExpanded && (
				<ContactDetailsForm
					onContinue={handleContinue}
					onSelectionsChange={handleSelectionsChange}
					selections={selections}
					setIsSaved={(value: boolean) => dispatch(setSaved(value))}
				/>
			)}
			{!isExpanded && isSaved && (
				<ContactDetailsSummary contactDetails={selections.contactDetails} />
			)}
		</div>
	);
};

export default ContactDetailsMenu;
