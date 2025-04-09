import { IconFillAlarm } from '@prism/dropcloth';
import { useEffect, useState } from 'react';
import { FulfillmentSelections } from '../../types';
import { getDates } from '../utils/dateUtils';
import { TimeSlot, proTimeSlots } from '../utils/timeSlotUtil';
import BasicTimeSelector from './timeselector/BasicTimeSelector';
import BasicTimeSlot from './timeselector/BasicTimeSlot';
import ProTimeSelector from './timeselector/ProTimeSelector';
import StoreHoursTooltip from './tooltips/StoreHoursTooltip';

type Props = {
	disabled?: boolean;
	membershipType?: 'PRO' | 'DIY';
	onDateSelect: (date: string) => void;
	onSelectionsChange: (selections: FulfillmentSelections) => void;
	rush?: boolean;
	selectedDate: string | null;
	selectedTimeSlot: string;
	selections: FulfillmentSelections;
	title?: string;
};

const weekDates = getDates();

export const DateSelectMenu = ({
	disabled = false,
	membershipType = 'DIY',
	onDateSelect,
	onSelectionsChange,
	rush,
	selectedDate,
	selections,
	title,
}: Props) => {
	const [isRushSelected, setIsRushSelected] = useState(
		selections.deliveryTimeSlot === 'rush'
	);
	const [loading, setLoading] = useState(false);
	const [selectedDateState, setSelectedDateState] = useState(
		selectedDate || selections.deliveryDate
	);

	const [selectedTimeSlot, setSelectedTimeSlot] = useState(
		selections.deliveryTimeSlot
	);

	useEffect(() => {
		setSelectedDateState(
			selectedDate || selections.pickupDateSelection || selections.deliveryDate
		);
		setSelectedTimeSlot(selections.deliveryTimeSlot);
	}, [
		selectedDate,
		selections.pickupDateSelection,
		selections.deliveryDate,
		selections.deliveryTimeSlot,
	]);

	useEffect(() => {
		if (selectedDateState) {
			const today = weekDates[0].toLocaleDateString('en-US', {
				weekday: 'long', month: 'short', day: 'numeric',
			});

			setIsRushSelected(Boolean(selectedDateState === today && rush));
		}
	}, [selectedDateState, rush]);

	useEffect(() => {
		setLoading(true);
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	const handleTimeSlotSelect = (uniqueId: string) => {
		const value = uniqueId.split('-').slice(0, -1).join('-');
		const selectedSlot = proTimeSlots.find((slot: TimeSlot) =>
			uniqueId.startsWith(`${slot.value}-`)
		);
		const timeDisplay = selectedSlot?.title || value;

		onSelectionsChange({
			...selections,
			deliveryTimeSlot: uniqueId, // Store the uniqueId to maintain selection
			deliveryTime: timeDisplay, // Store the human-readable time for display
		});
	};

	return (
		<>
			{title && (
				<>
					<h3 className='swdc-mt-6 swdc-text-base swdc-font-bold swdc-uppercase swdc-tracking-[1.5px]'>
						{title}
					</h3>
					<p className='swdc-mt-2 swdc-pr-[100px] md:swdc-mt-1 md:swdc-pr-0'>
						Choose a convenient time within the next 7 days to receive your
						order.
					</p>
					<p className={`swdc-mt-2 ${loading ? 'swdc-opacity-[.15]' : ''}`}>
						Date*
					</p>
				</>
			)}

			<div
				className={`date-scroll swdc-mt-2 swdc-flex swdc-w-full swdc-touch-pan-x swdc-snap-x swdc-flex-row swdc-gap-[25px] swdc-overflow-x-auto lg:swdc-gap-[15px] ${loading ? 'swdc-opacity-[.15]' : ''}`}>
				{weekDates.map((date, index) => (
					<div
						className='swdc-flex swdc-flex-shrink-0 swdc-snap-center swdc-flex-col swdc-items-center' key={index}>
						<span className='swdc-mb-1 swdc-text-sm'>
							{index === 0
								? 'Today'
								: index === 1
									? 'Tomorrow'
									: date.toLocaleDateString('en-US', { weekday: 'long' })}
						</span>
						<div
							className={`swdc-flex swdc-h-[88px] swdc-w-[100px] swdc-flex-col swdc-items-center swdc-justify-center swdc-rounded-[2px] swdc-border swdc-border-[#2F2F30]/[0.45] md:swdc-h-[68px] md:swdc-w-[80px] ${
								disabled
									? 'swdc-cursor-not-allowed swdc-opacity-50'
									: selectedDateState ===
										  date.toLocaleDateString('en-US', {
												weekday: 'long',
												month: 'short',
												day: 'numeric',
										  })
										? 'swdc-bg-[#2F2F30] swdc-text-[#fff]'
										: 'swdc-cursor-pointer swdc-bg-white hover:swdc-bg-[#2F2F30] hover:swdc-text-[#fff]'
							}`}
							onClick={
								!disabled
									? () => {
											const formattedDate = date.toLocaleDateString('en-US', {
												weekday: 'long',
												month: 'short',
												day: 'numeric',
											});
											setSelectedDateState(formattedDate);
											onDateSelect(formattedDate);

											if (rush) {
												const isRushDay = index === 0;
												setIsRushSelected(isRushDay);
												onSelectionsChange({
													...selections,
													deliveryDate: formattedDate,
													deliveryTimeSlot: isRushDay
														? 'rush'
														: selections.deliveryTimeSlot,
													deliveryTime: isRushDay
														? '8AM - 11AM'
														: selections.deliveryTime,
												});
											} else {
												onSelectionsChange({
													...selections,
													pickupDate: 'on-a-specific-day',
													pickupDateSelection: formattedDate,
												});
											}
										}
									: undefined }>
							<span className='swdc-text-sm swdc-font-medium'>
								{date.toLocaleDateString('en-US', {
									month: 'short', day: 'numeric',
								})}
							</span>
							{index === 0 && rush && (
								<div className='swdc-flex swdc-items-center swdc-text-center'>
									<IconFillAlarm className='swdc-mr-[2px] swdc-h-2 swdc-w-2 swdc-fill-[#eec46f]' />
									<span className='swdc-text-xs swdc-uppercase'>RUSH</span>
								</div>
							)}
						</div>
					</div>
				))}
			</div>

			{loading && (
				<div className='swdc-absolute swdc-bottom-[20%] swdc-left-[45%] swdc-items-center swdc-justify-center'>
					<img alt='Loading...' height='48px' src='/assets/color-wheel.svg' width='48px'
					/>
				</div>
			)}

			{title ? (
				<div className={`${loading ? 'swdc-opacity-[.15]' : ''}`}>
					{membershipType === 'DIY' && <h3 className='swdc-mt-2'>Time*</h3>}
					{disabled ? (
						<div className='opacity-50 swdc-mt-2 swdc-flex swdc-h-[68px] swdc-w-full swdc-items-center swdc-justify-center swdc-rounded-[2px] swdc-border swdc-border-[#2F2F30]/[0.45] swdc-opacity-50'>
							<p>Please fill out delivery address to continue</p>
						</div>
					) : isRushSelected ? (
						<>
							<h3 className='swdc-mt-5'>Time*</h3>
							<BasicTimeSlot
								defaultValue={selectedTimeSlot}
								name='rush-delivery'
								onSelect={(timeSlot) => {
									const timeDisplay = '8AM - 11AM';
									setSelectedTimeSlot(timeSlot);
									onSelectionsChange({
										...selections,
										deliveryTimeSlot: timeSlot,
										deliveryTime: timeDisplay,
									});
								}}
								rushDelivery={true}
								text='Get it by noon'
								title='RUSH Delivery'
								value='rush'
							/>
						</>
					) : selectedDateState && !isRushSelected ? (
						membershipType === 'PRO' ? (
							<ProTimeSelector
								selectedValue={selections.deliveryTimeSlot}
								onSelect={handleTimeSlotSelect}
								selections={selections}
								timeSlots={proTimeSlots}
							/>
						) : (
							<BasicTimeSelector
								key={selectedDateState}
								defaultValue={selectedTimeSlot}
								onSelect={handleTimeSlotSelect}
								selections={selections}
								timeSlots={[
									{
										deliveryIsFree: false,
										price: 25,
										text: '8AM - NOON',
										title: 'Morning',
										value: 'morning',
									},
									{
										deliveryIsFree: true,
										price: 25,
										text: 'NOON - 5PM',
										title: 'Afternoon',
										value: 'afternoon',
									},
								]}
							/>
						)
					) : (
						<div className='swdc-mt-2 swdc-flex swdc-h-[68px] swdc-w-full swdc-items-center swdc-justify-center swdc-rounded-[2px] swdc-border swdc-border-[#2F2F30]/[0.45] swdc-opacity-50'>
							<p>Please select a date to find available timeslots</p>
						</div>
					)}
				</div>
			) : (
				<div className={`${loading ? 'swdc-opacity-[.15]' : ''}`}>
					<p className='swdc-mt-2'>Two hours after store opens.</p>
					<StoreHoursTooltip />
				</div>
			)}
		</>
	);
};

export default DateSelectMenu;