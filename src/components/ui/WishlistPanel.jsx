import { useWishlist } from "../../contextApi/WishlistContext";
import { FiX, FiTrash2 } from "react-icons/fi";
import baseUrl from "../../services/base_url";

function WishlistPanel({ isOpen, onClose }) {
    const { wishlist, toggleWishlist } = useWishlist();

    return (
        <>

            {isOpen && <div className="wishlist-overlay" onClick={onClose} />}


            <div className={`wishlist-panel ${isOpen ? "open" : ""}`}>
                <div className="wishlist-header">
                    <span>Wishlist ({wishlist.length})</span>
                    <button onClick={onClose}><FiX size={18} /></button>
                </div>

                {wishlist.length === 0 ? (
                    <p className="wishlist-empty">No items in wishlist</p>
                ) : (
                    wishlist.map((product) => (
                        <div className="wishlist-item" key={product._id}>
                            <img
                                src={
                                    product.images?.[0]
                                        ? `${baseUrl}/uploads/${product.images[0]}`
                                        : "https://via.placeholder.com/60x60?text=No+Image"
                                }
                                alt={product.title}
                                className="wishlist-item-img"
                            />
                            <div className="wishlist-item-info">
                                <div className="wishlist-item-name">{product.title}</div>
                                <div className="wishlist-item-price">
                                    ${product.variants?.[0]?.price || "N/A"}
                                </div>
                            </div>
                            <button
                                className="wishlist-remove-btn"
                                onClick={() => toggleWishlist(product)}
                            >
                                <FiTrash2 size={15} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default WishlistPanel;