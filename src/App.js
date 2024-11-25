import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages";
import JSONBDetail from "./pages/jsonb_shared";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<JSONBDetail />} />
    </Routes>
  );
}

export default App;
