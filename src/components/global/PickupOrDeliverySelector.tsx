import { Radio } from '@prism/dropcloth';

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
	return (
		<div className="has-large-radio swdc-flex swdc-flex-shrink-0 swdc-gap-4">
			<Radio
				name={`${name}`}
				onChange={(e) => onSelect(e.target.value)}
				value={`${value}`}
				defaultChecked={true}
				className="swdc-has-[input:checked]:swdc-rounded-[2px] swdc-block swdc-w-1/2 swdc-items-center swdc-rounded-[1px] swdc-border-2 swdc-p-3 swdc-pb-2 swdc-transition-all swdc-duration-200 has-[input:checked]:swdc-border-[3px] has-[input:checked]:swdc-border-[#2F2F30] md:swdc-flex lg:swdc-w-[300px] lg:swdc-border-[#2F2F30]/[0.45] lg:swdc-p-1"
			>
				<div className="swdc-pt-1 md:swdc-p-0">
					<p className="swdc-text-lg swdc-font-medium lg:swdc-text-base">
						{title}
					</p>
					<p className="swdc-leading-tight lg:swdc-text-[12px]">{text}</p>
				</div>
			</Radio>

			<Radio
				name={`${name2}`}
				onChange={(e) => onSelect(e.target.value)}
				value={`${value2}`}
				className="swdc-has-[input:checked]:swdc-rounded-[2px] swdc-block swdc-w-1/2 swdc-items-center swdc-rounded-[1px] swdc-border-2 swdc-p-3 swdc-pb-2 swdc-transition-all swdc-duration-200 has-[input:checked]:swdc-border-[3px] has-[input:checked]:swdc-border-[#2F2F30] md:swdc-flex lg:swdc-w-[300px] lg:swdc-border-[#2F2F30]/[0.45] lg:swdc-p-1"
			>
				<div className="swdc-pt-1 md:swdc-p-0">
					<p className="swdc-text-lg swdc-font-medium lg:swdc-text-base">
						{title2}
					</p>
					<p className="swdc-leading-tight lg:swdc-text-[12px]">{text2}</p>
				</div>
			</Radio>
		</div>
	);
};

export default PickupOrDeliverySelector;
