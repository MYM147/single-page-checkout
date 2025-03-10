import { Input, InputGroup } from '@prism/dropcloth';

interface Props {
	title?: string;
	text?: string;
	label?: string;
	maxLength?: number;
	onChange: (value: string) => void;
	value: string;
}

const SpecialInstructions = ({
	title,
	text,
	label,
	maxLength,
	onChange,
	value,
}: Props) => {
	return (
		<div className="swdc-mt-6">
			<h3 className="swdc-font-bold swdc-uppercase">{title}</h3>
			<p className="swdc-pt-2 md:swdc-pt-0">{text}</p>
			<InputGroup label={`${label}`} maxLength={100} className="swdc-h-10">
				<Input
					className="swdc-h-10"
					maxLength={maxLength}
					onChange={(e) => onChange(e.target.value)}
					value={value}
				/>
			</InputGroup>
		</div>
	);
};

export default SpecialInstructions;
