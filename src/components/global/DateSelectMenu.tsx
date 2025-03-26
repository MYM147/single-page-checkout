import { IconFillAlarm } from '@prism/dropcloth';
import { useEffect, useState } from 'react';
import { Selections } from '../../types';
import { getDates } from '../utils/dateUtils';
import BasicTimeSelector from './timeselector/BasicTimeSelector';
import BasicTimeSlot from './timeselector/BasicTimeSlot';
import ProTimeSelector from './timeselector/ProTimeSelector'; // Add this import
import StoreHoursTooltip from './tooltips/StoreHoursTooltip';

type Props = {
	disabled?: boolean;
	membershipType?: 'PRO' | 'DIY'; // Add this prop
	onDateSelect: (date: string) => void;
	onSelectionsChange: (selections: Selections) => void;
	rush?: boolean;
	selectedDate: string | null;
	selectedTimeSlot: string;
	selections: Selections;
	title?: string;
};

const weekDates = getDates();

export const DateSelectMenu = ({
	disabled = false,
	membershipType = 'DIY', // Default to DIY if not provided
	onDateSelect,
	onSelectionsChange,
	rush,
	selectedDate,
	selections,
	title,
}: Props) => {
	const [isRushSelected, setIsRushSelected] = useState<boolean>(
		selections.deliveryTimeSlot === 'rush'
	);
	const [loading, setLoading] = useState<boolean>(false);
	const [selectedDateState, setSelectedDateState] = useState<string | null>(
		selectedDate || selections.deliveryDate
	);

	useEffect(() => {
		setSelectedDateState(
			selectedDate || selections.pickupDateSelection || selections.deliveryDate
		);
	}, [selectedDate, selections.pickupDateSelection, selections.deliveryDate]);

	useEffect(() => {
		// Check if the selected date is today (rush day)
		if (selectedDateState) {
			const today = weekDates[0].toLocaleDateString('en-US', {
				weekday: 'long',
				month: 'short',
				day: 'numeric',
			});

			setIsRushSelected(Boolean(selectedDateState === today && rush));
		}
	}, [selectedDateState, rush]);

	useEffect(() => {
		// Simulate loading time slots
		setLoading(true);
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1000); // Simulate a 1 second loading time

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			{title && (
				<>
					<h3 className="swdc-mt-6 swdc-text-base swdc-font-bold swdc-uppercase swdc-tracking-[1.5px]">
						{title}
					</h3>
					<p className="swdc-mt-1">
						Choose a convenient time within the next 7 days to receive your
						order.
					</p>
					<p className={`swdc-mt-2 ${loading ? 'swdc-opacity-[.15]' : ''}`}>
						Date*
					</p>
				</>
			)}

			<div
				className={`date-scroll swdc-mt-2 swdc-flex swdc-w-full swdc-touch-pan-x swdc-snap-x swdc-flex-row swdc-gap-[25px] swdc-overflow-x-auto lg:swdc-gap-[15px] ${loading ? 'swdc-opacity-[.15]' : ''}`}
			>
				{weekDates.map((date, index) => (
					<div
						className="swdc-flex swdc-flex-shrink-0 swdc-snap-center swdc-flex-col swdc-items-center"
						key={index}
					>
						<span className="swdc-mb-1 swdc-text-sm">
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
												// Keep existing delivery logic
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
												// Update both required pickup fields
												onSelectionsChange({
													...selections,
													pickupDate: 'on-a-specific-day',
													pickupDateSelection: formattedDate,
												});
											}
										}
									: undefined
							}
						>
							<span className="swdc-text-sm swdc-font-medium">
								{date.toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric',
								})}
							</span>
							{index === 0 && rush && (
								<div className="swdc-flex swdc-items-center swdc-text-center">
									<IconFillAlarm className="swdc-mr-[2px] swdc-h-2 swdc-w-2 swdc-fill-[#eec46f]" />
									<span className="swdc-text-xs swdc-uppercase">RUSH</span>
								</div>
							)}
						</div>
					</div>
				))}
			</div>

			{loading && (
				<div className="swdc-absolute swdc-bottom-[20%] swdc-left-[45%] swdc-items-center swdc-justify-center">
					<img
						alt="Loading..."
						height="48px"
						src="/assets/color-wheel.svg"
						width="48px"
					/>
				</div>
			)}

			{title ? (
				<div className={`${loading ? 'swdc-opacity-[.15]' : ''}`}>
					<p className="swdc-mt-2">Time*</p>
					{disabled ? (
						<div className="opacity-50 swdc-mt-2 swdc-flex swdc-h-[68px] swdc-w-full swdc-items-center swdc-justify-center swdc-rounded-[2px] swdc-border swdc-border-[#2F2F30]/[0.45] swdc-opacity-50">
							<p>Please fill out delivery address to continue</p>
						</div>
					) : isRushSelected ? (
						<BasicTimeSlot
							defaultValue={selections.deliveryTimeSlot}
							name="rush-delivery"
							onSelect={(timeSlot) => {
								const timeDisplay = '8AM - 11AM';
								onSelectionsChange({
									...selections,
									deliveryTimeSlot: timeSlot,
									deliveryTime: timeDisplay,
								});
							}}
							rushDelivery={true}
							text="Get it by noon"
							title="RUSH Delivery"
							value="rush"
						/>
					) : selectedDateState && !isRushSelected ? (
						membershipType === 'PRO' ? (
							// PRO member time selector with courier options
							<ProTimeSelector
								timeSlots={[
									{
										courierType: 'S-W Delivery',
										deliveryIsFree: false,
										price: 25,
										text: 'Standard delivery',
										title: '9AM - 5PM',
										value: 'sw-morning',
									},
									{
										courierType: 'S-W Delivery',
										deliveryIsFree: true,
										price: 25,
										text: 'Free with PRO membership',
										title: '12PM - 8PM',
										value: 'sw-afternoon',
									},
									{
										courierType: 'Local Courier',
										deliveryIsFree: false,
										price: 35,
										text: 'Express delivery',
										title: '10AM - 2PM',
										value: 'local-morning',
									},
									{
										courierType: 'Local Courier',
										deliveryIsFree: false,
										price: 30,
										text: 'Same-day delivery',
										title: '3PM - 7PM',
										value: 'local-afternoon',
									},
								]}
								defaultValue={selections.deliveryTimeSlot}
								onSelect={(timeSlot) => {
									// Determine time display based on selected slot
									const timeDisplay =
										timeSlot === 'sw-morning'
											? '9AM - 5PM'
											: timeSlot === 'sw-afternoon'
												? '12PM - 8PM'
												: timeSlot === 'local-morning'
													? '10AM - 2PM'
													: timeSlot === 'local-afternoon'
														? '3PM - 7PM'
														: 'Standard Delivery';

									onSelectionsChange({
										...selections,
										deliveryTimeSlot: timeSlot,
										deliveryTime: timeDisplay,
									});
								}}
								selections={selections}
							/>
						) : (
							// DIY member time selector (original)
							<BasicTimeSelector
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
								defaultValue={selections.deliveryTimeSlot}
								onSelect={(timeSlot) => {
									const timeDisplay =
										timeSlot === 'morning'
											? '8AM - NOON'
											: timeSlot === 'afternoon'
												? 'NOON - 5PM'
												: timeSlot === 'rush'
													? '8AM - 11AM'
													: 'Standard Delivery';

									onSelectionsChange({
										...selections,
										deliveryTimeSlot: timeSlot,
										deliveryTime: timeDisplay,
									});
								}}
								selections={selections}
							/>
						)
					) : (
						<div className="swdc-mt-2 swdc-flex swdc-h-[68px] swdc-w-full swdc-items-center swdc-justify-center swdc-rounded-[2px] swdc-border swdc-border-[#2F2F30]/[0.45] swdc-opacity-50">
							<p>Please select a date to find available timeslots</p>
						</div>
					)}
				</div>
			) : (
				<div className={`${loading ? 'swdc-opacity-[.15]' : ''}`}>
					<p className="swdc-mt-2">Two hours after store opens.</p>
					<StoreHoursTooltip />
				</div>
			)}
		</>
	);
};

export default DateSelectMenu;
