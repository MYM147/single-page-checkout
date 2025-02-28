import { Tooltip } from '@prism/dropcloth';
import { useState } from 'react';
import { weekDates } from '../utils/dateUtils';

type Props = {
	onDateSelect: (date: string) => void;
	selectedDate: string | null | undefined;
};

const PickupDateMenu = ({ onDateSelect, selectedDate }: Props) => {
	const [selectedDateState, setSelectedDateState] = useState<string | null>(
		selectedDate ?? null
	);

	return (
		<>
			<div className="swdc-mt-2 swdc-flex swdc-flex-row swdc-gap-1">
				{weekDates.map((date, index) => (
					<div
						key={index}
						className="swdc-flex swdc-flex-col swdc-items-center"
					>
						<span className="swdc-mb-1 swdc-text-sm">
							{index === 0
								? 'Today'
								: index === 1
									? 'Tomorrow'
									: new Date(date).toLocaleDateString('en-US', {
											weekday: 'long',
										})}
						</span>
						<div
							className={`swdc-flex swdc-h-[68px] swdc-w-[80px] swdc-cursor-pointer swdc-flex-col swdc-items-center swdc-justify-center swdc-rounded-[2px] swdc-border swdc-border-[#2F2F30]/[0.45] ${date === selectedDateState ? 'swdc-bg-[#2F2F30] swdc-text-[#fff]' : 'swdc-bg-white hover:swdc-bg-[#2F2F30] hover:swdc-text-[#fff]'}`}
							onClick={() => {
								setSelectedDateState(date);
								onDateSelect(date);
							}}
						>
							<span className="swdc-text-sm swdc-font-medium">
								{new Date(date).toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric',
								})}
							</span>
						</div>
					</div>
				))}
			</div>
			<p className="swdc-mt-2">Two hours after store opens.</p>
			<Tooltip
				offsetValue={5}
				placement="bottom-start"
				polarity="light"
				tooltip="No available times."
			>
				<span className="swdc-font-medium">View store hours &gt;</span>
			</Tooltip>
		</>
	);
};

export default PickupDateMenu;
