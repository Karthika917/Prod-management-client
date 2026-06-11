import { useState } from "react";

function ProductForm({ subCategories, onSubmit, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([{ ram: "", price: "", qty: 1 }]);

  const addVariant = () => {
    setVariants([...variants, { ram: "", price: "", qty: 1 }]);
  };

  const updateVariant = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const changeQty = (index, delta) => {
    const updated = [...variants];
    updated[index].qty = Math.max(1, updated[index].qty + delta);
    setVariants(updated);
  };

  const handleSubmit = () => {
    if (!title.trim() || !subCategory) return;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("subCategory", subCategory);
    formData.append("variants", JSON.stringify(variants));
    images.forEach((img) => formData.append("images", img));
    onSubmit(formData);
  };

  return (
    <div>
      <h3 className="pf-title">Add Product</h3>

      <div className="pf-row">
        <span className="pf-label">Title :</span>
        <input className="pf-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter product title" />
      </div>

      <div className="pf-row pf-row--top">
        <span className="pf-label pf-label--top">Variants :</span>
        <div className="pf-variants">
          {variants.map((v, i) => (
            <div key={i} className="pf-variant-row">
              <span className="pf-vlabel">Ram:</span>
              <input className="pf-vinput" value={v.ram} onChange={(e) => updateVariant(i, "ram", e.target.value)} placeholder="4 GB" />
              <span className="pf-vlabel">Price:</span>
              <input className="pf-vinput pf-vinput--price" value={v.price} onChange={(e) => updateVariant(i, "price", e.target.value)} placeholder="$ 0.00" />
              <span className="pf-vlabel">QTY:</span>
              <button className="pf-qty-btn" onClick={() => changeQty(i, -1)}>‹</button>
              <span className="pf-qty-val">{v.qty}</span>
              <button className="pf-qty-btn" onClick={() => changeQty(i, 1)}>›</button>
            </div>
          ))}
          <div className="pf-variant-add-wrap">
            <button className="pf-btn-add-variant" onClick={addVariant}>Add variants</button>
          </div>
        </div>
      </div>

      <div className="pf-row">
        <span className="pf-label">Sub category :</span>
        <div className="pf-select-wrap">
          <select className="pf-input pf-select" value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
            <option value="" disabled>Select sub category</option>
            {subCategories?.map((s) => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
          <span className="pf-select-arrow">▼</span>
        </div>
      </div>

      <div className="pf-row pf-row--top">
        <span className="pf-label pf-label--top">Description :</span>
        <textarea className="pf-input pf-textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter product description" />
      </div>

      <div className="pf-row pf-row--top">
        <span className="pf-label pf-label--top">Upload image:</span>
        <div className="pf-images">
          {images.map((img, i) => (
            <img key={i} className="pf-img-thumb" src={URL.createObjectURL(img)} alt="" />
          ))}
          <label className="pf-img-placeholder">
            +
            <input type="file" multiple accept="image/*" style={{ display: "none" }}
              onChange={(e) => setImages([...images, ...Array.from(e.target.files)])} />
          </label>
        </div>
      </div>

      <div className="pf-actions">
        <button className="pf-btn-add" onClick={handleSubmit}>ADD</button>
        <button className="pf-btn-discard" onClick={onClose}>DISCARD</button>
      </div>
    </div>
  );
}

export default ProductForm;