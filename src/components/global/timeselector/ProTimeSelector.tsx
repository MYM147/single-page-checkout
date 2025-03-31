import {
	IconRegularArrowLongLeft,
	IconRegularArrowLongRight,
	IconRegularTruck,
} from '@prism/dropcloth';
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
	price?: number;
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

// Helper function to extract start time in 24-hour format for sorting
const getStartTimeInMinutes = (timeString: string | undefined): number => {
	if (!timeString) return 0;

	// Extract the start time (e.g., "7AM" from "7AM - 9AM")
	const match = timeString.match(/(\d+)([AP]M)/i);
	if (!match) return 0;

	let hours = parseInt(match[1], 10);
	const isPM = match[2].toUpperCase() === 'PM';

	// Convert to 24-hour format
	if (isPM && hours < 12) hours += 12;
	if (!isPM && hours === 12) hours = 0;

	return hours * 60; // Convert to minutes for easier comparison
};

const SLOTS_PER_PAGE = 8;

const ProTimeSelector = ({ selectedValue, onSelect, timeSlots }: Props) => {
	const [activeFilter, setActiveFilter] = useState<FilterType>('All Couriers');
	const [localSelectedValue, setLocalSelectedValue] = useState(selectedValue);
	const [currentPage, setCurrentPage] = useState(0);

	// Keep local state in sync with prop
	useEffect(() => {
		setLocalSelectedValue(selectedValue);
	}, [selectedValue]);

	// Reset pagination when filter changes
	useEffect(() => {
		setCurrentPage(0);
	}, [activeFilter]);

	// Handle selection with a wrapper function to ensure consistent behavior
	const handleSelect = (value: string) => {
		console.log('Selected time slot:', value);
		// Update local state immediately for responsive UI
		setLocalSelectedValue(value);
		// Call the parent's onSelect function
		onSelect(value);
	};

	// First filter by courier type
	const filteredTimeSlots = timeSlots.filter((slot) => {
		const mappedCourierType = filterToCourierMap[activeFilter];
		return (
			mappedCourierType === 'All' || slot.courierType === mappedCourierType
		);
	});

	// Then sort by start time
	const sortedTimeSlots = [...filteredTimeSlots].sort((a, b) => {
		const aStartTime = getStartTimeInMinutes(a.title);
		const bStartTime = getStartTimeInMinutes(b.title);
		return aStartTime - bStartTime;
	});

	// Calculate total pages
	const totalPages = Math.ceil(sortedTimeSlots.length / SLOTS_PER_PAGE);

	// Get current page slots
	const currentSlots = sortedTimeSlots.slice(
		currentPage * SLOTS_PER_PAGE,
		(currentPage + 1) * SLOTS_PER_PAGE
	);

	// Generate stable uniqueIds for each time slot
	const timeSlotIds = currentSlots.map((slot, index) => ({
		...slot,
		uniqueId: `${slot.value}-${index + currentPage * SLOTS_PER_PAGE}`,
	}));

	// Pagination handlers
	const goToPreviousPage = () => {
		setCurrentPage((prev) => Math.max(0, prev - 1));
	};

	const goToNextPage = () => {
		setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
	};

	console.log('Current selectedValue:', selectedValue);
	console.log('Local selectedValue:', localSelectedValue);
	console.log('Total pages:', totalPages, 'Current page:', currentPage);

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

			{totalPages > 1 && (
				<div className="swdc-flex swdc-items-center swdc-justify-end">
					<button
						onClick={goToPreviousPage}
						disabled={currentPage === 0}
						className={`swdc-flex swdc-h-8 swdc-w-8 swdc-items-center swdc-justify-center swdc-rounded-full swdc-transition-colors ${
							currentPage === 0 ? 'swdc-cursor-not-allowed swdc-opacity-50' : ''
						}`}
						aria-label="Previous page"
					>
						<IconRegularArrowLongLeft className="swdc-icon-2" />
					</button>

					<button
						onClick={goToNextPage}
						disabled={currentPage === totalPages - 1}
						className={`swdc-flex swdc-h-8 swdc-w-8 swdc-items-center swdc-justify-center swdc-rounded-full swdc-transition-colors ${
							currentPage === totalPages - 1
								? 'swdc-cursor-not-allowed swdc-opacity-50'
								: ''
						}`}
						aria-label="Next page"
					>
						<IconRegularArrowLongRight className="swdc-icon-2" />
					</button>
				</div>
			)}
		</div>
	);
};

export default ProTimeSelector;
