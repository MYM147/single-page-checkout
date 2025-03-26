import { useState } from 'react';
import { type Selections } from '../../../types';
import ProTimeSlot from './ProTimeSlot';

type CourierType = 'S-W Delivery' | 'Local Courier';
type FilterType = 'All Couriers' | CourierType;

type TimeSlotData = {
	courierType: CourierType;
	deliveryIsFree?: boolean;
	price?: number;
	text: string;
	title: string;
	value: string;
};

type Props = {
	defaultValue?: string;
	onSelect: (value: string) => void;
	selections: Selections;
	timeSlots: TimeSlotData[];
};

const ProTimeSelector = ({ defaultValue, onSelect, timeSlots }: Props) => {
	const [activeFilter, setActiveFilter] = useState<FilterType>('All Couriers');

	// Filter time slots based on selected filter
	const filteredTimeSlots = timeSlots.filter(
		(slot) =>
			activeFilter === 'All Couriers' || slot.courierType === activeFilter
	);

	return (
		<div className="swdc-flex swdc-flex-col swdc-gap-4">
			{/* Filter buttons */}
			<div className="swdc-flex swdc-items-center swdc-justify-between">
				<h3 className="swdc-text-base swdc-font-medium">Time</h3>
				<div className="swdc-flex swdc-gap-2">
					{(
						['All Couriers', 'S-W Delivery', 'Local Courier'] as FilterType[]
					).map((filter) => (
						<button
							key={filter}
							onClick={() => setActiveFilter(filter)}
							className={`swdc-rounded-[2px] swdc-px-3 swdc-py-1 swdc-text-sm swdc-transition-colors ${
								activeFilter === filter
									? 'swdc-bg-[#2F2F30] swdc-text-white'
									: 'swdc-border swdc-border-[#2F2F30]/[0.45] swdc-text-[#2F2F30] hover:swdc-bg-[#f6f6f6]'
							}`}
						>
							{filter}
						</button>
					))}
				</div>
			</div>

			{/* Time slots grid */}
			<div className="swdc-grid swdc-grid-cols-1 swdc-gap-4 md:swdc-grid-cols-2">
				{filteredTimeSlots.map((slot, index) => (
					<ProTimeSlot
						key={index}
						courierType={slot.courierType}
						defaultValue={defaultValue}
						deliveryIsFree={slot.deliveryIsFree}
						name="delivery-time-slot"
						onSelect={onSelect}
						price={slot.price}
						text={slot.text}
						title={slot.title}
						value={slot.value}
					/>
				))}
			</div>
		</div>
	);
};

export default ProTimeSelector;
