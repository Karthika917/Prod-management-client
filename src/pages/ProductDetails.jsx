import React, { useEffect, useState } from "react";
import { FiHeart, FiChevronRight, FiMinus, FiPlus } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import { getProductbyIdApi, updateProductApi, getsubcategoryApi } from "../services/allApi";
import ProductForm from "../components/forms/productForm";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../contextApi/WishlistContext";

function ProductDetails() {
  const { id } = useParams();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [qty, setQty] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [subCategories, setSubCategories] = useState([]);

  const { toggleWishlist, isWishlisted } = useWishlist();

  const openEdit = () => {
    if (!product) return;

    setEditData({ ...product });
    setIsEditOpen(true);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getProductbyIdApi(id)
      const data = res.data;

      setProduct(data);
      setSelectedVariant(data.variants?.[0]);
      setMainImage(data.images?.[0]);
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const res = await getsubcategoryApi();
        setSubCategories(res.data?.subCategories || []);


      } catch (err) {
        console.log(err);
      }
    };

    fetchSubCategories();
  }, []);

  if (!product) return (
  <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
    <div className="spinner-border text-warning" role="status" />
  </div>
);

  const increaseQty = () => setQty((q) => q + 1);
  const decreaseQty = () => setQty((q) => (q > 1 ? q - 1 : 1));

  const handleUpdateProduct = async (formData) => {
    try {
      await updateProductApi(id, formData);

      const res = await getProductbyIdApi(id);
      const data = res.data;

      setProduct(data);
      setSelectedVariant(data.variants?.[0]);
      setMainImage(data.images?.[0]);

      setIsEditOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  console.log("subCategories in ProductDetails:", subCategories)
  return (
    <>
      <div className="pd-page">
        <Navbar />


        <div className="pd-breadcrumb-bar d-flex align-items-center gap-2">
          <Link to="/home" className="pd-breadcrumb-home">Home</Link>
          <FiChevronRight size={13} color="#888" />
          <span className="pd-breadcrumb-current">{product.title}</span>
        </div>

        <div className="container-fluid p-3">
          <div className="row g-3">

            {/* LEFT - IMAGES */}
            <div className="col-12 col-md-5">
              <div className="pd-card">

                <img
                  src={`http://localhost:3001/uploads/${mainImage}`}
                  alt="Product"
                  className="pd-main-img"
                />

                <div className="row g-2 mt-2">
                  {product.images?.map((img, i) => (
                    <div className="col-3" key={i}>
                      <img
                        src={`http://localhost:3001/uploads/${img}`}
                        alt="thumb"
                        className="pd-thumb-img"
                        onClick={() => setMainImage(img)}
                        style={{
                          border: mainImage === img ? "2px solid black" : "none",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  ))}
                </div>

              </div>
            </div>

            <div className="col-12 col-md-7">
              <div className="pd-card">

                <h2 className="pd-product-title">{product.title}</h2>


                <div className="pd-product-price">
                  ₹{selectedVariant?.price}
                </div>


                <div className="d-flex align-items-center gap-2 mb-1">
                  <span className="pd-label">Availability:</span>
                  <span className="pd-in-stock-badge">
                    <FiCheckCircle size={13} />
                    In stock
                  </span>
                </div>

                <p className="pd-stock-alert">
                  Hurry up! limited stock available
                </p>

                <hr className="pd-divider" />

                {/* RAM VARIANTS */}
                <div className="d-flex align-items-center gap-2 mb-3">
                  <span className="pd-label">RAM:</span>

                  <div className="d-flex gap-2">
                    {product.variants?.map((v, i) => (
                      <button
                        key={i}
                        className={`pd-ram-btn ${selectedVariant?.ram === v.ram ? "pd-ram-btn-active" : ""
                          }`}
                        onClick={() => setSelectedVariant(v)}
                      >
                        {v.ram}
                      </button>
                    ))}
                  </div>
                </div>

                {/* QUANTITY */}
                <div className="d-flex align-items-center gap-2 mb-4">
                  <span className="pd-label">Quantity:</span>

                  <div className="d-flex align-items-center gap-1">
                    <button className="pd-qty-btn" onClick={decreaseQty}>
                      <FiMinus size={14} />
                    </button>

                    <input value={qty} readOnly className="pd-qty-input" />

                    <button className="pd-qty-btn" onClick={increaseQty}>
                      <FiPlus size={14} />
                    </button>
                  </div>
                </div>


                <div className="d-flex align-items-center gap-2">
                  <button className="pd-edit-btn" onClick={openEdit}>Edit product</button>
                  <button className="pd-buy-btn">
                    Buy it now
                  </button>
                  <button className="pd-wishlist-btn" onClick={() => toggleWishlist(product)}>
                    {isWishlisted(product._id)
                      ? <FaHeart size={18} color="red" />
                      : <FiHeart size={18} />
                    }
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
        {isEditOpen && (
          <div className="pd-modal-overlay" onClick={() => setIsEditOpen(false)}>

            <div
              className="pd-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <ProductForm
                subCategories={subCategories}
                onSubmit={handleUpdateProduct}
                onClose={() => setIsEditOpen(false)}
                initialData={editData}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductDetails;