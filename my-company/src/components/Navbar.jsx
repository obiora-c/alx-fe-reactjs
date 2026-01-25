

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        background: "#222",
        backgroundColor: "yellowgreen",
        justifyContent: "center",
        padding: "15px",
        display: "flex",
        gap: "20px",
      }}
    >
      <Link style={{ color: "white" }} to="/">Home</Link>
      <Link style={{ color: "white" }} to="/about">About</Link>
      <Link style={{ color: "white" }} to="/services">Services</Link>
      <Link style={{ color: "white" }} to="/contact">Contact</Link>
    </nav>
  );
};

export default Navbar;