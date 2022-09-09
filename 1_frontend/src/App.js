import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
const HomePage = React.lazy(() => import("./pages/HomePage"));
const AppointmentsPage = React.lazy(() => import("./pages/AppointmentsPage"));

function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
