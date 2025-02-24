import { Input, InputGroup } from '@prism/dropcloth';

interface Props {
	title?: string;
	text?: string;
	label?: string;
	maxLength?: number;
}

const SpecialInstructions = ({ title, text, label, maxLength }: Props) => {
	return (
		<div className="swdc-mt-6">
			<h3 className="swdc-text-base swdc-font-bold swdc-uppercase">{title}</h3>
			<p>{text}</p>
			<InputGroup label={`${label}`} maxLength={100} className="swdc-h-10">
				<Input maxLength={maxLength} className="swdc-h-10" />
			</InputGroup>
		</div>
	);
};

export default SpecialInstructions;
