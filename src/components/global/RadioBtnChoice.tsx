import { Radio } from '@prism/dropcloth';
import { useEffect, useState } from 'react';
import { weekDates } from '../utils/dateUtils';
import PickupDateMenu from './PickupDateMenu';
import PickupPersonMenu from './PickupPersonMenu';

type Props = {
	name: string;
	name2: string;
	option: string;
	option2: string;
	text?: string;
	title: string;
	value: string;
	value2: string;
	pickupPerson?: string;
	pickupPersonDetails?: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
	};
	pickupDate?: string;
	pickupDateSelection?: string | null;
	onSelectionChange: (selection: string, details?: any) => void;
};

const RadioBtnChoice = ({
	name,
	name2,
	onSelectionChange,
	option,
	option2,
	text,
	title,
	value,
	value2,
	pickupPerson,
	pickupPersonDetails,
	pickupDate,
	pickupDateSelection,
}: Props) => {
	const [selectedOption, setSelectedOption] = useState(
		pickupPerson || pickupDate || ''
	);

	useEffect(() => {
		if (name2 === 'pickup-date' && selectedOption === 'as-soon-as-possible') {
			onSelectionChange(selectedOption, weekDates[0]);
		}
	}, [selectedOption, name2, onSelectionChange, weekDates]);

	return (
		<div className="swdc-mt-6">
			<h3 className="swdc-text-base swdc-font-bold swdc-uppercase">{title}</h3>			{text && <p className="swdc-mt-2">{text}</p>}
			<div className="swdc-pt-2">
				<Radio
					className="hover:swdc-bg-[#fff]"
					onChange={(e) => {
						setSelectedOption(e.target.value);
						onSelectionChange(e.target.value);
					}}
					name={`${name}`}
					value={`${value}`}
					checked={selectedOption === value}
				>
					{option}
				</Radio>
				<br />
				<Radio
					className="hover:swdc-bg-[#fff]"
					onChange={(e) => {
						setSelectedOption(e.target.value);
						if (e.target.value === 'as-soon-as-possible') {
							onSelectionChange(e.target.value, weekDates[0]);
						} else {
							onSelectionChange(e.target.value);
						}
					}}
					name={`${name2}`}
					value={`${value2}`}
					checked={selectedOption === value2}
				>
					{option2}
				</Radio>
				{name === 'pickup-person' && selectedOption === 'someone-else' && (
					<PickupPersonMenu
						onPersonDetailsChange={(details) => {
							onSelectionChange(selectedOption, details);
						}}
						selectedPerson={pickupPersonDetails}
					/>
				)}
				{name2 === 'pickup-date' && selectedOption === 'on-a-specific-day' && (
					<PickupDateMenu
						onDateSelect={(date) => {
							onSelectionChange(selectedOption, date);
						}}
						selectedDate={pickupDateSelection}
					/>
				)}
			</div>
		</div>
	);
};

export default RadioBtnChoice;
