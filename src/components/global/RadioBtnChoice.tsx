import { Radio } from '@prism/dropcloth';
import { useEffect, useState } from 'react';
import { type FulfillmentSelections } from '../../types';
import PickupPersonMenu from '../pickup/PickupPersonMenu';
import { weekDates } from '../utils/dateUtils';
import PickupDateMenu from './dateSelectMenu/DateSelectMenu';

type PickupPersonDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type PickupDateDetails = string | Date | null;

type Props = {
  name2: string;
  name: string;
  onSelectionChange: (selection: string, details?: PickupPersonDetails | PickupDateDetails) => void;
  onSelectionsChange: (selections: FulfillmentSelections) => void;
  option2: string;
  option: string;
  pickupDate?: string;
  pickupDateSelection: string | null;
  pickupPerson?: string;
  pickupPersonDetails?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  selections: FulfillmentSelections;
  text?: string;
  title: string;
  value2: string;
  value: string;
};

const RadioBtnChoice = ({
	name,
	name2,
	onSelectionChange,
	option,
	option2,
	pickupDate,
	pickupDateSelection,
	pickupPerson,
	pickupPersonDetails,
	selections,
	text,
	title,
	value,
	value2,
}: Props) => {
	const [selectedOption, setSelectedOption] = useState(
		pickupPerson || pickupDate || ''
	);

	useEffect(() => {
		if (name2 === 'pickup-date' && selectedOption === 'as-soon-as-possible') {
			onSelectionChange(
				selectedOption,
				weekDates[0].toLocaleDateString('en-US')
			);
		}
	}, [selectedOption, name2]);

	return (
		<div className='swdc-mt-6'>
			<h3 className='swdc-text-base swdc-font-bold swdc-uppercase'>{title}</h3>
			{text && <p className='swdc-mt-2'>{text}</p>}
			<div className='swdc-pt-2'>
				<Radio
					className='hover:swdc-bg-[#fff]'
					checked={selectedOption === value}
					name={`${name}`}
					onChange={(e) => {
						setSelectedOption(e.target.value);
						onSelectionChange(e.target.value);
					}}
					value={`${value}`}
				>
					{option}
				</Radio>
				<br />
				<Radio
					className='hover:swdc-bg-[#fff]'
					checked={selectedOption === value2}
					name={`${name2}`}
					onChange={(e) => {
						setSelectedOption(e.target.value);
						if (e.target.value === 'as-soon-as-possible') {
							onSelectionChange(e.target.value, weekDates[0]);
						} else {
							onSelectionChange(e.target.value);
						}
					}}
					value={`${value2}`}
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
							onSelectionChange('on-a-specific-day', date);
						}}
						selectedDate={pickupDateSelection ?? null}
						selectedTimeSlot={selections.deliveryTimeSlot}
						selections={selections}
						onSelectionsChange={(newSelections) => {
							onSelectionChange(
								'on-a-specific-day',
								newSelections.pickupDateSelection || undefined
							);
						}}
					/>
				)}
			</div>
		</div>
	);
};
export default RadioBtnChoice;
