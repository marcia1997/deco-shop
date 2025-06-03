import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";

// Define the base URL for local Strapi media
const baseUrl = "https://deco-shop.onrender.com";

const Card = ({ item }) => {
  if (!item) return null;

  const { attributes } = item;

  const getImageUrl = (imgField) => {
    const url = attributes?.[imgField]?.data?.attributes?.url;

    if (!url) return "/fallback.jpg";

    // If it's a full URL (e.g. Cloudinary), return it directly
    if (url.startsWith("http")) return url;

    // Otherwise assume it's a local relative path
    return `${baseUrl}${url}`;
  };

  return (
    <Link className="link" to={`/product/${item.id}`}>
      <div className="card">
        <div className="image">
          {attributes?.isNew && <span>New Season</span>}

          <img
            src={getImageUrl("img")}
            alt="Main"
            className="mainImg"
          />

          {attributes?.img2 && (
            <img
              src={getImageUrl("img2")}
              alt="Second"
              className="secondImg"
            />
          )}
        </div>

        <h2>{attributes?.title || "Title not available"}</h2>

        <div className="prices">
          <h3>${item.oldPrice || (attributes?.price + 20)}</h3>
          <h3>${attributes?.price}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;
