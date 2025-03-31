import {
	IconRegularArrowLongLeft,
	IconRegularArrowLongRight,
	IconRegularTruck,
} from '@prism/dropcloth';
import { useEffect, useRef, useState } from 'react';
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

const SLOTS_PER_PAGE = 8;

const ProTimeSelector = ({ selectedValue, onSelect, timeSlots }: Props) => {
	const [activeFilter, setActiveFilter] = useState<FilterType>('All Couriers');
	const [localSelectedValue, setLocalSelectedValue] = useState(selectedValue);
	const [currentPage, setCurrentPage] = useState(0);

	// Use a ref to track if we're in the middle of a page change
	const isChangingPage = useRef(false);

	// Keep local state in sync with prop
	useEffect(() => {
		setLocalSelectedValue(selectedValue);
	}, [selectedValue]);

	// First filter by courier type
	const filteredTimeSlots = timeSlots.filter((slot) => {
		const mappedCourierType = filterToCourierMap[activeFilter];
		return (
			mappedCourierType === 'All' || slot.courierType === mappedCourierType
		);
	});

	// Then sort by start time and generate stable IDs
	const allTimeSlotIds = filteredTimeSlots.map((slot, index) => ({
		...slot,
		uniqueId: `${slot.value}-${index}`,
	}));

	// Calculate total pages
	const totalPages = Math.ceil(allTimeSlotIds.length / SLOTS_PER_PAGE);

	// When filter changes, check if selected slot is still visible
	useEffect(() => {
		if (isChangingPage.current) return;

		// Find the selected slot in the filtered list
		const selectedSlotIndex = allTimeSlotIds.findIndex(
			(slot) => slot.uniqueId === localSelectedValue
		);

		// If selected slot exists in the current filter
		if (selectedSlotIndex !== -1) {
			// Calculate which page it's on and navigate there
			const pageOfSelectedSlot = Math.floor(selectedSlotIndex / SLOTS_PER_PAGE);
			setCurrentPage(pageOfSelectedSlot);
		} else {
			// If selected slot is not in the current filter, reset to page 0
			setCurrentPage(0);
		}
	}, [activeFilter, localSelectedValue, allTimeSlotIds]);

	// Get current page slots
	const currentSlots = allTimeSlotIds.slice(
		currentPage * SLOTS_PER_PAGE,
		(currentPage + 1) * SLOTS_PER_PAGE
	);

	// Handle selection with a wrapper function to ensure consistent behavior
	const handleSelect = (value: string) => {
		console.log('Selected time slot:', value);
		// Update local state immediately for responsive UI
		setLocalSelectedValue(value);
		// Call the parent's onSelect function
		onSelect(value);
	};

	// Pagination handlers with debounce to prevent double clicks
	const goToPreviousPage = (e: React.MouseEvent) => {
		e.stopPropagation();

		if (isChangingPage.current || currentPage <= 0) return;

		isChangingPage.current = true;
		console.log('Going to previous page from', currentPage);
		setCurrentPage((prev) => prev - 1);

		// Reset the changing flag after a short delay
		setTimeout(() => {
			isChangingPage.current = false;
		}, 300);
	};

	const goToNextPage = (e: React.MouseEvent) => {
		e.stopPropagation();

		if (isChangingPage.current || currentPage >= totalPages - 1) return;

		isChangingPage.current = true;
		console.log('Going to next page from', currentPage);
		setCurrentPage((prev) => prev + 1);

		// Reset the changing flag after a short delay
		setTimeout(() => {
			isChangingPage.current = false;
		}, 300);
	};

	// Debug current page changes
	useEffect(() => {
		console.log('Current page changed to:', currentPage);
	}, [currentPage]);

	return (
		<div className="swdc-mt-4 swdc-flex swdc-flex-col swdc-gap-3">
			<div className="swdc-flex swdc-flex-col swdc-items-start swdc-gap-2 md:swdc-flex-row md:swdc-items-center md:swdc-justify-between">
				<h3 className="swdc-text-base swdc-font-medium">Time*</h3>

				{/* Scrollable filter buttons container */}
				<div className="swdc-flex swdc-w-full swdc-touch-pan-x swdc-snap-x swdc-overflow-x-auto swdc-pb-2 md:swdc-w-auto md:swdc-justify-end">
					<div className="swdc-flex swdc-min-w-max swdc-gap-2">
						{(
							['All Couriers', 'S-W Delivery', 'Local Courier'] as FilterType[]
						).map((filter) => (
							<button
								key={filter}
								onClick={() => setActiveFilter(filter)}
								className={`swdc-flex swdc-items-center swdc-gap-2 swdc-whitespace-nowrap swdc-rounded-3xl swdc-px-3 swdc-py-1 swdc-text-xs swdc-font-bold swdc-transition-colors ${
									activeFilter === filter
										? 'swdc-bg-[#2F2F30] swdc-text-white'
										: 'swdc-border swdc-border-[#2F2F30]/[0.45] swdc-bg-[#f6f6f6] swdc-text-[#2F2F30]'
								}`}
							>
								{filter === 'S-W Delivery' && (
									<img src={logo} className="swdc-h-3" alt="Sherwin Williams" />
								)}
								{filter === 'Local Courier' && (
									<IconRegularTruck
										className={`swdc-h-4 swdc-w-4 ${
											activeFilter === 'Local Courier'
												? 'swdc-fill-white'
												: 'swdc-fill-[#2F2F30]'
										}`}
									/>
								)}
								<span className="swdc-uppercase">{filter}</span>
							</button>
						))}
					</div>
				</div>
			</div>

			<div className="swdc-grid swdc-grid-cols-1 swdc-gap-4 md:swdc-grid-cols-2">
				{currentSlots.map((slot) => (
					<CustomRadioTimeSlot
						key={slot.uniqueId}
						courierType={slot.courierType}
						selectedValue={localSelectedValue}
						name="delivery-time-slot"
						onSelect={handleSelect}
						text={slot.text}
						title={slot.title || ''}
						value={slot.value}
						uniqueId={slot.uniqueId}
					/>
				))}
			</div>

			{/* Pagination controls - only show if we have more than one page */}
			{totalPages > 1 && (
				<div className="swdc-flex swdc-w-full swdc-items-center swdc-justify-center swdc-gap-4 sm:swdc-items-end sm:swdc-justify-end">
					<button
						type="button"
						onClick={goToPreviousPage}
						disabled={currentPage === 0 || isChangingPage.current}
						className={`swdc-flex swdc-h-8 swdc-w-8 swdc-items-center swdc-justify-center swdc-rounded-full swdc-transition-colors ${
							currentPage === 0
								? 'swdc-cursor-not-allowed swdc-opacity-50'
								: 'swdc-bg-[#f6f6f6] hover:swdc-bg-[#e0e0e0]'
						}`}
						aria-label="Previous page"
					>
						<IconRegularArrowLongLeft className="swdc-icon-3" />
					</button>

					<button
						type="button"
						onClick={goToNextPage}
						disabled={currentPage === totalPages - 1 || isChangingPage.current}
						className={`swdc-flex swdc-h-8 swdc-w-8 swdc-items-center swdc-justify-center swdc-rounded-full swdc-transition-colors ${
							currentPage === totalPages - 1
								? 'swdc-cursor-not-allowed swdc-opacity-50'
								: 'swdc-bg-[#f6f6f6] hover:swdc-bg-[#e0e0e0]'
						}`}
						aria-label="Next page"
					>
						<IconRegularArrowLongRight className="swdc-icon-3" />
					</button>
				</div>
			)}
		</div>
	);
};

export default ProTimeSelector;
