import { Link, useParams, useNavigate } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { useEffect, useState } from "react";
import { useBookingStore } from "../store/bookingDetail";
import { LoadingOverlay } from "../components/LoadingOverlay";

function Theater() {
  const { id, title } = useParams();
  const navigateToPayment = useNavigate();
  const BookingData = useBookingStore((state) => state.bookingData);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(0);
  const normalRows = ["A", "B", "C", "D", "E", "F", "G"];
  const seatsPerRow = 12;
  const bookedSeats = [
    "A3",
    "B5",
    "C7",
    "D4",
    "E8",
    "F2",
    "G6",
    "A7",
    "B8",
    "C4",
    "D6",
    "E3",
    "F9",
    "G1",
  ];

  const handleSeatClick = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );

    //ถ้าที่นั่งถูกเลือก + 250
    if (selectedSeats.includes(seatId)) {
      setPrice((prev) => prev - 250);
    } else {
      setPrice((prev) => prev + 250);
    }
  };

  // seat status
  const getSeatStatus = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return "bg-gray-500 cursor-not-allowed";
    if (selectedSeats.includes(seatId))
      return "bg-orange-500 hover:bg-orange-600";
    return "bg-white hover:bg-gray-300";
  };

  //confirm
  const handleConfirm = () => {
    useBookingStore.getState().setBookingData({
      selectedSeats: selectedSeats,
      price: price,
    });

    navigateToPayment(`/ticket/${id}/${title}/payment`);
  };

  return (
    <LoadingOverlay isLoading={isLoading}>
      <div onLoad={() => window.scrollTo(0, 0)}>
        <div className="container mx-auto">
          <div className="mt-4 mx-8 lg:mx-0 flex flex-row justify-center items-center">
            <Breadcrumb>
              <BreadcrumbItem>
                {" "}
                <Link to={"/"} className="text-xs lg:text-lg hover:text-main">
                  Home
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                {" "}
                <Link
                  to={"/nowplaying"}
                  className="text-xs lg:text-lg  hover:text-main"
                >
                  Select Movie
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                {" "}
                <Link
                  to={`/ticket/showtime/${id}/${title}`}
                  className="text-xs lg:text-lg  hover:text-main"
                >
                  Select Showtime
                </Link>
              </BreadcrumbItem>

              <BreadcrumbItem>
                {" "}
                <button disabled className="text-xs lg:text-lg text-second">
                  Select Seat
                </button>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <button
                  disabled
                  className="text-xs lg:text-lg cursor-not-allowed"
                >
                  {" "}
                  Payment
                </button>
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
        </div>

        <div className="flex flex-row gap-2 mt-4 bg-dark ">
          <div className="container mx-auto flex flex-col lg:flex-row">
            <div className="w-full lg:w-3/4">
              <div className="w-full max-w-4xl mx-auto px-2 py-4 sm:p-8 ">
                {/* หน้าจอ */}
                <div className="w-full h-16 rounded-md mb-12 flex items-center justify-center shadow-lg shadow-cream border-2 border-cream">
                  <span className="text-2xl font-bold text-white">SCREEN</span>
                </div>

                {/* ที่นั่ง */}
                <div className="space-y-4 lg:space-y-6">
                  {normalRows.map((row) => (
                    <div
                      key={row}
                      className="flex justify-center space-x-2 sm:space-x-4 "
                    >
                      {/* เลขแถว */}
                      <div className="w-8 h-8 flex items-center justify-center">
                        <span className="text-white">{row}</span>
                      </div>

                      {/* ที่นั่งในแถว */}
                      <div className="flex space-x-1 sm:space-x-2">
                        {Array.from({ length: seatsPerRow }, (_, i) => {
                          const seatId = `${row}${i + 1}`; /* A& 0+1 = A1 */
                          return (
                            <button
                              key={seatId}
                              onClick={() => handleSeatClick(seatId)}
                              disabled={bookedSeats.includes(seatId)}
                              className={`
                      w-5 h-6 sm:w-8 sm:h-8 rounded-t-lg 
                      ${getSeatStatus(seatId)}
                      text-main text-xs sm:text-sm font-medium
                      transition-colors duration-200
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500
                    `}
                            >
                              {selectedSeats.includes(seatId) ? "✓" : i + 1}
                            </button>
                          );
                        })}
                      </div>
                      <span className="text-white">{row}</span>
                    </div>
                  ))}
                </div>

                {/* คำอธิบายสถานะ */}
                <div className="mt-8 flex justify-center space-x-4 sm:space-x-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-white rounded"></div>
                    <span className="text-sm text-gray-400">ว่าง</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span className="text-sm text-gray-400">เลือก</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-400 rounded"></div>
                    <span className="text-sm text-gray-400">จองแล้ว</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-red-600">250฿ / 1 seat</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------------Detail-----------------------*/}
            <div className="w-full lg:w-1/4 flex flex-col sm:border-2 border-white text-white my-8 px-8 py-4 rounded-md shadow-md">
              <h2 className="text-2xl font-semibold text-center">
                Booking Detail:
              </h2>
              <div className="w-28 h-40 mx-auto mt-4">
                <div className="w-full h-full rounded-md overflow-hidden">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${BookingData.picture}`}
                    alt="poster logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h2 className="text-xl font-semibold text-center mt-4">
                {title}
              </h2>

              <p className="text-sm font-light mt-4">
                Showtime: {BookingData.time}
              </p>

              <div className="flex flex-row justify-between items-center mt-2">
                <div className="flex flex-row gap-2 font-semibold">
                  <p>{BookingData.day},</p>
                  <p>{BookingData.date}</p>
                  <p>{BookingData.month}</p>
                  <p>{BookingData.year}</p>
                </div>
                <p className="text-sm">{BookingData.screen}</p>
              </div>
              {/* แสดงที่นั่งที่เลือก */}
              <div className="mt-2">
                <p className="text-sm font-semibold">
                  Selected Seats:{" "}
                  <span className="text-red-600">
                    {selectedSeats.length === 0
                      ? "-"
                      : selectedSeats.sort().join(", ")}
                  </span>
                </p>
              </div>
              {/* แสดงราคา */}
              <div className="flex flex-row justify-between items-center mt-4">
                <p className="text-sm font-semibold">Total Price:</p>
                <p className="text-xl text-white bg-red-600 px-6 py-1 rounded-md">
                  {new Intl.NumberFormat("th-TH", {
                    style: "currency",
                    currency: "THB",
                    minimumFractionDigits: 0,
                  }).format(price)}
                </p>
              </div>
              {/* แสดงราคา */}

              {/* confirm */}
              <button
                onClick={handleConfirm}
                disabled={selectedSeats.length === 0}
                className={
                  selectedSeats.length === 0
                    ? "mt-4 bg-red-300 text-white font-semibold py-2 rounded-md transition-colors duration-200"
                    : "mt-4 bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
                }
              >
                Confirm
              </button>
              {/* confirm */}
            </div>
            {/* ---------------------End Detail-----------------------*/}
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
}

export default Theater;
