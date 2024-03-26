import { useState } from "react";

const Card = ({ item, handleClick }) => {
  const [showMore, setShowMore] = useState(false);
  const description = showMore
    ? item.description
    : item.description.slice(0, 50);
  return (
    <div className="max w-64 border-solid border-2 p-3 rounded-sm bg-white border-slate-900">
      <img className="h-52 mx-auto" src={item.image} alt={item.title} />
      <p className="font-bold pt-2">${item.price}</p>
      <p>
        {description}{" "}
        {showMore ? (
          <span
            onClick={() => setShowMore(!showMore)}
            className="text-blue-700 cursor-pointer"
          >
            ...less
          </span>
        ) : (
          <span
            onClick={() => setShowMore(!showMore)}
            className="text-blue-700 cursor-pointer"
          >
            ...more
          </span>
        )}
      </p>
      <button
        id={item.id}
        onClick={(e) => handleClick(e.target.id)}
        className="border-solid border-2 p-2 rounded-sm bg-black text-white mt-5 hover:bg-slate-800"
      >
        Add to cart
      </button>
    </div>
  );
};

export default Card;
