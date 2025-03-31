import { Input, InputGroup } from '@prism/dropcloth';
import { useState } from 'react';

interface Props {
	label?: string;
	maxLength: number;
	onChange: (value: string) => void;
	text?: string;
	title?: string;
	value?: string;
}

const SpecialInstructions = ({
	maxLength,
	onChange,
	text,
	title,
	value,
}: Props) => {
	const [isValid, setIsValid] = useState(true);

	const validateInstructions = (text: string, maxLength: number) => {
		const instructionsRegex = /^[a-zA-Z0-9\s.,!?()-]+$/;
		return !text || (text.length <= maxLength && instructionsRegex.test(text));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const valid = validateInstructions(value, maxLength || 100);
		setIsValid(valid);

		if (valid) {
			onChange(value);
		}
	};

	return (
		<div className="swdc-mt-6">
			<h3 className="swdc-font-bold swdc-uppercase">{title}</h3>
			<p className="swdc-pt-2 md:swdc-pt-0">{text}</p>
			<InputGroup label="" maxLength={100} className="swdc-h-10">
				<Input
					className="swdc-h-10"
					maxLength={maxLength}
					onChange={handleChange}
					value={value}
				/>
			</InputGroup>
			{!isValid && (
				<span className="swdc-text-sm swdc-text-[#93324C]">
					Please enter only letters, numbers, and basic punctuation
				</span>
			)}
		</div>
	);
};

export default SpecialInstructions;
