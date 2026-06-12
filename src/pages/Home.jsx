import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar';
import { FiHeart, FiChevronRight, FiChevronDown } from "react-icons/fi";
import { FaHeart } from "react-icons/fa"
import { FaStar, FaRegStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Modal from '../components/ui/Modal';
import CategoryForm from '../components/forms/CategoryForm';
import { addCategoryApi, getCategoryApi, addSubcategoryApi, getsubcategoryApi, addProductApi, getProductsApi } from '../services/allApi';
import { toast } from 'react-toastify';
import SubCategoryForm from '../components/forms/subcategoryForm';
import ProductForm from '../components/forms/productForm';
import { useWishlist } from '../contextApi/WishlistContext';
import baseUrl from '../services/base_url';

function Home() {

  const [showCategory, setShowCategory] = useState(false);
  const [categories, setCategories] = useState([]);

  const [showSubCategory, setShowSubCategory] = useState(false);
  const [subCategories, setSubCategories] = useState([]);

  const [showProduct, setShowProduct] = useState(false);
  const [products, setProducts] = useState([]);

  //wishlist
  const { toggleWishlist, isWishlisted } = useWishlist();

  //search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubId, setSelectedSubId] = useState(null);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);

  const [showSidebar, setShowSidebar] = useState(false);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSub = selectedSubId ? p.subCategory?._id === selectedSubId : true;
    return matchesSearch && matchesSub;
  })

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )


  const fetchCategories = async () => {
    const res = await getCategoryApi();
    setCategories(res?.data.categories || []);
  };

  const fetchSubCategories = async () => {
    const res = await getsubcategoryApi();
    setSubCategories(res?.data?.subCategories || []);
  };

  const fetchProducts = async () => {
    const res = await getProductsApi();
    // console.log(res?.data.products)
    setProducts(res?.data?.products || []);
  };



  useEffect(() => {
    fetchCategories()
    fetchSubCategories()
    fetchProducts()
  }, [])

  const groupedData = categories.map((cat) => ({
    ...cat,
    subCategories: subCategories.filter(
      (sub) => sub.category?._id === cat._id
    ),
  }));

  return (
    <>
      <div className="home-page">
        <Navbar onSearch={(val) => { setSearchQuery(val); setCurrentPage(1); }} />


        <div className="home-breadcrumb-bar d-flex align-items-center justify-content-between flex-wrap gap-2">
          <div className="d-flex align-items-center gap-1">
            <span className="home-breadcrumb-text">Home</span>
            <FiChevronRight size={13} color="#888" />
            <button
              className="home-filter-toggle d-md-none"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              ☰ Filter
            </button>
          </div>
          <div className="d-flex gap-2">
            <button className="home-action-btn" onClick={() => setShowCategory(true)}>Add category</button>
            <button className="home-action-btn" onClick={() => setShowSubCategory(true)}>Add sub category</button>
            <button className="home-action-btn" onClick={() => setShowProduct(true)}>Add product</button>
          </div>
        </div>

        <div className="d-flex">

          {/* Sidebar */}
          <div className={`d-none d-md-block ${showSidebar ? "d-block" : ""}`}>
            <Sidebar
              categories={groupedData}
              onSelectSubCategory={(id) => {
                if (id === null) { setSelectedSubId(null); }
                else { setSelectedSubId(prev => prev === id ? null : id); }
                setCurrentPage(1);
                setShowSidebar(false);
              }}
              selectedSubId={selectedSubId}
            />
          </div>
          {/* Product section*/}
          <div className="home-product-area">
            <div className="row g-3">

              {paginatedProducts.length === 0 ? (
                <div className="text-center text-muted mt-5">No products found</div>
              ) : (
                paginatedProducts.map((product) => (
                  <div className="col-6 col-lg-4" key={product._id}>
                    <Link to={`/product/${product._id}`} className="home-product-card">
                      <button className="home-heart-btn" onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}>
                        {isWishlisted(product._id)
                          ? <FaHeart size={13} color="red" />
                          : <FiHeart size={13} />
                        }
                      </button>
                      <img
                        src={
                          product.images?.[0]
                            ? `${baseUrl}/uploads/${product.images[0]}`
                            : "https://via.placeholder.com/200x140?text=No+Image"
                        }
                        alt={product.title}
                        className="home-product-img"
                      />
                      <div className="home-product-name">{product.title}</div>
                      <div className="home-product-price">
                        ${product.variants?.[0]?.price || "N/A"}
                      </div>
                      <div className="d-flex gap-1">
                        <FaStar size={11} color="#f5a623" />
                        <FaStar size={11} color="#f5a623" />
                        <FaStar size={11} color="#f5a623" />
                        <FaRegStar size={11} color="#ccc" />
                        <FaRegStar size={11} color="#ccc" />
                      </div>
                    </Link>
                  </div>
                ))
              )}

            </div>

            {/* Pagination */}
            <div className="d-flex align-items-center justify-content-between mt-4 flex-wrap gap-2">

              <span className="home-pagination-info">
                {Math.min(currentPage * productsPerPage, totalItems)} of {totalItems} items
              </span>

              <div className="d-flex align-items-center justify-content-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <div
                    key={page}
                    className={`home-pagination-btn ${currentPage === page ? "active" : ""}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </div>
                ))}
              </div>

              <div className="d-flex align-items-center gap-1">
                <span className="home-pagination-info">Show</span>
                <select
                  className="home-rows-select"
                  value={productsPerPage}
                  onChange={(e) => {
                    setProductsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={4}>4 rows</option>
                  <option value={8}>8 rows</option>
                  <option value={12}>12 rows</option>
                </select>
              </div>

            </div>

          </div>
        </div>

        {/* category modal */}
        <Modal isOpen={showCategory} onClose={() => setShowCategory(false)} width="360px">
          <CategoryForm onClose={() => setShowCategory(false)}
            onSubmit={async (name) => {
              const res = await addCategoryApi({ name });

              if (res?.data?.category) {
                toast.success("Category added");
                setShowCategory(false);
                fetchCategories()
              } else {
                toast.error(res?.message);
              }
            }}
          />
        </Modal>

        {/* subcategory modal */}
        <Modal
          isOpen={showSubCategory}
          onClose={() => setShowSubCategory(false)} width="360px">
          <SubCategoryForm onClose={() => setShowSubCategory(false)}
            categories={categories}
            onSubmit={async (data) => {
              const res = await addSubcategoryApi(data);

              if (res?.data?.subCategory) {
                toast.success("SubCategory added");
                setShowSubCategory(false)
                fetchSubCategories()
              } else {
                toast.error(res?.data?.message);
              }
            }}
          />
        </Modal>

        {/* product modal */}
        <Modal isOpen={showProduct} onClose={() => setShowProduct(false)} width="620px">
          <ProductForm
            subCategories={subCategories}
            onClose={() => setShowProduct(false)}
            onSubmit={async (formData) => {
              const res = await addProductApi(formData);
              if (res?.data?.product) {
                toast.success("Product added");
                setShowProduct(false);
                fetchProducts()
              } else {
                toast.error(res?.data?.message);
              }
            }}
          />
        </Modal>
      </div>

    </>
  )
}

export default Home
