import React from "react";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
import { Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        {/* <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link> */}
        <Link to="/products">Products</Link>
        <Link to="/account">Account</Link>
      </nav>

      {/* <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Routes> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        {/* parent route */}
        <Route path="/account" element={<Account />}>

        {/* nested routes */}
        <Route path="profile" element={<Profile />} />
        <Route path="orders" element={<Orders />} />

        </Route>
        
      </Routes>
    </div>
  );
}

export default App;
