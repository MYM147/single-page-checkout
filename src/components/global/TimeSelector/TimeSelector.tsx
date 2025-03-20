import { type Selections } from '../../../types';
import TimeSlot from './TimeSlot';

type Props = {
	defaultValue?: string;
	onSelect: (value: string) => void;
	selections: Selections;
	timeSlots: Array<{
		deliveryIsFree?: boolean;
		price?: number;
		text: string;
		title: string;
		value: string;
	}>;
};
// Container for multiple time slot options
const TimeSelector = ({ defaultValue, onSelect, timeSlots }: Props) => {
	return (
		<div className="swdc-flex swdc-flex-col swdc-gap-4 md:swdc-flex-row">
			{/* Maps through available time slots and renders each option */}
			{timeSlots.map((slot, index) => (
				<TimeSlot
					defaultValue={defaultValue}
					deliveryIsFree={slot.deliveryIsFree}
					key={index}
					name="delivery-time-slot"
					onSelect={onSelect}
					price={timeSlots[index].price}
					rushDelivery={false}
					text={slot.text}
					title={slot.title}
					value={slot.value}
				/>
			))}
		</div>
	);
};
export default TimeSelector;
