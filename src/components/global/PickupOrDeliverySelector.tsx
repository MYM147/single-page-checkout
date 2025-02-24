import { Radio } from '@prism/dropcloth';
import { useState } from 'react';

type Props = {
	name?: string;
	name2?: string;
	text?: string;
	text2?: string;
	title: string;
	title2: string;
	value?: string;
	value2?: string;
	onSelect: (value: string) => void;
};

const PickupOrDeliverySelector = ({
	name,
	name2,
	text,
	text2,
	title,
	title2,
	value,
	value2,
	onSelect,
}: Props) => {
	const [selectedOption, setSelectedOption] = useState('pickup');

	return (
		<div className="swdc-mt-12 swdc-flex swdc-flex-shrink-0 swdc-gap-4">
			<Radio
				name={`${name}`}
				onChange={(e) => onSelect(e.target.value)}
				value={`${value}`}
				defaultChecked={true}
				className="swdc-w-[300px] swdc-items-center swdc-rounded-[1px] swdc-border swdc-border-[#2F2F30]/[0.45] swdc-transition-all swdc-duration-200 has-[input:checked]:swdc-rounded-[2px] has-[input:checked]:swdc-border-[3px] has-[input:checked]:swdc-border-[#2F2F30]"
			>
				<div>
					<p className="swdc-text-base swdc-font-medium">{title}</p>
					<p>{text}</p>
				</div>
			</Radio>

			<Radio
				name={`${name2}`}
				onChange={(e) => onSelect(e.target.value)}
				value={`${value2}`}
				className="swdc-w-[300px] swdc-items-center swdc-rounded-[1px] swdc-border swdc-border-[#2F2F30]/[0.45] swdc-transition-all swdc-duration-200 has-[input:checked]:swdc-rounded-[2px] has-[input:checked]:swdc-border-[3px] has-[input:checked]:swdc-border-[#2F2F30]"
			>
				<div>
					<p className="swdc-text-base swdc-font-medium">{title2}</p>
					<p>{text2}</p>
				</div>
			</Radio>
		</div>
	);
};

export default PickupOrDeliverySelector;
