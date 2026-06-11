import React from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingCart } from "react-icons/fi";


function Navbar() {
  return (
   <nav className="navbar-container">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div className="d-flex search-wrapper">
          <input placeholder="Search any things" className="search-input" />
          <button className="search-btn">Search</button>
        </div>
        <div className="d-flex align-items-center gap-3">
          <Link to="/login" className="nav-link-custom">
            <FiHeart size={15} />
            <span>Sign In</span>
          </Link>
          <Link to="#" className="nav-link-custom">
            <FiShoppingCart size={15} />
            <span>Cart</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
