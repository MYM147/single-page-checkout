import { Radio } from '@prism/dropcloth';

type Props = {
	defaultValue?: string;
	name?: string;
	name2?: string;
	text?: string;
	text2?: string;
	title: string;
	title2: string;
	value?: string;
	value2?: string;
	onSelect: (value: string) => void;
	disabled?: boolean;
};

const PickupOrDeliverySelector = ({
	defaultValue,
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
				defaultChecked={defaultValue === value}
				name={`${name}`}
				onChange={(e) => onSelect(e.target.value)}
				value={value}
				className="swdc-has-[input:checked]:swdc-rounded-[2px] swdc-block swdc-w-1/2 swdc-items-center swdc-rounded-[1px] swdc-border-2 swdc-p-3 swdc-pb-2 swdc-transition-all swdc-duration-200 has-[input:checked]:swdc-border-[3px] has-[input:checked]:swdc-border-[#2F2F30] md:swdc-flex lg:swdc-w-[300px] lg:swdc-border-[#2F2F30]/[0.45] lg:swdc-p-1"
			>
				<div
					className={`swdc-flex swdc-w-full swdc-items-center swdc-justify-between md:swdc-p-0 ${name === 'delivery' ? 'md:swdc-p-1' : ''}`}
				>
					<div className="swdc-justify-between">
						<p className="swdc-text-lg swdc-font-medium lg:swdc-text-base">
							{title}
						</p>
						<p className="swdc-leading-tight lg:swdc-text-[12px]">{text}</p>
					</div>
					{name === 'delivery' && (
						<div className="swdc-flex swdc-h-full swdc-rounded-[2px] swdc-bg-[#edece6] swdc-px-[6px] swdc-py-[4px] swdc-text-xs swdc-font-bold">
							$25
						</div>
					)}
				</div>
			</Radio>

			<Radio
				defaultChecked={defaultValue === value2}
				name={`${name2}`}
				onChange={(e) => onSelect(e.target.value)}
				value={value2}
				className="swdc-has-[input:checked]:swdc-rounded-[2px] swdc-block swdc-w-1/2 swdc-items-center swdc-rounded-[1px] swdc-border-2 swdc-p-3 swdc-pb-2 swdc-transition-all swdc-duration-200 has-[input:checked]:swdc-border-[3px] has-[input:checked]:swdc-border-[#2F2F30] md:swdc-flex lg:swdc-w-[300px] lg:swdc-border-[#2F2F30]/[0.45] lg:swdc-p-1"
			>
				<div
					className={`swdc-flex swdc-w-full swdc-items-center swdc-justify-between md:swdc-p-0 ${name === 'delivery' ? 'md:swdc-p-1' : ''}`}
				>
					<div className="swdc-justify-between">
						<p className="swdc-text-lg swdc-font-medium lg:swdc-text-base">
							{title2}
						</p>
						<p className="swdc-leading-tight lg:swdc-text-[12px]">{text2}</p>
					</div>
					{name === 'delivery' && (
						<div className="swdc-flex">
							<div className="swdc-rounded-[2px] swdc-bg-[#f8f8f6] swdc-px-[6px] swdc-py-[4px] swdc-text-xs swdc-font-bold swdc-text-[#b0b0b0] swdc-line-through">
								$25
							</div>
							<div className="swdc-text-[ #466c5b] swdc-ml-1 swdc-rounded-[2px] swdc-bg-[#dae4df] swdc-px-[6px] swdc-py-[4px] swdc-text-xs swdc-font-bold">
								FREE
							</div>
						</div>
					)}
				</div>
			</Radio>
		</div>
	);
};

export default PickupOrDeliverySelector;
