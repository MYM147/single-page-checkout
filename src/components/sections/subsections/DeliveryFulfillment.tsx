import { useLayout } from '../../../context/LayoutContext';
import { type Selections } from '../../../types';
import DIYLayout from '../../layouts/DiyLayout';
import PROLayout from '../../layouts/PROLayout';

type Props = {
	onContinue: () => void;
	onSelectionsChange: (selections: Selections) => void;
	selections: Selections;
	setIsSaved: (value: boolean) => void;
};

const DeliveryFulfillment = ({
	onContinue,
	onSelectionsChange,
	selections,
	setIsSaved,
}: Props) => {
	const { layoutType } = useLayout();
	return (
		<>
			{layoutType === 'DIY' ? (
				<DIYLayout
					onContinue={onContinue}
					onSelectionsChange={onSelectionsChange}
					selections={selections}
					setIsSaved={setIsSaved}
				/>
			) : (
				<PROLayout
					onContinue={onContinue}
					onSelectionsChange={onSelectionsChange}
					selections={selections}
					setIsSaved={setIsSaved}
				/>
			)}
		</>
	);
};

export default DeliveryFulfillment;
