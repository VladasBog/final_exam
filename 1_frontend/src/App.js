import React, { Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
const HomePage = React.lazy(() => import("./pages/HomePage"));
function App() {
  return (
    <>
      <Link to={"/"}>Home</Link>
      <Link to={"/appointments"}>Appointments</Link>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/appointments" element={<p>Appointments</p>} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
