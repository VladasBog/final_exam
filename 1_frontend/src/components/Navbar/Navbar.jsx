import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { StyledNav } from "./Navbar.style";
import logo from "../../assets/svgs/logo_placeholder.svg";

const Navbar = () => {
  // State
  const [show, setShow] = useState(false);
  return (
    <header>
      <StyledNav className="navbar">
        <div className="nav-center">
          <div className="nav-header">
            <Link to={"/"}>
              <img src={logo} alt="beauty wannabe studio logo" />
            </Link>
            <button className="nav-btn" onClick={() => setShow(!show)}>
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          <div className={show ? "nav-links show-links" : "nav-links"}>
            <Link to={"/"} className="nav-link" onClick={() => setShow(false)}>
              Home
            </Link>
            <Link
              to={"/appointments"}
              className="nav-link"
              onClick={() => setShow(false)}
            >
              Appointments
            </Link>
          </div>
        </div>
      </StyledNav>
    </header>
  );
};

export default Navbar;
