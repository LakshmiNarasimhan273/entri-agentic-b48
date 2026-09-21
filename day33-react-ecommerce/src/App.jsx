import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Favorites from "./pages/Favorites";

function App() {

  return (

    <div>

      {/* Common Navigation */}
      <Navbar />

      <Routes>

        {/* Main Routes */}

        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        {/* Profile Parent Route */}

        <Route path="/profile" element={<Profile />}>

          {/* Nested Routes */}

          <Route path="orders" element={<Orders />} />

          <Route path="favorites" element={<Favorites />} />

        </Route>

      </Routes>

    </div>
    

  );
}

export default App;