import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar';
import { FiHeart, FiChevronRight, FiChevronDown } from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Modal from '../components/ui/Modal';
import CategoryForm from '../components/forms/CategoryForm';
import { addCategoryApi,getCategoryApi, addSubcategoryApi, getsubcategoryApi, addProductApi, getProductsApi} from '../services/allApi';
import { toast } from 'react-toastify';
import SubCategoryForm from '../components/forms/subcategoryForm';
import ProductForm from '../components/forms/productForm';

function Home() {

  const [showCategory, setShowCategory] = useState(false);
  const [categories, setCategories] = useState([]);

  const [showSubCategory, setShowSubCategory] = useState(false);
  const [subCategories, setSubCategories] = useState([]);

  const [showProduct, setShowProduct] = useState(false);
  const [products, setProducts] = useState([]);



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
      <Navbar />

    
      <div className="home-breadcrumb-bar d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div className="d-flex align-items-center gap-1">
          <span className="home-breadcrumb-text">Home</span>
          <FiChevronRight size={13} color="#888" />
        </div>
        <div className="d-flex gap-2">
          <button className="home-action-btn"  onClick={() => setShowCategory(true)}>Add category</button>
          <button className="home-action-btn"  onClick={() => setShowSubCategory(true)}>Add sub category</button>
          <button className="home-action-btn"  onClick={() => setShowProduct(true)}>Add product</button>
        </div>
      </div>

      <div className="d-flex">

        {/* Sidebar */}
        <Sidebar categories={groupedData} />

       {/* Product section*/}
<div className="home-product-area">
  <div className="row g-3">

    {products.length === 0 ? (
      <div className="text-center text-muted mt-5">No products found</div>
    ) : (
      products.map((product) => (
        <div className="col-6 col-lg-4" key={product._id}>
          <Link to={`/product/${product._id}`} className="home-product-card">
            <button className="home-heart-btn"><FiHeart size={13} /></button>
            <img
              src={
                product.images?.[0]
                  ? `http://localhost:3001/uploads/${product.images[0]}`
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
            <span className="home-pagination-info">10 of 456 items</span>
            <div className="d-flex align-items-center gap-1">
              <div className="home-pagination-btn active">1</div>
              <div className="home-pagination-btn">2</div>
              <div className="home-pagination-btn">3</div>
              <div className="home-pagination-btn">4</div>
              <div className="home-pagination-btn">5</div>
              <span className="home-pagination-dots">...</span>
              <div className="home-pagination-btn">10</div>
            </div>
            <div className="d-flex align-items-center gap-1">
              <span className="home-pagination-info">Show</span>
              <select className="home-rows-select">
                <option>10 rows</option>
                <option>25 rows</option>
                <option>50 rows</option>
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
  <SubCategoryForm  onClose={() => setShowSubCategory(false)} 
    categories={categories}
    onSubmit={async (data) => {
      const res = await addSubcategoryApi(data);

      if (res?.data?.subCategory) {
        toast.success("SubCategory added");
        setShowSubCategory(false);
      } else {
        toast.error(res?.data?.message);
      }
    }}
  />
</Modal>

{/* product modal */}
<Modal  isOpen={showProduct} onClose={() => setShowProduct(false)} width="620px">
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
