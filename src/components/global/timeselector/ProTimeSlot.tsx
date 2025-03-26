import { Radio } from '@prism/dropcloth';
import { useState } from 'react';

type Props = {
	courierType: 'S-W Delivery' | 'Local Courier';
	defaultValue?: string;
	deliveryIsFree?: boolean;
	name: string;
	onSelect: (value: string) => void;
	price?: number;
	text: string;
	title: string;
	value: string;
};

const ProTimeSlot = ({
	courierType,
	defaultValue,
	deliveryIsFree,
	name,
	onSelect,
	price,
	text,
	title,
	value,
}: Props) => {
	const [freeDelivery] = useState(deliveryIsFree);

	return (
		<div className="swdc-mt-2 swdc-flex swdc-flex-shrink-0 swdc-gap-4 md:swdc-mt-0">
			<Radio
				className="swdc-has-[input:checked]:swdc-rounded-[2px] swdc-w-full swdc-items-center swdc-rounded-[1px] swdc-border-2 swdc-p-3 swdc-pb-2 swdc-transition-all swdc-duration-200 has-[input:checked]:swdc-border-[3px] has-[input:checked]:swdc-border-[#2F2F30] md:swdc-flex md:swdc-border-[#2F2F30]/[0.45] md:swdc-p-1"
				checked={defaultValue === value}
				name={name}
				onChange={(e) => onSelect(e.target.value)}
				value={value}
			>
				<div className="swdc-flex swdc-w-full swdc-flex-col swdc-justify-between md:swdc-p-0">
					<div className="swdc-flex swdc-flex-col">
						{/* Courier type in small text */}
						<p className="swdc-text-xs swdc-font-medium swdc-text-[#6d6d6e]">
							{courierType}
						</p>
						{/* Time frame in large text */}
						<p className="swdc-text-lg swdc-font-medium md:swdc-text-base">
							{title}
						</p>
						<p className="swdc-leading-tight md:swdc-text-[12px] md:swdc-font-normal">
							{text}
						</p>
					</div>
					{!freeDelivery ? (
						<div className="swdc-h-full swdc-rounded-[2px] swdc-bg-[#edece6] swdc-px-[6px] swdc-py-[4px] swdc-text-xs swdc-font-bold">
							${price}
						</div>
					) : (
						<div className="swdc-flex">
							<div className="swdc-rounded-[2px] swdc-bg-[#f8f8f6] swdc-px-[6px] swdc-py-[4px] swdc-text-xs swdc-font-bold swdc-text-[#b0b0b0] swdc-line-through">
								${price}
							</div>
							<div className="swdc-ml-1 swdc-rounded-[2px] swdc-bg-[#dae4df] swdc-px-[6px] swdc-py-[4px] swdc-text-xs swdc-font-bold swdc-text-[#466c5b]">
								FREE
							</div>
						</div>
					)}
				</div>
			</Radio>
		</div>
	);
};

export default ProTimeSlot;
