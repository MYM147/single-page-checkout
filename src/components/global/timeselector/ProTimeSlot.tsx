import { IconRegularTruck, Radio } from '@prism/dropcloth';
import logo from '/public/assets/logo-sm.png';

type Props = {
	courierType: 'Sherwin-Williams Delivery' | 'Local Courier';
	selectedValue: string;
	name: string;
	onSelect: (value: string) => void;
	price?: number;
	text?: string;
	title: string;
	value: string;
	uniqueId: string;
};

const ProTimeSlot = ({
	courierType,
	selectedValue,
	name,
	onSelect,
	text,
	title,
	uniqueId,
	value,
}: Props) => {
	const isSelected = selectedValue === uniqueId;

	const handleClick = () => {
		onSelect(value);
	};

	return (
		<div className="swdc-mt-2 swdc-flex swdc-flex-shrink-0 swdc-gap-4 md:swdc-mt-0">
			<div className="swdc-relative swdc-w-full">
				<Radio
					className="swdc-has-[input:checked]:swdc-rounded-[2px] swdc-w-full swdc-items-center swdc-rounded-[1px] swdc-border-2 swdc-transition-all swdc-duration-200 has-[input:checked]:swdc-border-[3px] has-[input:checked]:swdc-border-[#2F2F30] md:swdc-flex md:swdc-border-[#2F2F30]/[0.45] md:swdc-p-1"
					checked={isSelected}
					name={name}
					onChange={() => onSelect(value)}
					value={value}
				>
					<div className="swdc-flex swdc-w-full swdc-flex-col swdc-justify-between swdc-py-1">
						<div className="swdc-flex swdc-flex-col swdc-px-2">
							<p className="swdc-text-[10px] swdc-font-bold swdc-uppercase swdc-text-[#6d6d6e]">
								{courierType}
							</p>
							<p className="swdc-text-lg swdc-font-medium md:swdc-text-base">
								{title}
							</p>
							{text && (
								<p className="swdc-text-sm swdc-text-[#6d6d6e]">{text}</p>
							)}
						</div>
					</div>
				</Radio>

				{!isSelected && (
					<div
						className="swdc-absolute swdc-left-[10px] swdc-top-1/2 swdc-z-10 swdc-translate-y-[-50%] swdc-transform swdc-cursor-pointer"
						onClick={() => handleClick}
					>
						{courierType === 'Sherwin-Williams Delivery' ? (
							<div className="swdc-flex swdc-items-center swdc-justify-center">
								<img
									src={logo}
									className="swdc-relative swdc-left-[8px] swdc-w-[25px] swdc-object-contain"
									alt="Sherwin Williams"
								/>
							</div>
						) : (
							<IconRegularTruck className="swdc-icon-2 swdc-relative swdc-left-1 swdc-text-[#2F2F30]" />
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default ProTimeSlot;
