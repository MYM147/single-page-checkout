import { IconFillAlarm } from '@prism/dropcloth';
import { FulfillmentSelections } from '../../../types';

type DateSelectorProps = {
  currentDates: Date[];
  currentPage: number;
  disabled: boolean;
  rush?: boolean;
  selectedDateState: string | null;
  onDateSelect: (date: string) => void;
  onSelectionsChange: (selections: FulfillmentSelections) => void;
  selections: FulfillmentSelections;
  setIsRushSelected: (isRush: boolean) => void;
  formatDateForDisplay: (date: Date, index: number) => {
    dayLabel: string;
    dateLabel: string;
    fullDate: string;
  };
};

const DateSelector = ({
  currentDates,
  currentPage,
  disabled,
  rush,
  selectedDateState,
  onDateSelect,
  onSelectionsChange,
  selections,
  setIsRushSelected,
  formatDateForDisplay,
}: DateSelectorProps) => {
  return (
    <div className="date-scroll swdc-mt-2 swdc-flex swdc-flex-1 swdc-flex-row swdc-gap-[25px] lg:swdc-gap-[15px]">
      {currentDates.map((date, index) => {
        const actualIndex = index + currentPage * 7;
        const { dayLabel, dateLabel, fullDate } = formatDateForDisplay(date, actualIndex);

        return (
          <div
            className='swdc-flex swdc-flex-shrink-0 swdc-flex-col swdc-items-center'
            key={actualIndex}>
            <span className='swdc-mb-1 swdc-text-sm'>{dayLabel}</span>
            <div
              className={`swdc-flex swdc-h-[88px] swdc-w-[100px] swdc-flex-col swdc-items-center swdc-justify-center swdc-rounded-[2px] swdc-border swdc-border-[#2F2F30]/[0.45] md:swdc-h-[68px] md:swdc-w-[80px] ${
                disabled
                  ? 'swdc-cursor-not-allowed swdc-opacity-50'
                  : selectedDateState === fullDate
                    ? 'swdc-bg-[#2F2F30] swdc-text-[#fff]'
                    : 'swdc-cursor-pointer swdc-bg-white hover:swdc-bg-[#2F2F30] hover:swdc-text-[#fff]'
              }`}
              onClick={
                !disabled
                  ? () => {
                      onDateSelect(fullDate);

                      if (rush) {
                        const isRushDay = actualIndex === 0;
                        setIsRushSelected(isRushDay);
                        onSelectionsChange({
                          ...selections,
                          deliveryDate: fullDate,
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
                          pickupDateSelection: fullDate,
                        });
                      }
                    }
                  : undefined }>
              <span className='swdc-text-sm swdc-font-medium'>{dateLabel}</span>
              {actualIndex === 0 && rush && (
                <div className='swdc-flex swdc-items-center swdc-text-center'>
                  <IconFillAlarm className='swdc-mr-[2px] swdc-h-2 swdc-w-2 swdc-fill-[#eec46f]' />
                  <span className='swdc-text-xs swdc-uppercase'>RUSH</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DateSelector;
