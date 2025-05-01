import React, { useState } from "react";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";

const baseUrl = "https://deco-shop.onrender.com";

const Product = () => {
  const id = useParams().id;
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const { data, loading, error } = useFetch(`/products/${id}?populate=*`);

  // Define initial selected image based on img if exists
  const [selectedImg, setSelectedImg] = useState(null);

  React.useEffect(() => {
    if (data?.attributes?.img?.data?.attributes?.url) {
      setSelectedImg(baseUrl + data.attributes.img.data.attributes.url);
    }
  }, [data]);

  return (
    <div className="product">
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="left">
            <div className="images">
              {/* Thumbnail 1 */}
              {data?.attributes?.img?.data?.attributes?.url && (
                <img
                  src={baseUrl + data.attributes.img.data.attributes.url}
                  alt=""
                  onClick={() =>
                    setSelectedImg(baseUrl + data.attributes.img.data.attributes.url)
                  }
                />
              )}
              {/* Thumbnail 2 */}
              {data?.attributes?.img2?.data?.attributes?.url && (
                <img
                  src={baseUrl + data.attributes.img2.data.attributes.url}
                  alt=""
                  onClick={() =>
                    setSelectedImg(baseUrl + data.attributes.img2.data.attributes.url)
                  }
                />
              )}
            </div>
            <div className="mainImg">
              {selectedImg && <img src={selectedImg} alt="Main product" />}
            </div>
          </div>

          <div className="right">
            <h1>{data?.attributes?.title}</h1>
            <span className="price">${data?.attributes?.price}</span>
            <p>{data?.attributes?.desc}</p>

            <div className="quantity">
              <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>-</button>
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
                    img: data.attributes.img?.data?.attributes?.url || "",
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

            <div className="info"></div>
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
