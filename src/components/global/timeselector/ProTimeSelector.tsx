import { IconRegularTruck } from '@prism/dropcloth';
import { useState } from 'react';
import { type Selections } from '../../../types';
import ProTimeSlot from './ProTimeSlot';
import logo from '/public/assets/logo-sm.png';

type CourierType = 'Sherwin-Williams Delivery' | 'Local Courier';
type FilterType = 'All Couriers' | CourierType;

type TimeSlotData = {
	courierType: CourierType;
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

	const filteredTimeSlots = timeSlots.filter(
		(slot) =>
			activeFilter === 'All Couriers' || slot.courierType === activeFilter
	);

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
							className={`swdc-ml-1 swdc-flex swdc-items-center swdc-gap-[10px] swdc-rounded-2xl swdc-bg-[#f6f6f6] swdc-px-[16px] swdc-py-[8px] swdc-text-sm swdc-transition-colors focus:swdc-bg-[#000] focus:swdc-text-[#fff] active:swdc-bg-[#000] active:swdc-text-[#fff] ${
								activeFilter === filter
									? '-swdc-bg-[#2F2F30] -swdc-text-white'
									: '-swdc-border -swdc-border-[#2F2F30]/[0.45] -swdc-text-[#2F2F30] hover:-swdc-bg-[#f6f6f6]'
							}`}
						>
							{filter === 'Sherwin-Williams Delivery' && (
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
							<span className="swdc-font-medium swdc-uppercase">{filter}</span>
						</button>
					))}
				</div>
			</div>

			<div className="swdc-grid swdc-grid-cols-1 swdc-gap-4 md:swdc-grid-cols-2">
				{filteredTimeSlots.map((slot, index) => (
					<ProTimeSlot
						key={index}
						courierType={slot.courierType}
						defaultValue={defaultValue}
						name="delivery-time-slot"
						onSelect={onSelect}
						price={slot.price}
						title={slot.title}
						value={slot.value}
					/>
				))}
			</div>
		</div>
	);
};

export default ProTimeSelector;
