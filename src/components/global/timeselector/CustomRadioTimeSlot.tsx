import { IconRegularDone, IconRegularTruck } from '@prism/dropcloth';
import logo from '../../../assets/logo-sm.png';

type Props = {
	courierType: 'Sherwin-Williams Delivery' | 'Local Courier';
	selectedValue: string;
	name: string;
	onSelect: (value: string) => void;
	text?: string;
	title: string;
	uniqueId: string;
	value: string;
};

const CustomRadioTimeSlot = ({
	courierType,
	selectedValue,
	name,
	onSelect,
	title,
	uniqueId,
	value,
}: Props) => {
	// Check if this slot is selected by comparing uniqueId with selectedValue
	const isSelected = selectedValue === uniqueId;

	console.log(
		`Slot ${uniqueId}: isSelected=${isSelected}, selectedValue=${selectedValue}`
	);

	// Handle click on the entire component
	const handleClick = () => {
		console.log(`Clicking slot ${uniqueId} with value ${value}`);
		onSelect(uniqueId); // Pass uniqueId instead of value
	};

	return (
		<div className='swdc-mt-0 swdc-flex swdc-flex-shrink-0 swdc-gap-4'>
			<div
				className={`swdc-relative swdc-w-full swdc-cursor-pointer swdc-rounded-[2px] swdc-border-2 swdc-p-3 swdc-transition-all swdc-duration-200 ${
					isSelected
						? 'swdc-border-[3px] swdc-border-[#2F2F30]'
						: 'swdc-border swdc-border-[#2F2F30]/[0.45]'
				}`}
				onClick={handleClick}
				role='radio'
				aria-checked={isSelected}
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						handleClick();
					}
				}}
			>
				{/* Hidden actual radio input for accessibility */}
				<input
					type='radio'
					className='swdc-sr-only'
					name={name}
					value={uniqueId} // Use uniqueId for the radio value
					checked={isSelected}
					onChange={handleClick}
				/>

				{/* Content container */}
				<div className='swdc-flex swdc-w-full swdc-flex-col swdc-justify-between'>
					{/* Icon area - show check icon when selected, courier icon when not selected */}
					<div className='swdc-absolute swdc-left-3 swdc-top-3'>
						{isSelected ? (
							<div className='swdc-flex swdc-h-4 swdc-w-4 swdc-items-center swdc-justify-center swdc-rounded-full swdc-bg-[#2F2F30]'>
								<IconRegularDone className='swdc-icon-1 swdc-fill-white' />
							</div>
						) : (
							<>
								{courierType === 'Sherwin-Williams Delivery' ? (
									<img
										src={logo}
										className='swdc-relative swdc-bottom-[10px] swdc-left-[5px] swdc-w-[25px]'
										alt='Sherwin Williams'
									/>
								) : (
									<IconRegularTruck className='swdc-icon-2 swdc-relative swdc-top-[2px] swdc-text-[#6d6d6e]' />
								)}
							</>
						)}
					</div>

					{/* Text content - shifted right to make room for icon */}
					<div className='swdc-ml-7 swdc-flex swdc-flex-col'>
						<p className='swdc-text-[13px] swdc-font-bold swdc-uppercase swdc-text-[#6d6d6e] md:swdc-text-[10px]'>
							{courierType}
						</p>
						<p className='swdc-text-lg swdc-font-medium md:swdc-text-base'>
							{title}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CustomRadioTimeSlot;
