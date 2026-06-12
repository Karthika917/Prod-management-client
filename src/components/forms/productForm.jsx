import { useState, useEffect } from "react";
import baseUrl from "../../services/base_url";

function ProductForm({ subCategories, onSubmit, onClose, initialData }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [variants, setVariants] = useState([
    { ram: "", price: "", qty: 1 },
  ])


  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setSubCategory(initialData.subCategory?._id || "");

      setVariants(
        initialData.variants?.length
          ? initialData.variants
          : [{ ram: "", price: "", qty: 1 }]
      );

      setExistingImages(initialData.images || []);
    }
  }, [initialData, subCategories]);

  const addVariant = () => {
    setVariants([...variants, { ram: "", price: "", qty: 1 }]);
  };

  
  const removeVariant = (index) => {
    if (variants.length === 1) return;
    const updated = variants.filter((_, i) => i !== index);
    setVariants(updated);
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

  
  const removeExistingImage = (index) => {
    const updated = existingImages.filter((_, i) => i !== index);
    setExistingImages(updated);
  };


  const handleSubmit = () => {
    if (!title.trim() || !subCategory) {
      alert("Title and SubCategory required");
      return;
    }


    const cleanedVariants = variants.map((v) => ({
      ram: v.ram,
      price: Number(v.price),
      qty: Number(v.qty),
    }));

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("subCategory", subCategory);
    formData.append("variants", JSON.stringify(cleanedVariants));

    // existing images 
    formData.append("existingImages", JSON.stringify(existingImages));

    // new images
    images.forEach((img) => formData.append("images", img));

    onSubmit(formData);
  };

  return (
    <div>
      
      <h3 className="pf-title">
        {initialData ? "Edit Product" : "Add Product"}
      </h3>

   
      <div className="pf-row">
        <span className="pf-label">Title :</span>
        <input
          className="pf-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter product title"
        />
      </div>

    
      <div className="pf-row pf-row--top">
        <span className="pf-label pf-label--top">Variants :</span>

        <div className="pf-variants">
          {variants.map((v, i) => (
            <div key={i} className="pf-variant-row">
              <span className="pf-vlabel">Ram:</span>
              <input
                className="pf-vinput"
                value={v.ram}
                onChange={(e) => updateVariant(i, "ram", e.target.value)}
                placeholder="4 GB"
              />

              <span className="pf-vlabel">Price:</span>
              <input
                className="pf-vinput pf-vinput--price"
                value={v.price}
                onChange={(e) => updateVariant(i, "price", e.target.value)}
                placeholder="₹ 0.00"
              />

              <span className="pf-vlabel">QTY:</span>

              <button
                className="pf-qty-btn"
                onClick={() => changeQty(i, -1)}
              >
                ‹
              </button>

              <span className="pf-qty-val">{v.qty}</span>

              <button
                className="pf-qty-btn"
                onClick={() => changeQty(i, 1)}
              >
                ›
              </button>

             
              <button
                className="pf-remove-variant"
                onClick={() => removeVariant(i)}
              >
                ✕
              </button>
            </div>
          ))}

          <div className="pf-variant-add-wrap">
            <button className="pf-btn-add-variant" onClick={addVariant}>
              Add variant
            </button>
          </div>
        </div>
      </div>

      
      <div className="pf-row">
        <span className="pf-label">Sub category :</span>

        <div className="pf-select-wrap">
          <select
            className="pf-input pf-select"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="" disabled>
              Select sub category
            </option>

            {subCategories?.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

    
      <div className="pf-row pf-row--top">
        <span className="pf-label pf-label--top">Description :</span>

        <textarea
          className="pf-input pf-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter product description"
        />
      </div>

   
      <div className="pf-row pf-row--top">
        <span className="pf-label pf-label--top">Upload image:</span>

        <div className="pf-images">

        {/* existing images */}
          {existingImages.map((img, i) => (
            <div key={i} className="pf-img-wrapper">
              <img
                className="pf-img-thumb"
                src={`${baseUrl}/uploads/${img}`}
                alt=""
              />
              <button
                className="pf-img-remove"
                onClick={() => removeExistingImage(i)}
              >
                ✕
              </button>
            </div>
          ))}

          {/* New images */}
          {images.map((img, i) => (
            <img
              key={i}
              className="pf-img-thumb"
              src={URL.createObjectURL(img)}
              alt=""
            />
          ))}

          {/* Upload */}
          <label className="pf-img-placeholder">
            +
            <input
              type="file"
              multiple
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) =>
                setImages([...images, ...Array.from(e.target.files)])
              }
            />
          </label>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="pf-actions">
        <button className="pf-btn-add" onClick={handleSubmit}>
          {initialData ? "UPDATE" : "ADD"}
        </button>

        <button className="pf-btn-discard" onClick={onClose}>
          DISCARD
        </button>
      </div>
    </div>
  );
}

export default ProductForm;