import { MdArrowOutward } from "react-icons/md";
import { ReviewType } from "../types/movieType";
import useFetchMovieReview from "../data/MovieReview";

const Review = ({ id }: { id: string | undefined }) => {
  const movieReviewData = useFetchMovieReview({ id });
  const review = movieReviewData;
  return (
    <div className="w-full lg:w-3/4">
      <h2 className="text-2xl font-semibold mx-4 lg:mx-0">Review</h2>
      {review.map((review: ReviewType, index: number) => (
        <div
          key={index}
          className="flex flex-col gap-4 mt-2 mx-4 lg:mx-0 bg-white p-4 rounded-md"
        >
          <div className="flex flex-row gap-4 items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={
                  review.author_details.avatar_path === null
                    ? "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
                    : `https://image.tmdb.org/t/p/w500/${review.author_details.avatar_path}`
                }
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h4 className="text-lg font-semibold">
                A review by {review.author}
              </h4>
              <span className="text-sm font-light">
                Rating: {review.author_details.rating}/10 | Written by{" "}
                {review.author} on{" "}
                {new Date(review.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div>
            <p className="text-[10px] lg:text-xs font-light">
              {review.content}
            </p>
          </div>
        </div>
      ))}
      <div className="flex flex-row items-center mt-2 lg:gap-2 cursor-pointer">
        <p className="text-lg font-semibold mx-4 lg:mx-0 hover:text-gray-600 duration-100 transition-all ease-in">
          View all reviews
        </p>
        <MdArrowOutward className="text-xl" />
      </div>
    </div>
  );
};
export default Review;
