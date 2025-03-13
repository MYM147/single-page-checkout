import { Radio } from '@prism/dropcloth';

type Props = {
	defaultValue?: string;
	name2: string;
	name: string;
	onSelect: (value: string) => void;
	text2: string;
	text: string;
	title2: string;
	title: string;
	value2: string;
	value: string;
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
		<>
			<div
				className={`has-large-radio swdc-flex swdc-w-full swdc-flex-shrink-0 swdc-gap-4 md:swdc-mt-0 ${name === 'delivery-time' ? 'swdc-mt-2 swdc-flex-col md:swdc-flex-row' : ''}`}
			>
				<Radio
					defaultChecked={defaultValue === value}
					name={`${name}`}
					onChange={(e) => onSelect(e.target.value)}
					value={value}
					className={`swdc-has-[input:checked]:swdc-rounded-[2px] swdc-w-full swdc-items-center swdc-rounded-[1px] swdc-border-2 swdc-p-3 swdc-pb-2 swdc-transition-all swdc-duration-200 has-[input:checked]:swdc-border-[3px] has-[input:checked]:swdc-border-[#2F2F30] md:swdc-flex md:swdc-w-[300px] md:swdc-border-[#2F2F30]/[0.45] md:swdc-p-1 ${name === 'pickup' ? 'swdc-block swdc-w-1/2 md:swdc-flex' : 'swdc-flex swdc-w-full'}`}
				>
					<div
						className={`swdc-w-full swdc-justify-between md:swdc-p-0 ${name === 'pickup' ? 'swdc-w-full swdc-flex-col swdc-pt-1' : 'swdc-flex swdc-items-center'}`}
					>
						<div>
							<p className="swdc-text-lg swdc-font-medium md:swdc-text-base">
								{title}
							</p>
							<p
								className={`swdc-leading-tight md:swdc-text-[12px] md:swdc-font-normal ${name === 'delivery-time' ? 'swdc-text-sm swdc-font-medium' : ''}`}
							>
								{text}
							</p>
						</div>
					</div>
				</Radio>

				<Radio
					defaultChecked={defaultValue === value2}
					name={`${name2}`}
					onChange={(e) => onSelect(e.target.value)}
					value={value2}
					className={`swdc-has-[input:checked]:swdc-rounded-[2px] swdc-w-full swdc-items-center swdc-rounded-[1px] swdc-border-2 swdc-p-3 swdc-pb-2 swdc-transition-all swdc-duration-200 has-[input:checked]:swdc-border-[3px] has-[input:checked]:swdc-border-[#2F2F30] md:swdc-flex md:swdc-w-[300px] md:swdc-border-[#2F2F30]/[0.45] md:swdc-p-1 ${name === 'pickup' ? 'swdc-block swdc-w-full md:swdc-flex' : ''}`}
				>
					<div
						className={`swdc-flex swdc-w-full swdc-justify-between md:swdc-p-0 ${name === 'pickup' ? 'swdc swdc-w-full swdc-flex-col swdc-pt-1' : 'swdc-items-center'}`}
					>
						<div>
							<p className="swdc-text-lg swdc-font-medium md:swdc-text-base">
								{title2}
							</p>
							<p
								className={`swdc-leading-tight md:swdc-text-[12px] md:swdc-font-normal ${name === 'delivery-time' ? 'swdc-text-sm swdc-font-medium' : ''}`}
							>
								{text2}
							</p>
						</div>
					</div>
				</Radio>
			</div>
		</>
	);
};

export default PickupOrDeliverySelector;
