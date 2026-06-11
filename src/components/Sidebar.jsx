import React, { useState } from "react";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";

function Sidebar({ categories }) {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="home-sidebar">
      <div className="home-sidebar-title">Categories</div>

      {categories.map((cat) => (
        <div key={cat._id}>
          
          {/* Category */}
          <div
            className="home-cat-item"
            onClick={() => toggle(cat._id)}
          >
            <span>{cat.name}</span>
            {openId === cat._id ? (
              <FiChevronDown size={12} />
            ) : (
              <FiChevronRight size={12} />
            )}
          </div>

          {/* Subcategories */}
          {openId === cat._id &&
            cat.subCategories.map((sub) => (
              <div key={sub._id} className="home-brand-item">
                • {sub.name}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;