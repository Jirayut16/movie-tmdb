import { useParams, Link, useNavigate } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { useState } from "react";
import { IoCardOutline } from "react-icons/io5";
import { FiCalendar } from "react-icons/fi";
import { IoKeyOutline } from "react-icons/io5";
import { useBookingStore } from "../store/bookingDetail";

function Payment() {
  const { id, title } = useParams();
  const navigate = useNavigate();
  const navigateToNowPlaying = useNavigate();
  const navigateToHome = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [fName, setFname] = useState<string>("");
  const [lName, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const MovieDetailBookingData = useBookingStore((state) => state.bookingData);
  console.log(MovieDetailBookingData);

  if (!MovieDetailBookingData) {
    return <div>Loading...</div>;
  }

  //ย้อนกลับ 1 หน้า
  const navigateBack = () => {
    navigate(-1);
  };

  const getVat = () => {
    const price = MovieDetailBookingData?.price ?? 0;
    const vat = price * 0.07;
    const total = price + vat;
    return { vat, total };
  };
  const handleCancel = () => {
    navigateToNowPlaying("/nowplaying");
  };
  const handleConfirm = () => {
    if (
      selectedOption === "" &&
      fName === "" &&
      lName === "" &&
      email === "" &&
      phoneNumber === ""
    ) {
      alert("Please fill in all required fields.");
    } else if (
      selectedOption !== "" &&
      fName !== "" &&
      lName !== "" &&
      email !== "" &&
      phoneNumber !== ""
    ) {
      alert("Payment successful!");
      useBookingStore.getState().clearBookingData();
      setTimeout(() => navigateToHome("/"), 3000);
    }
  };
  return (
    <>
      <div className="container mx-auto">
        <div className="mt-4 mx-8 lg:mx-0 flex flex-row justify-center items-center">
          <Breadcrumb>
            <BreadcrumbItem>
              {" "}
              <Link to={"/"} className="text-sm lg:text-lg hover:text-main">
                Home
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              {" "}
              <Link
                to={"/nowplaying"}
                className="text-sm lg:text-lg  hover:text-main"
              >
                Select Movie
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              {" "}
              <Link
                to={`/ticket/showtime/${id}/${title}`}
                className="text-sm lg:text-lg  hover:text-main"
              >
                Select Showtime
              </Link>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <p
                className="text-sm lg:text-lg  hover:text-main cursor-pointer"
                onClick={navigateBack}
              >
                Select Seat
              </p>
            </BreadcrumbItem>

            <BreadcrumbItem>
              {" "}
              <button disabled className="text-sm lg:text-lg text-second">
                Payment
              </button>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      <div className="container mx-auto my-4">
        <div className="flex flex-col lg:flex-row gap-4 ">
          {/* Payment */}
          <div className="w-full lg:w-2/3 bg-white rounded-md shadow-md px-6 py-2">
            <h2 className="text-lg lg:text-2xl font-semibold text-center">
              Payment
            </h2>

            <form onSubmit={handleConfirm} id="payment-form">
              {/* Name */}
              <div className="mt-4 flex flex-row gap-4 justify-between items-center">
                <div className="flex flex-col w-1/2 ">
                  <label
                    htmlFor="name"
                    className="after:content-['*'] after:ml-0.5 after:text-red-500 "
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => setFname(e.target.value)}
                    className="px-4 py-2 rounded-md shadow-md mt-2 text-xs lg:text-md"
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="name"
                    className="after:content-['*'] after:ml-0.5 after:text-red-500"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => setLname(e.target.value)}
                    className="text-xs lg:text-md px-2 lg:px-4 py-2 rounded-md shadow-md mt-2 "
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-row gap-4">
                {/* Email */}
                <div className="flex flex-col w-1/2 ">
                  <label
                    htmlFor="email"
                    className="after:content-['*'] after:ml-0.5 after:text-red-500"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-xs lg:text-md px-2 lg:px-4 py-2 rounded-md shadow-md mt-2"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                {/* tel */}
                <div className="flex flex-col w-1/2">
                  <label
                    htmlFor="tel"
                    className="after:content-['*'] after:ml-0.5 after:text-red-500"
                  >
                    Tel
                  </label>
                  <input
                    type="number"
                    name="tel"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="text-xs lg:text-md px-2 lg:px-4 py-2 rounded-md shadow-md mt-2"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>
            </form>

            <h1 className="text-lg lg:text-2xl font-semibold text-center mt-4">
              Select payment methods:
            </h1>
            <div className="border-2 border-gray-600 p-4 my-4 rounded-md ">
              <div className="flex flex-row gap-4 items-center rounded-md p-2 border-2 border-gray-400">
                <input
                  type="radio"
                  name="payment"
                  value="option1"
                  checked={selectedOption === "option1"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <div className="w-full">
                  <label
                    htmlFor="payment"
                    className="font-semibold text-md lg:text-lg"
                  >
                    Card
                  </label>
                  <div className="flex flex-row gap-2">
                    <div className="w-8 lg:w-10 h-8 rounded-md overflow-hidden">
                      <img
                        src="https://www.svgrepo.com/show/328127/visa.svg"
                        alt=""
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="w-8 lg:w-10 h-8 rounded-md overflow-hidden">
                      <img
                        src="https://www.svgrepo.com/show/328121/mastercard.svg"
                        alt=""
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="w-8 lg:w-10 h-8 rounded-md overflow-hidden">
                      <img
                        src="https://www.svgrepo.com/show/328124/unionpay.svg"
                        alt=""
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="w-8 lg:w-10 h-8 rounded-md overflow-hidden">
                      <img
                        src="https://www.svgrepo.com/show/328126/jcb.svg"
                        alt=""
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="w-8 lg:w-10 h-8 rounded-md overflow-hidden">
                      <img
                        src="https://www.svgrepo.com/show/328129/amex.svg"
                        alt=""
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  </div>
                  {selectedOption === "option1" && (
                    <div className=" bg-blue-100 w-[90%] sm:w-full border-2 rounded-md p-4 my-4">
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col w-full ">
                          <label
                            htmlFor="name"
                            className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm lg:text-md"
                          >
                            Card holder
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="px-4 py-2 rounded-md shadow-md mt-2 text-sm lg:text-md"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div className="flex flex-col w-full ">
                          <label
                            htmlFor="name"
                            className="after:content-['*'] after:ml-0.5 after:text-red-500 text-sm lg:text-md"
                          >
                            Card number
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="name"
                              className="px-8 sm:px-10 py-2 rounded-md shadow-md w-full text-xs lg:text-md "
                              placeholder="1234 5678 9012 3456"
                              required
                              maxLength={16}
                            />
                            <IoCardOutline className="absolute top-0 left-2 h-full text-xl lg:text-2xl " />
                          </div>
                        </div>
                        <div className="flex flex-row gap-4">
                          <div className="flex flex-col w-full">
                            <label
                              htmlFor="name"
                              className="after:content-['*'] after:ml-0.5 after:text-red-500 text-xs lg:text-md"
                            >
                              Expire date
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                name="name"
                                className="px-1 sm:px-10 py-2 rounded-md shadow-md w-full text-sm lg:text-md "
                                placeholder="MM/YY"
                                required
                                maxLength={5}
                              />
                              <FiCalendar className="absolute top-0 right-1 sm:left-2 h-full text-xl lg:text-2xl " />
                            </div>
                          </div>
                          <div className="flex flex-col w-full">
                            <label
                              htmlFor="name"
                              className="after:content-['*'] after:ml-0.5 after:text-red-500 text-xs lg:text-md"
                            >
                              CVV
                            </label>
                            <div className="relative">
                              <input
                                type="number"
                                name="name"
                                className="px-1 sm:px-10 py-2 rounded-md shadow-md w-full text-sm lg:text-md"
                                placeholder="123"
                                required
                                maxLength={3}
                              />
                              <IoKeyOutline className="absolute top-0 right-1 sm:left-2 h-full text-xl lg:text-2xl " />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-row gap-4 items-center mt-4 rounded-md p-2 border-2 border-gray-400">
                <input
                  type="radio"
                  name="payment"
                  value="option2"
                  checked={selectedOption === "option2"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <div>
                  <label
                    htmlFor="payment"
                    className="font-semibold  text-md lg:text-lg"
                  >
                    PayPal
                  </label>
                  <div className="flex flex-row gap-2">
                    <div className="w-10 h-8 rounded-md overflow-hidden">
                      <img
                        src="https://www.svgrepo.com/show/328122/paypal.svg"
                        alt=""
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-4 items-center mt-4 rounded-md p-2 border-2 border-gray-400">
                <input
                  type="radio"
                  name="payment"
                  value="option3"
                  checked={selectedOption === "option3"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <div>
                  <label
                    htmlFor="payment"
                    className="font-semibold  text-md lg:text-lg"
                  >
                    Alipay
                  </label>
                  <div className="flex flex-row gap-2">
                    <div className="w-10 h-8 rounded-md overflow-hidden">
                      <img
                        src="https://www.svgrepo.com/show/328131/alipay.svg"
                        alt=""
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-center mt-4 rounded-md p-2 border-2 border-gray-400">
                <input
                  type="radio"
                  name="payment"
                  value="option4"
                  checked={selectedOption === "option4"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <div>
                  <label
                    htmlFor="payment"
                    className="font-semibold text-md lg:text-lg"
                  >
                    QR Payment
                  </label>
                  <div className="flex flex-row gap-2">
                    <div className="w-8 lg:w-10 h-8 rounded-md overflow-hidden">
                      <img
                        src="https://www.svgrepo.com/show/487695/qr-code.svg"
                        alt=""
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex flex-row gap-4 my-6 justify-center">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gradient-to-r from-[#ED213A] to-[#cf5f52] text-white font-semibold text-xl cursor-pointer hover:bg-gradient-to-tr hover:from-[#cf5f52] hover:to-[#ED213A] hover:scale-105 duration-200 transition-all ease-in px-8 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="payment-form"
                onClick={handleConfirm}
                className="bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] text-white font-semibold text-xl cursor-pointer hover:bg-gradient-to-tr hover:from-[#56CCF2] hover:to-[#2F80ED] hover:scale-105 duration-200 transition-all ease-in px-8 py-2 rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
          {/* End Payment */}

          {/* Detail */}
          <div className="w-full lg:w-1/3 bg-white rounded-md shadow-md px-6 py-2">
            <h1 className="text-2xl font-semibold text-center">
              Booking summary:
            </h1>
            <div className="w-32 h-44 mx-auto mt-4">
              <div className="bg-black w-full h-full rounded-md overflow-hidden ">
                <img
                  src={`https://image.tmdb.org/t/p/original/${MovieDetailBookingData.picture}`}
                  alt="poster logo"
                  className="object-cover"
                />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-center mt-1">{title}</h2>

            <div className="flex flex-row justify-between mt-4 border-b-2 border-gray-300 mb-2">
              <span className="text-md font-semibold">Showtime: </span>
              <span className="text-red-600 font-semibold">
                {MovieDetailBookingData.time}
              </span>
            </div>

            <div className="flex flex-row justify-between  border-b-2 border-gray-300 mb-2">
              <span className="text-md font-semibold">Date: </span>
              <span className="text-red-600 font-semibold">
                {MovieDetailBookingData.day}, {MovieDetailBookingData.date}{" "}
                {MovieDetailBookingData.month} {MovieDetailBookingData.year}
              </span>
            </div>

            <div className="flex flex-row justify-between  border-b-2 border-gray-300 mb-2">
              <span className="text-md font-semibold">Screen: </span>
              <span className="text-red-600 font-semibold">
                {MovieDetailBookingData.screen}
              </span>
            </div>

            <div className="flex flex-row justify-between border-b-2 border-gray-300 mb-2">
              <span className="text-md font-semibold">Selected Seats: </span>
              <span className="text-red-600 font-semibold ms-8 sm:ms-0">
                {MovieDetailBookingData?.selectedSeats?.join(", ")}
              </span>
            </div>

            <div className="flex flex-row justify-between  border-b-2 border-gray-300 mt-8 mb-2">
              <span className="text-xl font-semibold">Total: </span>
              <span className="text-red-600 font-semibold">
                {new Intl.NumberFormat("th-TH", {
                  style: "currency",
                  currency: "THB",
                  minimumFractionDigits: 0,
                }).format(MovieDetailBookingData?.price ?? 0)}
              </span>
            </div>

            <div className="flex flex-row justify-between border-b-2 border-gray-300 mb-2">
              <span className="text-md font-light">Vat 7%:</span>
              <span className="text-red-500 font-light">
                {new Intl.NumberFormat("th-TH", {
                  style: "currency",
                  currency: "THB",
                  minimumFractionDigits: 0,
                }).format(getVat().vat)}
              </span>
            </div>
            <div className="flex flex-row justify-center items-center gap-2 mt-4">
              <input
                type="text"
                placeholder="Promo Code"
                className="w-2/3 rounded-md border-2 border-gray-300"
              />
              <button className="bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] text-white cursor-pointer hover:bg-gradient-to-tr hover:from-[#56CCF2] hover:to-[#2F80ED] w-1/3 h-full py-2 rounded-md">
                Apply
              </button>
            </div>
            <div className="flex flex-row justify-between items-center my-6 text-2xl ">
              <span className=" font-semibold">Total Price: </span>
              <span className="text-red-600  font-semibold">
                {new Intl.NumberFormat("th-TH", {
                  style: "currency",
                  currency: "THB",
                  minimumFractionDigits: 2,
                }).format(getVat().total)}
              </span>
            </div>
            <div className="lg:hidden flex flex-row gap-4 my-6 justify-center">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gradient-to-r from-[#ED213A] to-[#cf5f52] text-white font-semibold text-xl cursor-pointer hover:bg-gradient-to-tr hover:from-[#cf5f52] hover:to-[#ED213A] hover:scale-105 duration-200 transition-all ease-in px-8 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleConfirm}
                form="payment-form"
                className="bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] text-white font-semibold text-xl cursor-pointer hover:bg-gradient-to-tr hover:from-[#56CCF2] hover:to-[#2F80ED] hover:scale-105 duration-200 transition-all ease-in px-8 py-2 rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
          {/*End Detail */}
        </div>
      </div>
    </>
  );
}

export default Payment;
