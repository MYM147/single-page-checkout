import { IconRegularTruck, Radio } from '@prism/dropcloth';
import logo from '/public/assets/logo-sm.png';

type Props = {
	courierType: 'Sherwin-Williams Delivery' | 'Local Courier';
	defaultValue?: string;
	name: string;
	onSelect: (value: string) => void;
	price?: number;
	title: string;
	value: string;
};

const ProTimeSlot = ({
	courierType,
	defaultValue,
	name,
	onSelect,
	title,
	value,
}: Props) => {
	return (
		<div className="swdc-mt-2 swdc-flex swdc-flex-shrink-0 swdc-gap-4 md:swdc-mt-0">
			<Radio
				className="swdc-has-[input:checked]:swdc-rounded-[2px] swdc-w-full swdc-items-center swdc-rounded-[1px] swdc-border-2 swdc-p-3 swdc-pb-2 swdc-transition-all swdc-duration-200 has-[input:checked]:swdc-border-[3px] has-[input:checked]:swdc-border-[#2F2F30] md:swdc-flex md:swdc-border-[#2F2F30]/[0.45] md:swdc-p-1"
				checked={defaultValue === value}
				name={name}
				onChange={(e) => onSelect(e.target.value)}
				value={value}
			>
				{courierType === 'Sherwin-Williams Delivery' ? (
					<img src={logo} className="swdc-absolute swdc-left-[9px] swdc-w-3" />
				) : (
					<IconRegularTruck className="swdc-icon-2 swdc-absolute swdc-left-[9px] swdc-w-3" />
				)}

				<div className="swdc-flex swdc-w-full swdc-flex-col swdc-justify-between">
					<div className="swdc-flex swdc-flex-col swdc-px-2">
						<p className="swdc-text-xs swdc-font-medium swdc-text-[#6d6d6e]">
							{courierType}
						</p>
						<p className="swdc-text-lg swdc-font-medium md:swdc-text-base">
							{title}
						</p>
					</div>
				</div>
			</Radio>
		</div>
	);
};

export default ProTimeSlot;
