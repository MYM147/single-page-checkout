import { IconFillAlarm, Tooltip } from '@prism/dropcloth';
import { useState } from 'react';
import { Selections } from '../../types';
import { getDates } from '../utils/dateUtils';
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

const DateSelectMenu = ({
	disabled = false,
	onDateSelect,
	onSelectionsChange,
	rush,
	selectedDate,
	selections,
	title,
}: Props) => {
	const [selectedDateState, setSelectedDateState] = useState<string | null>(
		selectedDate
	);

	return (
		<>
			{title && (
				<>
					<h3 className="swdc-mt-6 swdc-text-base swdc-font-bold swdc-uppercase">
						{title}
					</h3>
					<p className="swdc-mt-1">
						Choose a convenient time within the next 7 days to receive your
						order.
					</p>
					<p className="swdc-mt-2">Date*</p>
				</>
			)}

			<div className="date-scroll swdc-mt-2 swdc-flex swdc-w-[320px] swdc-touch-pan-x swdc-snap-x swdc-flex-row swdc-gap-[13px] swdc-overflow-x-auto lg:swdc-w-full">
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
							className={`swdc-flex swdc-h-[68px] swdc-w-[80px] swdc-flex-col swdc-items-center swdc-justify-center swdc-rounded-[2px] swdc-border swdc-border-[#2F2F30]/[0.45] ${
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

			{title ? (
				<>
					<p className="swdc-mt-2">Time*</p>
					{disabled ? (
						<div className="opacity-50 swdc-mt-2 swdc-flex swdc-h-[68px] swdc-w-full swdc-items-center swdc-justify-center swdc-rounded-[2px] swdc-border swdc-border-[#2F2F30]/[0.45] swdc-opacity-50">
							<p>Please fill out delivery address to continue</p>
						</div>
					) : selectedDateState ? (
						<>
							<PickupOrDeliverySelector
								name="delivery-time"
								name2="delivery-time"
								text="8AM - NOON"
								text2="NOON - 5PM"
								title="Morning"
								title2="Afternoon"
								value="morning"
								value2="afternoon"
								defaultValue={selections.deliveryTimeSlot}
								onSelect={(timeSlot) => {
									const timeDisplay =
										timeSlot === 'morning' ? '8AM - NOON' : 'NOON - 5PM';
									console.log('Time selected:', timeSlot, timeDisplay);
									onSelectionsChange({
										...selections,
										deliveryTimeSlot: timeSlot,
										deliveryTime: timeDisplay,
									});
								}}
							/>
						</>
					) : (
						<div className="swdc-mt-2 swdc-flex swdc-h-[68px] swdc-w-full swdc-items-center swdc-justify-center swdc-rounded-[2px] swdc-border swdc-border-[#2F2F30]/[0.45] swdc-opacity-50">
							<p>Please select a date to find available timeslots</p>
						</div>
					)}
				</>
			) : (
				<>
					<p className="swdc-mt-2">Two hours after store opens.</p>
					<Tooltip
						offsetValue={5}
						placement="bottom-start"
						polarity="light"
						tooltip="No available times."
					>
						<span className="swdc-font-medium">View store hours</span>
					</Tooltip>
				</>
			)}
		</>
	);
};
export default DateSelectMenu;
