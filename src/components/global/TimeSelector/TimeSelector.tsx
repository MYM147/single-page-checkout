import { type Selections } from '../../../types';
import TimeSlot from './TimeSlot';

type Props = {
	timeSlots: Array<{
		deliveryIsFree?: boolean;
		title: string;
		text: string;
		value: string;
		price?: number;
	}>;
	defaultValue?: string;
	onSelect: (value: string) => void;
	selections: Selections;
};

const TimeSelector = ({ timeSlots, defaultValue, onSelect }: Props) => {
	return (
		<div className="swdc-flex swdc-flex-col lg:swdc-gap-5">
			{timeSlots.map((slot, index) => (
				<TimeSlot
					key={index}
					deliveryIsFree={slot.deliveryIsFree}
					onSelect={onSelect}
					price={timeSlots[index].price}
					rushDelivery={false}
					text={slot.text}
					title={slot.title}
					value={slot.value}
					name="delivery-time-slot"
					defaultValue={defaultValue}
				/>
			))}
		</div>
	);
};
export default TimeSelector;
