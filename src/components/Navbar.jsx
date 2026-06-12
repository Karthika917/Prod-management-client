import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useWishlist } from '../contextApi/WishlistContext';
import WishlistPanel from './ui/WishlistPanel';

function Navbar({ onSearch }) {

  const [showWishlist, setShowWishlist] = useState(false);
  const { wishlist } = useWishlist()
  return (
    <>
      <nav className="navbar-container">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
          <div className="d-flex search-wrapper">
            <input placeholder="Search product" onChange={(e) => onSearch?.(e.target.value)} className="search-input" />
            <button className="search-btn">Search</button>
          </div>
          <div className="d-flex align-items-center gap-3">
            {/* Heart icon now opens wishlist panel */}
            <button
              className="nav-link-custom border-0 bg-transparent"
              onClick={() => setShowWishlist(true)}
            >
              <div style={{ position: "relative" }}>
                <FiHeart size={15} />
                {wishlist.length > 0 && (
                  <span className="wishlist-badge">{wishlist.length}</span>
                )}
              </div>
              <span>Wishlist</span>
            </button>

            <Link to="/" className="nav-link-custom">
              <span>Sign In</span>
            </Link>
            <Link to="#" className="nav-link-custom">
              <FiShoppingCart size={15} />
              <span>Cart</span>
            </Link>
          </div>
        </div>
      </nav>

      <WishlistPanel isOpen={showWishlist} onClose={() => setShowWishlist(false)} />
    </>
  )
}

export default Navbar
