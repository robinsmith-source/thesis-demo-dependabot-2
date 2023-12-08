import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa6";

//TODO: Consider implement a better rating input. This just works for now
export default function RatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (newValue: number) => void;
}) {
  const [hoverValue, setHoverValue] = useState(0);

  const handleMouseEnter = (index: number) => {
    setHoverValue(index);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  const handleClick = (index: number) => {
    onChange(index);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((index) => (
        <span
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
        >
          {index <= (hoverValue || value) ? (
            <FaStar color="orange" size={20} />
          ) : (
            <FaRegStar size={20} />
          )}
        </span>
      ))}
    </div>
  );
}
