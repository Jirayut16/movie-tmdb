import { create } from "zustand";
import { persist } from "zustand/middleware";
interface BookingData {
  time: string;
  date: number;
  day: string;
  month: string;
  year: number;
  screen: string;
  picture: string;
  selectedSeats?: string[];
  price?: number;
}

interface BookingStore {
  bookingData: Partial<BookingData>;
  setBookingData: (data: Partial<BookingData>) => void;
  clearBookingData: () => void;
}

export const useBookingStore = create(
  persist<BookingStore>(
    (set) => ({
      bookingData: {},
      setBookingData: (data: Partial<BookingData>) =>
        set((state) => ({
          bookingData: {
            ...state.bookingData,
            ...data,
          },
        })),
      clearBookingData: () => set({ bookingData: {} }),
    }),
    {
      name: "bookingDetail",
    }
  )
);
