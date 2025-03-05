import { Tooltip } from '@prism/dropcloth';
import { useState } from 'react';
import { getDates } from '../utils/dateUtils';
import PickupOrDeliverySelector from './PickupOrDeliverySelector';

type Props = {
	onDateSelect: (date: string) => void;
	selectedDate: string | null;
	title?: string;
};

const weekDates = getDates();

const DateSelectMenu = ({ onDateSelect, selectedDate, title }: Props) => {
	const [selectedDateState, setSelectedDateState] = useState<string | null>(
		selectedDate || null
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

			<div className="date-scroll swdc-mt-2 swdc-flex swdc-w-[320px] swdc-touch-pan-x swdc-snap-x swdc-flex-row swdc-gap-1 swdc-overflow-x-auto lg:swdc-w-full">
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
							className={`swdc-flex swdc-h-[68px] swdc-w-[80px] swdc-cursor-pointer swdc-flex-col swdc-items-center swdc-justify-center swdc-rounded-[2px] swdc-border swdc-border-[#2F2F30]/[0.45] ${
								selectedDateState ===
								date.toLocaleDateString('en-US', {
									weekday: 'long',
									month: 'short',
									day: 'numeric',
								})
									? 'swdc-bg-[#2F2F30] swdc-text-[#fff]'
									: 'swdc-bg-white hover:swdc-bg-[#2F2F30] hover:swdc-text-[#fff]'
							}`}
							onClick={() => {
								const formattedDate = date.toLocaleDateString('en-US', {
									weekday: 'long',
									month: 'short',
									day: 'numeric',
								});
								setSelectedDateState(formattedDate);
								onDateSelect(formattedDate);
							}}
						>
							<span className="swdc-text-sm swdc-font-medium">
								{date.toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric',
								})}
							</span>
						</div>
					</div>
				))}
			</div>
			{title ? (
				<>
					<PickupOrDeliverySelector
						name="delivery"
						name2="delivery"
						text="8AM - NOON"
						text2="NOON - 5PM"
						title="Morning"
						title2="Afternoon"
						value="standard"
						value2="rush"
						onSelect={(selection) => onDateSelect(selection)}
					/>
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
