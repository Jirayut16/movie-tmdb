import React, { createContext, useContext } from "react";
import { MovieShowtimeType } from "../types/movieType";

//สร้าง context
const MovieShowtime = createContext<MovieShowtimeType[]>([]);
export const useMovieShowtime = () => useContext(MovieShowtime);

export default function MovieShowtimeData({
  children,
}: {
  children: React.ReactNode;
}) {
  const movieShowTime = [
    {
      movie: [
        {
          id: 1,
          times: ["10:00", "13:00", "16:00", "19:00"],
          screen: "Theater 1",
        },
        {
          id: 2,
          times: ["11:00", "14:00", "17:00", "20:00"],
          screen: "Theater 4",
        },
        {
          id: 3,
          times: ["12:30", "15:00", "18:30", "22:00"],
          screen: "Theater 6",
        },
        {
          id: 4,
          times: ["13:30", "16:00", "22:30", "23:00"],
          screen: "Theater 8",
        },
      ],
    },
    {
      movie: [
        {
          id: 1,
          times: ["12:00", "15:00", "19:00", "21:30"],
          screen: "Theater 1",
        },
        {
          id: 2,
          times: ["11:00", "14:00", "17:00", "20:00"],
          screen: "Theater 3",
        },
        {
          id: 3,
          times: ["13:00", "16:30", "20:00", "22:00"],
          screen: "Theater 5",
        },
      ],
    },
    {
      movie: [
        {
          id: 1,
          times: ["12:30", "14:00", "17:00", "22:30"],
          screen: "Theater 2",
        },
        {
          id: 2,
          times: ["11:00", "15:30", "18:00", "21:15"],
          screen: "Theater 4",
        },
      ],
    },
    {
      movie: [
        {
          id: 1,
          times: ["12:00", "17:00", "19:30", "21:30"],
          screen: "Theater 1",
        },
        {
          id: 2,
          times: ["11:00", "14:30", "17:00", "20:30"],
          screen: "Theater 8",
        },
      ],
    },
    {
      movie: [
        {
          id: 1,
          times: ["12:00", "15:00", "22:00"],
          screen: "Theater 4",
        },
        {
          id: 2,
          times: ["11:00", "14:00", "16:30"],
          screen: "Theater 6",
        },
      ],
    },
    {
      movie: [
        {
          id: 1,
          times: ["16:00", "23:00"],
          screen: "Theater 5",
        },
        {
          id: 2,
          times: ["11:30", "19:00"],
          screen: "Theater 7",
        },
      ],
    },
    {
      movie: [
        {
          id: 1,
          times: ["15:00", "22:30"],
          screen: "Theater 2",
        },
      ],
    },
  ];

  return (
    //ส่ง contextและใส่ value
    <MovieShowtime.Provider value={movieShowTime}>
      {children}
    </MovieShowtime.Provider>
  );
}
