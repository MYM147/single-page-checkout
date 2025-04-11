import { useEffect, useState } from 'react';
import { FulfillmentSelections } from '../../../types';
import { getDates } from '../../utils/dateUtils';
import { TimeSlot, proTimeSlots } from '../../utils/timeSlotUtil';
import StoreHoursTooltip from '../tooltips/StoreHoursTooltip';
import TimeSelectorUI from '../timeSelector/TimeSelectorUI';
import Loader from '../Loader';
import { IconFillAlarm } from '@prism/dropcloth';

type Props = {
  disabled?: boolean;
  membershipType?: 'PRO' | 'DIY';
  onDateSelect: (date: string) => void;
  onSelectionsChange: (selections: FulfillmentSelections) => void;
  rush?: boolean;
  selectedDate: string | null;
  selectedTimeSlot: string;
  selections: FulfillmentSelections;
  title?: string;
};

const weekDates = getDates();

export const DateSelectMenu = ({
  disabled = false,
  membershipType = 'DIY',
  onDateSelect,
  onSelectionsChange,
  rush,
  selectedDate,
  selections,
  title,
}: Props) => {
  const [isRushSelected, setIsRushSelected] = useState(
    selections.deliveryTimeSlot === 'rush'
  );
  const [loading, setLoading] = useState(false);
  const [selectedDateState, setSelectedDateState] = useState(
    selectedDate || selections.deliveryDate
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(
    selections.deliveryTimeSlot
  );
  const [currentPage, setCurrentPage] = useState(0);
  const datesPerPage = 7;
  const totalPages = Math.ceil(weekDates.length / datesPerPage);

  useEffect(() => {
    setSelectedDateState(
      selectedDate || selections.pickupDateSelection || selections.deliveryDate
    );
    setSelectedTimeSlot(selections.deliveryTimeSlot);
  }, [
    selectedDate,
    selections.pickupDateSelection,
    selections.deliveryDate,
    selections.deliveryTimeSlot,
  ]);

  useEffect(() => {
    if (selectedDateState) {
      const today = weekDates[0].toLocaleDateString('en-US', {
        weekday: 'long', month: 'short', day: 'numeric',
      });

      setIsRushSelected(Boolean(selectedDateState === today && rush));
    }
  }, [selectedDateState, rush]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleTimeSlotSelect = (uniqueId: string) => {
    const value = uniqueId.split('-').slice(0, -1).join('-');
    const selectedSlot = proTimeSlots.find((slot: TimeSlot) =>
      uniqueId.startsWith(`${slot.value}-`)
    );
    const timeDisplay = selectedSlot?.title || value;

    return {
      ...selections,
      deliveryTimeSlot: uniqueId,
      deliveryTime: timeDisplay,
    };
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentDates = weekDates.slice(
    currentPage * datesPerPage,
    (currentPage + 1) * datesPerPage
  );

  return (
    <>
      {title && (
        <>
          <h3 className='swdc-mt-6 swdc-text-base swdc-font-bold swdc-uppercase swdc-tracking-[1.5px]'>
            {title}
          </h3>
          <p className='swdc-mt-2 swdc-pr-[100px] md:swdc-mt-1 md:swdc-pr-0'>
            Choose a convenient time within the next 14 days to receive your order.
          </p>
          <p className={`swdc-mt-2 ${loading ? 'swdc-opacity-[.15]' : ''}`}>
            Date*
          </p>
        </>
      )}
      <div className="swdc-relative">
        <div className={`swdc-flex swdc-items-center swdc-justify-between swdc-w-full ${loading ? 'swdc-opacity-[.15]' : ''}`}>
          {currentPage > 0 && (
            <button
              onClick={handlePrevPage}
              className="swdc-cursor-pointer swdc-flex swdc-items-center swdc-justify-center swdc-mr-3 swdc-h-10 swdc-w-10 swdc-rounded-full swdc-bg-white swdc-shadow-lg swdc-border swdc-border-gray-200"
              aria-label="Previous page">
              <span className="swdc-text-2xl swdc-leading-none">&lt;</span>
            </button>
          )}
          <div className="date-scroll swdc-mt-2 swdc-flex swdc-flex-1 swdc-flex-row swdc-gap-[10px] lg:swdc-gap-[10px]">
            {currentDates.map((date, index) => {
              const actualIndex = index + currentPage * datesPerPage;
              return (
                <div
                  className='swdc-flex swdc-flex-shrink-0 swdc-flex-col swdc-items-center'
                  key={actualIndex}>
                  <span className='swdc-mb-1 swdc-text-sm'>
                    {actualIndex === 0
                      ? 'Today'
                      : actualIndex === 1
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
                              const isRushDay = actualIndex === 0;
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
                              onSelectionsChange({
                                ...selections,
                                pickupDate: 'on-a-specific-day',
                                pickupDateSelection: formattedDate,
                              });
                            }
                          }
                        : undefined }>
                    <span className='swdc-text-sm swdc-font-medium'>
                      {date.toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric',
                      })}
                    </span>
                    {actualIndex === 0 && rush && (
                      <div className='swdc-flex swdc-items-center swdc-text-center'>
												<IconFillAlarm className='swdc-fill-[#eec46f] swdc-w-2 '/>
                        <span className='swdc-text-xs swdc-uppercase'>RUSH</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {currentPage < totalPages - 1 && (
            <button
              onClick={handleNextPage}
              className="swdc-cursor-pointer swdc-flex swdc-items-center swdc-justify-center swdc-ml-2 swdc-h-10 swdc-w-10 swdc-rounded-full swdc-bg-white swdc-shadow-lg swdc-relative swdc-top-2"
              aria-label="Next page">
              <span className="swdc-text-2xl swdc-leading-none">&gt;</span>
            </button>
          )}
        </div>
      </div>
      {loading && (
				<Loader/>
      )}
      {title ? (
        <div className={`${loading ? 'swdc-opacity-[.15]' : ''}`}>
          {membershipType === 'DIY' && <h3 className='swdc-mt-2'>Time*</h3>}
          <TimeSelectorUI
            disabled={disabled}
            isRushSelected={isRushSelected}
            membershipType={membershipType}
            selectedDateState={selectedDateState}
            selectedTimeSlot={selectedTimeSlot}
            setSelectedTimeSlot={setSelectedTimeSlot}
            selections={selections}
            onSelectionsChange={onSelectionsChange}
            handleTimeSlotSelect={(uniqueId) => {
              return handleTimeSlotSelect(uniqueId);
            }}
          />
        </div>
      ) : (
        <div className={`${loading ? 'swdc-opacity-[.15]' : ''}`}>
          <p className='swdc-mt-2'>Two hours after store opens.</p>
          <StoreHoursTooltip />
        </div>
      )}
    </>
  );
};
export default DateSelectMenu;