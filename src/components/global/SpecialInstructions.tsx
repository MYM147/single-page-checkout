import { Input, InputGroup } from '@prism/dropcloth';

interface Props {
	label?: string;
	maxLength?: number;
	onChange: (value: string) => void;
	text?: string;
	title?: string;
	value: string;
}

const SpecialInstructions = ({
	label,
	maxLength,
	onChange,
	text,
	title,
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
