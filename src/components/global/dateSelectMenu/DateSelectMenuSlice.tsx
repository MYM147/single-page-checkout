import { useEffect, useState } from 'react';
import { FulfillmentSelections } from '../../../types';
import { getDates } from '../../utils/dateUtils';
import { TimeSlot, proTimeSlots } from '../../utils/timeSlotUtil';

// Types
export type DateSelectMenuProps = {
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

// Hook to manage date selection state and logic
export const useDateSelectMenu = ({
  rush,
  selectedDate,
  selections,
}: DateSelectMenuProps) => {
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
  const weekDates = getDates();
  const totalPages = Math.ceil(weekDates.length / datesPerPage);

  // Update state when props change
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

  // Check if rush delivery is selected
  useEffect(() => {
    if (selectedDateState) {
      const today = weekDates[0].toLocaleDateString('en-US', {
        weekday: 'long', month: 'short', day: 'numeric',
      });

      setIsRushSelected(Boolean(selectedDateState === today && rush));
    }
  }, [selectedDateState, rush, weekDates]);

  // Simulate loading state
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle time slot selection
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

  // Pagination handlers
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

  // Get current dates to display
  const currentDates = weekDates.slice(
    currentPage * datesPerPage,
    (currentPage + 1) * datesPerPage
  );

  return {
    isRushSelected,
    setIsRushSelected,
    loading,
    selectedDateState,
    setSelectedDateState,
    selectedTimeSlot,
    setSelectedTimeSlot,
    currentPage,
    totalPages,
    weekDates,
    currentDates,
    handleTimeSlotSelect,
    handleNextPage,
    handlePrevPage,
  };
};

// Helper function to format date for display
export const formatDateForDisplay = (date: Date, index: number) => {
  const dayLabel = index === 0
    ? 'Today'
    : index === 1
      ? 'Tomorrow'
      : date.toLocaleDateString('en-US', { weekday: 'long' });

  const dateLabel = date.toLocaleDateString('en-US', {
    month: 'short', day: 'numeric',
  });

  const fullDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return { dayLabel, dateLabel, fullDate };
};
