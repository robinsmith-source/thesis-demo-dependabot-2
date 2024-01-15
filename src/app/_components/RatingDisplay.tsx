import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

export default function RatingDisplay({
  size = 20,
  rating,
}: {
  size?: number;
  rating: number;
}) {
  const intRating = Math.floor(rating);
  const fracRating = rating - intRating;

  return (
    <ul className="flex gap-1">
      {[1, 2, 3, 4, 5].map((index) => (
        <li key={index}>
          {index <= intRating ? (
            <FaStar className="fill-orange-400" size={size} />
          ) : index - 1 === intRating && fracRating >= 0.5 ? (
            <FaStarHalfAlt className="fill-orange-400" size={size} />
          ) : (
            <FaRegStar size={size} />
          )}
        </li>
      ))}
    </ul>
  );
}
