import { useState, useEffect, useCallback } from 'react';
import { generateTimeSlots } from '../lib/bookingUtils';
import { fetchAllBookings } from '../lib/localStorageDb';

function getLocalDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function useBookingSlots({ duration }: { duration: number }) {
  const [slots, setSlots] = useState<{ time: string; label: string; available: boolean }[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = getLocalDate(new Date());
  const maxDate = getLocalDate(new Date(Date.now() + 30 * 86400000));

  const loadSlots = useCallback(() => {
    if (!selectedDate) return;
    setIsLoading(true);
    try {
      const bookings = fetchAllBookings();
      const booked = bookings.map(b => ({ start_time: b.start_time, end_time: b.end_time }));
      const blocked: any[] = [];
      const opening = '09:00';
      const closing = '18:00';
      const generated = generateTimeSlots(selectedDate, duration, opening, closing, booked, blocked);
      setSlots(generated);
      setError(null);
    } catch (e) {
      setError('Chyba načítání');
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate, duration]);

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(today);
    } else {
      loadSlots();
    }
  }, [selectedDate, loadSlots, today]);

  return {
    slots,
    selectedDate,
    selectedTime,
    minDate: today,
    maxDate,
    isLoading,
    error,
    setSelectedDate,
    setSelectedTime,
    refreshSlots: loadSlots,
  };
}
