import React from "react";
import { Link } from "react-router-dom";
import { StyledWrapper } from "./HomePage.style";

const HomePage = () => {
  return (
    <main>
      <StyledWrapper>
        <h1>
          Beauty wannabe <span>Studio</span>
        </h1>
        <div className="card">
          <h2>Welcome</h2>

          <p>
            Open hours from <span>8:00</span> to <span>17:00</span>
          </p>

          <Link to={"/appointments"}>Register Appointments</Link>
        </div>
      </StyledWrapper>
    </main>
  );
};

export default HomePage;
