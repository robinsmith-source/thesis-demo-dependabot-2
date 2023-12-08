import { FaStar, FaRegStar, FaRegStarHalfStroke } from "react-icons/fa6";

export default function ReviewRating({ rating }: { rating: number }) {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => {
        if (index < Math.floor(rating)) {
          return <FaStar key={index} />;
        } else if (index < rating) {
          return <FaRegStarHalfStroke key={index} />;
        } else {
          return <FaRegStar key={index} />;
        }
      })}
    </>
  );
}
