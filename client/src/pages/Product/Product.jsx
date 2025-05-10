import React, { useState } from "react";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";


const fallbackImg = "/fallback.jpg";

const Product = () => {
  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const { data, loading } = useFetch(`/products/${id}?populate=*`);

  const getImageUrl = (imgKey) => {
    const imageObj = data?.attributes?.[imgKey]?.data;
    if (!imageObj) return fallbackImg;

    const url = imageObj.attributes?.url;
    return url.startsWith("http") ? url : `https://deco-shop.onrender.com${url}`;
  };

  return (
    <div className="product">
      {loading ? (
        "Loading..."
      ) : (
        <>
          <div className="left">
            <div className="images">
              {data?.attributes?.img?.data && (
                <img
                  src={getImageUrl("img")}
                  alt=""
                  onClick={() => setSelectedImg("img")}
                />
              )}
              {data?.attributes?.img2?.data && (
                <img
                  src={getImageUrl("img2")}
                  alt=""
                  onClick={() => setSelectedImg("img2")}
                />
              )}
            </div>
            <div className="mainImg">
              <img src={getImageUrl(selectedImg)} alt="" />
            </div>
          </div>

          <div className="right">
            <h1>{data?.attributes?.title}</h1>
            <span className="price">${data?.attributes?.price}</span>
            <p>{data?.attributes?.desc}</p>

            <div className="quantity">
              <button onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}>-</button>
              {quantity}
              <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
            </div>

            <button
              className="add"
              onClick={() =>
                dispatch(
                  addToCart({
                    id: data.id,
                    title: data.attributes.title,
                    desc: data.attributes.desc,
                    price: data.attributes.price,
                    img: getImageUrl("img"),
                    quantity,
                  })
                )
              }
            >
              <AddShoppingCartIcon /> ADD TO CART
            </button>

            <div className="links">
              <div className="item">
                <FavoriteBorderIcon /> ADD TO WISH LIST
              </div>
              <div className="item">
                <BalanceIcon /> ADD TO COMPARE
              </div>
            </div>

            <hr />

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
