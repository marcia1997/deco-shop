import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";

// Define the base URL for images depending on your backend deployment
const baseUrl = 'https://deco-shop.onrender.com';

const Card = ({ item }) => {
  // Check if 'item' is null or undefined and return null if it is
  if (!item) {
    return null;
  }

  // Destructure relevant properties from the 'item' object
  const { attributes } = item;

  return (
    <Link className="link" to={`/product/${item.id}`}>
      <div className="card">
        <div className="image">
          {/* Display "New Season" if the 'isNew' attribute exists */}
          {attributes?.isNew && <span>New Season</span>}
          {/* Load the main image and provide a default URL if missing */}
          <img
            src={attributes?.img || ""}
            alt="Main"
            className="mainImg"
          />

          {attributes?.img2 && (
            <img
              src={attributes.img2}
              alt="Second"
              className="secondImg"
            />
          )}
        </div>
        {/* Display the title or a "Title not available" message if it's missing */}
        <h2>{attributes?.title || "Title not available"}</h2>
        <div className="prices">
          {/* Display the old price or the adjusted price if the old price is missing */}
          <h3>${item.oldPrice || (attributes?.price + 20)}</h3>
          {/* Display the current price */}
          <h3>${attributes?.price}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;
