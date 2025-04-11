import { FulfillmentSelections } from '../../../types';
import BasicTimeSelector from './BasicTimeSelector';
import BasicTimeSlot from './BasicTimeSlot';
import ProTimeSelector from './ProTimeSelector';
import { proTimeSlots } from '../../utils/timeSlotUtil';

type TimeSelectorUIProps = {
  disabled: boolean;
  isRushSelected: boolean;
  membershipType: 'PRO' | 'DIY';
  selectedDateState: string | null;
  selectedTimeSlot: string;
  setSelectedTimeSlot: (timeSlot: string) => void;
  selections: FulfillmentSelections;
  onSelectionsChange: (selections: FulfillmentSelections) => void;
  handleTimeSlotSelect: (uniqueId: string) => FulfillmentSelections;
};

const TimeSelectorUI = ({
  disabled,
  isRushSelected,
  membershipType,
  selectedDateState,
  selectedTimeSlot,
  setSelectedTimeSlot,
  selections,
  onSelectionsChange,
  handleTimeSlotSelect,
}: TimeSelectorUIProps) => {
  if (disabled) {
    return (
      <div className='opacity-50 swdc-mt-2 swdc-flex swdc-h-[68px] swdc-w-full swdc-items-center swdc-justify-center swdc-rounded-[2px] swdc-border swdc-border-[#2F2F30]/[0.45] swdc-opacity-50'>
        <p>Please fill out delivery address to continue</p>
      </div>
    );
  }

  if (isRushSelected) {
    return (
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
    );
  }

  if (selectedDateState && !isRushSelected) {
    if (membershipType === 'PRO') {
      return (
        <ProTimeSelector
          selectedValue={selections.deliveryTimeSlot}
          onSelect={(uniqueId) => onSelectionsChange(handleTimeSlotSelect(uniqueId))}
          selections={selections}
          timeSlots={proTimeSlots}
        />
      );
    }
    return (
      <BasicTimeSelector
        key={selectedDateState}
        defaultValue={selectedTimeSlot}
        onSelect={(uniqueId) => onSelectionsChange(handleTimeSlotSelect(uniqueId))}
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
    );
  }

  return (
    <div className='swdc-mt-2 swdc-flex swdc-h-[68px] swdc-w-full swdc-items-center swdc-justify-center swdc-rounded-[2px] swdc-border swdc-border-[#2F2F30]/[0.45] swdc-opacity-50'>
      <p>Please select a date to find available timeslots</p>
    </div>
  );
};

export default TimeSelectorUI;
