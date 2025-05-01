import React, { useState } from "react";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";

// Define base URL for fetching images from backend
const baseUrl = 'https://deco-shop.onrender.com';

const Product = () => {
  // Extract product ID from URL parameters
  const id = useParams().id;

  // State for tracking selected image and quantity
  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1);

  // Redux dispatch function for adding to cart
  const dispatch = useDispatch();

  // Fetch product data using custom useFetch hook
  const { data, loading } = useFetch(`/products/${id}?populate=*`);

  // Check if image data exists, otherwise use a fallback image
  const getImageUrl = (imgKey) => {
    const imgData = data?.attributes?.[imgKey]?.data?.attributes?.url;
    return imgData ? baseUrl + imgData : "/path/to/fallback-image.jpg"; // Replace with actual fallback image path
  };

  return (
    <div className="product">
      {/* Check if data is still loading */}
      {loading ? (
        "loading"
      ) : (
        <>
          {/* Left section with product images */}
          <div className="left">
            <div className="images">
              {/* Display first product image */}
              <img
                src={getImageUrl("img")}
                alt=""
                onClick={() => setSelectedImg("img")}
              />
              {/* Display second product image */}
              <img
                src={getImageUrl("img2")}
                alt=""
                onClick={() => setSelectedImg("img2")}
              />
            </div>
            {/* Display main product image */}
            <div className="mainImg">
              <img
                src={getImageUrl(selectedImg)}
                alt=""
              />
            </div>
          </div>
          {/* Right section with product details */}
          <div className="right">
            {/* Display product title */}
            <h1>{data?.attributes?.title}</h1>
            {/* Display product price */}
            <span className="price">${data?.attributes?.price}</span>
            {/* Display product description */}
            <p>{data?.attributes?.desc}</p>
            {/* Quantity selection */}
            <div className="quantity">
              <button
                onClick={() =>
                  setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                }
              >
                -
              </button>
              {quantity}
              <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
            </div>
            {/* Add to cart button */}
            <button
              className="add"
              onClick={() =>
                dispatch(
                  addToCart({
                    id: data.id,
                    title: data.attributes.title,
                    desc: data.attributes.desc,
                    price: data.attributes.price,
                    img: getImageUrl("img"), // Use image URL function
                    quantity,
                  })
                )
              }
            >
              <AddShoppingCartIcon /> ADD TO CART
            </button>
            {/* Links for additional actions */}
            <div className="links">
              <div className="item">
                <FavoriteBorderIcon /> ADD TO WISH LIST
              </div>
              <div className="item">
                <BalanceIcon /> ADD TO COMPARE
              </div>
            </div>
            {/* Additional product information */}
            <div className="info">
              {/* Display product vendor, type, tags, etc. */}
            </div>
            <hr />
            {/* Tabs for different sections */}
            <div className="info">
              <span>DESCRIPTION</span>
              <hr />
              <span>ADDITIONAL INFORMATION</span>
              <hr />
              <span>FAQ</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
