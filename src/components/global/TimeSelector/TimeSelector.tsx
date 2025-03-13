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

const TimeSelector = ({ defaultValue, onSelect, timeSlots }: Props) => {
	return (
		<div className="swdc-flex swdc-flex-col lg:swdc-gap-5">
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
