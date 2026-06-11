function Modal({ isOpen, onClose, children, width = "400px" }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          padding: "28px 28px 24px",
          borderRadius: "8px",
          width: width,           // 👈 dynamic width
          maxWidth: "95vw",       // 👈 responsive on small screens
          boxSizing: "border-box",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;