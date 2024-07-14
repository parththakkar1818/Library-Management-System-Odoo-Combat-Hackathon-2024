import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Bookdetail from "./Components/Bookdetail";
import AllBooks from "./Components/AllBooks";
import UpdateBook from "./Components/UpdateBook";
import Home from "./Components/Home";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Bookdetail />} />
          <Route path="/allbooks" element={<AllBooks />} />
          <Route path="/update_book/:bookId" element={<UpdateBook />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
