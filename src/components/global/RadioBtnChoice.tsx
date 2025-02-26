import { Radio } from '@prism/dropcloth';
import { useState } from 'react';
// import { useForm } from 'react-hook-form';
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
}: Props) => {
	const [selectedOption, setSelectedOption] = useState('');

	return (
		<div className="swdc-mt-6">
			<h3 className="swdc-text-base swdc-font-bold swdc-uppercase">{title}</h3>
			{text && <p className="swdc-mt-2">{text}</p>}
			<div className="swdc-pt-2">
				<Radio
					className="hover:swdc-bg-[#fff]"
					onChange={(e) => {
						setSelectedOption(e.target.value);
						onSelectionChange(e.target.value);
					}}
					name={`${name}`}
					value={`${value}`}
				>
					{option}
				</Radio>
				<br />
				<Radio
					className="hover:swdc-bg-[#fff]"
					onChange={(e) => {
						setSelectedOption(e.target.value);
						onSelectionChange(e.target.value);
					}}
					name={`${name2}`}
					value={`${value2}`}
				>
					{option2}
				</Radio>

				{name2 === 'pickup-person' && selectedOption === 'someone-else' && (
					<PickupPersonMenu
						onPersonDetailsChange={(details) => {
							onSelectionChange(selectedOption, details);
						}}
					/>
				)}

				{name2 === 'pickup-date' && selectedOption === 'on-a-specific-day' && (
					<PickupDateMenu
						onDateSelect={(date) => {
							onSelectionChange(selectedOption, date);
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default RadioBtnChoice;
