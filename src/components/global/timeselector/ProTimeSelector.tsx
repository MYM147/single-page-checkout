import { IconRegularTruck } from '@prism/dropcloth';
import { useEffect, useState } from 'react';
import { type Selections } from '../../../types';
import CustomRadioTimeSlot from './CustomRadioTimeSlot';
import logo from '/public/assets/logo-sm.png';

type CourierType = 'Sherwin-Williams Delivery' | 'Local Courier';
type FilterType = 'All Couriers' | 'S-W Delivery' | 'Local Courier';

const filterToCourierMap: Record<FilterType, CourierType | 'All'> = {
	'All Couriers': 'All',
	'S-W Delivery': 'Sherwin-Williams Delivery',
	'Local Courier': 'Local Courier',
};

type TimeSlotData = {
	courierType: CourierType;
	price?: number; // Keep this optional but we won't use it
	text?: string;
	title?: string;
	value: string;
};

type Props = {
	selectedValue: string;
	onSelect: (value: string) => void;
	selections: Selections;
	timeSlots: TimeSlotData[];
};

const ProTimeSelector = ({ selectedValue, onSelect, timeSlots }: Props) => {
	const [activeFilter, setActiveFilter] = useState<FilterType>('All Couriers');
	const [localSelectedValue, setLocalSelectedValue] = useState(selectedValue);

	// Keep local state in sync with prop
	useEffect(() => {
		setLocalSelectedValue(selectedValue);
	}, [selectedValue]);

	// Handle selection with a wrapper function to ensure consistent behavior
	const handleSelect = (value: string) => {
		console.log('Selected time slot:', value);
		// Update local state immediately for responsive UI
		setLocalSelectedValue(value);
		// Call the parent's onSelect function
		onSelect(value);
	};

	const filteredTimeSlots = timeSlots.filter((slot) => {
		const mappedCourierType = filterToCourierMap[activeFilter];
		return (
			mappedCourierType === 'All' || slot.courierType === mappedCourierType
		);
	});

	// Generate stable uniqueIds for each time slot
	const timeSlotIds = filteredTimeSlots.map((slot, index) => ({
		...slot,
		uniqueId: `${slot.value}-${index}`,
	}));

	console.log('Current selectedValue:', selectedValue);
	console.log('Local selectedValue:', localSelectedValue);

	return (
		<div className="swdc-mt-4 swdc-flex swdc-flex-col swdc-gap-3">
			<div className="swdc-items-left swdc-flex swdc-items-center swdc-justify-between">
				<h3>Time*</h3>
				<div className="swdc-items-right swdc-flex swdc-justify-end swdc-self-stretch">
					{(
						['All Couriers', 'S-W Delivery', 'Local Courier'] as FilterType[]
					).map((filter) => (
						<button
							key={filter}
							onClick={() => setActiveFilter(filter)}
							className={`swdc-ml-1 swdc-flex swdc-items-center swdc-gap-[10px] swdc-rounded-2xl swdc-px-[16px] swdc-py-[8px] swdc-text-sm swdc-transition-colors focus:swdc-bg-[#000] focus:swdc-text-[#fff] active:swdc-bg-[#000] active:swdc-text-[#fff] ${
								activeFilter === filter
									? 'swdc-bg-[#2F2F30] swdc-text-white'
									: 'swdc-border swdc-border-[#2F2F30]/[0.45] swdc-bg-[#f6f6f6] swdc-text-[#2F2F30] hover:swdc-bg-[#f6f6f6]'
							}`}
						>
							{filter === 'S-W Delivery' && (
								<img
									src={logo}
									className="swdc-w-[16px]"
									alt="Sherwin Williams"
								/>
							)}
							{filter === 'Local Courier' && (
								<IconRegularTruck
									className={`swdc-h-4 swdc-w-4 ${
										activeFilter === 'Local Courier'
											? 'swdc-fill-white swdc-text-white'
											: 'swdc-fill-[#2F2F30] swdc-text-[#2F2F30]'
									}`}
								/>
							)}
							<span
								className={`swdc-font-medium swdc-uppercase ${
									activeFilter === filter
										? 'swdc-text-white'
										: 'swdc-text-[#2F2F30]'
								}`}
							>
								{filter}
							</span>
						</button>
					))}
				</div>
			</div>

			<div className="swdc-grid swdc-grid-cols-1 swdc-gap-4 md:swdc-grid-cols-2">
				{timeSlotIds.map((slot) => (
					<CustomRadioTimeSlot
						key={slot.uniqueId}
						courierType={slot.courierType}
						selectedValue={localSelectedValue}
						name="delivery-time-slot"
						onSelect={handleSelect}
						title={slot.title || ''}
						value={slot.value}
						uniqueId={slot.uniqueId}
					/>
				))}
			</div>
		</div>
	);
};

export default ProTimeSelector;
