import { useState } from "react";

function CategoryForm({ onSubmit, onClose }) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit(name);
    setName("");
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", fontSize: "16px", fontWeight: 500, marginBottom: "18px" }}>
        Add Category
      </h3>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter category name"
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

export default CategoryForm;