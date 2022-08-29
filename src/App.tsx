import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

import Header from "./Components/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/tv" element={<Tv />} />
          <Route path="/search" element={<Search />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
