import { useState } from "react";

function SubCategoryForm({ categories, onSubmit, onClose }) {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !categoryId) return;
    onSubmit({ name, categoryId });
    setName("");
    setCategoryId("");
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", fontSize: "16px", fontWeight: 500, marginBottom: "18px" }}>
        Add Sub Category
      </h3>

      <div style={{ position: "relative", marginBottom: "14px" }}>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          style={{
            width: "100%", boxSizing: "border-box",
            border: "1px solid #ccc", borderRadius: "6px",
            padding: "9px 32px 9px 12px", fontSize: "14px",
            outline: "none", appearance: "none",
            background: "#fff",
            color: categoryId ? "#000" : "#aaa",
            cursor: "pointer",
          }}
        >
          <option value="" disabled>Select category</option>
          {categories?.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <span style={{
          position: "absolute", right: "10px", top: "50%",
          transform: "translateY(-50%)", pointerEvents: "none",
          fontSize: "12px", color: "#888",
        }}>▼</span>
      </div>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter sub category name"
        style={{
          width: "100%", boxSizing: "border-box",
          border: "1px solid #ccc", borderRadius: "6px",
          padding: "9px 12px", fontSize: "14px", marginBottom: "14px",
          outline: "none",
        }}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={handleSubmit}
          style={{
            background: "#C9861A", color: "#fff", border: "none",
            borderRadius: "6px", padding: "9px 22px",
            fontSize: "14px", fontWeight: 500, cursor: "pointer",
          }}
        >
          ADD
        </button>
        <button
          onClick={onClose}
          style={{
            background: "transparent", border: "1px solid #ccc",
            borderRadius: "6px", padding: "9px 18px",
            fontSize: "14px", cursor: "pointer",
          }}
        >
          DISCARD
        </button>
      </div>
    </div>
  );
}

export default SubCategoryForm;