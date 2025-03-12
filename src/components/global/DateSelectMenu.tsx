import { IconFillAlarm } from '@prism/dropcloth';
import { useEffect, useState } from 'react';
import { Selections } from '../../types';
import { getDates } from '../utils/dateUtils';
import DetailTooltip from './DetailTooltip';
import PickupOrDeliverySelector from './PickupOrDeliverySelector';

type Props = {
	disabled?: boolean;
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
	onDateSelect,
	onSelectionsChange,
	rush,
	selectedDate,
	selections,
	title,
}: Props) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [isRushSelected, setIsRushSelected] = useState<boolean>(
		selections.deliveryTimeSlot === 'rush'
	);
	const [selectedDateState, setSelectedDateState] = useState<string | null>(
		selectedDate || selections.deliveryDate
	); // Use selections.deliveryDate

	useEffect(() => {
		setSelectedDateState(selectedDate || selections.deliveryDate); // Update state when selections change
	}, [selectedDate, selections.deliveryDate]);

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
				className={`date-scroll swdc-mt-2 swdc-flex swdc-w-full swdc-touch-pan-x swdc-snap-x swdc-flex-row swdc-gap-[13px] swdc-overflow-x-auto ${loading ? 'swdc-opacity-[.15]' : ''}`}
			>
				{weekDates.map((date, index) => (
					<div
						key={index}
						className="swdc-flex swdc-flex-shrink-0 swdc-snap-center swdc-flex-col swdc-items-center"
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

											// Check if the RUSH date is selected
											if (index === 0) {
												setIsRushSelected(true);
												onSelectionsChange({
													...selections,
													deliveryDate: formattedDate, // This is the key addition
													deliveryTimeSlot: 'rush',
													deliveryTime: '8AM - 11AM',
												});
											} else {
												setIsRushSelected(false);
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
						src="/assets/color-wheel.svg"
						alt="Loading..."
						height="48px"
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
						<PickupOrDeliverySelector
							name="rush-delivery"
							rushDelivery={true}
							text="Get it by noon"
							title="RUSH Delivery"
							defaultValue={
								selections.deliveryTimeSlot === 'rush' ? 'rush' : undefined
							} // Ensure this is set correctly
							onSelect={(timeSlot) => {
								const timeDisplay = '8AM - 11AM';
								onSelectionsChange({
									...selections,
									deliveryTimeSlot: timeSlot,
									deliveryTime: timeDisplay,
								});
							}}
						/>
					) : selectedDateState && !isRushSelected ? (
						<PickupOrDeliverySelector
							name="delivery-time"
							name2="delivery-time"
							text="8AM - NOON"
							text2="NOON - 5PM"
							title="Morning"
							title2="Afternoon"
							value="morning"
							value2="afternoon"
							defaultValue={selections.deliveryTimeSlot} // Ensure this reflects the current selection
							onSelect={(timeSlot) => {
								const timeDisplay =
									timeSlot === 'morning' ? '8AM - NOON' : 'NOON - 5PM';
								onSelectionsChange({
									...selections,
									deliveryTimeSlot: timeSlot,
									deliveryTime: timeDisplay,
								});
							}}
						/>
					) : (
						<div className="swdc-mt-2 swdc-flex swdc-h-[68px] swdc-w-full swdc-items-center swdc-justify-center swdc-rounded-[2px] swdc-border swdc-border-[#2F2F30]/[0.45] swdc-opacity-50">
							<p>Please select a date to find available timeslots</p>
						</div>
					)}
				</div>
			) : (
				<div className={`${loading ? 'swdc-opacity-[.15]' : ''}`}>
					<p className="swdc-mt-2">Two hours after store opens.</p>
					<DetailTooltip text="This is required in case we need to contact you with questions about your delivery." />
					<span className="swdc-font-medium">View store hours</span>
				</div>
			)}
		</>
	);
};

export default DateSelectMenu;
