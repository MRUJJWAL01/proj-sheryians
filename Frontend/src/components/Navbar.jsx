import { useSelector } from "react-redux";
import Searchbar from "./Searchbar";
import { useNavigate } from "react-router";
import { logOut } from "../apis/AuthApis";


const Navbar = () => {
  const navigate = useNavigate();
  const {isLoggedIn} = useSelector((state)=>state.auth);

  return (
    <nav className="bg-white shadow-xl sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <span onClick={()=>navigate("/")}  className="text-xl cursor-pointer font-bold text-blue-700 tracking-wide">
              E-comm
            </span>
          </div>
          <div className="flex-1 flex justify-center">
            <Searchbar />
          </div>
          <div className="flex items-center gap-4">
            <a onClick={()=>navigate("/")} className="text-gray-700 cursor-pointer hover:text-blue-600 px-2">
              Home
            </a>
            <a href="#" onClick={()=>{navigate("/cart")}} className="text-gray-700 hover:text-blue-600 px-2">
              Cart
            </a>
           {isLoggedIn? <button onClick={""} className="ml-4 cursor-pointer px-4 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-50 transition">
              Log out
            </button> :
            <button onClick={()=>navigate("/auth")} className="ml-4 cursor-pointer px-4 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-50 transition">
              Login
            </button>}
            <button className="ml-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
              Become a Seller
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


// import React, { useState } from "react";
// import Searchbar from "./Searchbar";
// import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";

// export default function Navbar() {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
//         {/* LEFT: Brand Name */}
//         <div className="font-bold text-2xl text-blue-600 flex-shrink-0">BrandName</div>

//         {/* CENTER: Search Bar (hidden on mobile, shown on md+) */}
//         <div className="flex-1 hidden md:flex justify-center">
//           <Searchbar />
//         </div>

//         {/* RIGHT: Menu links and buttons (hidden on small screens) */}
//         <div className="hidden md:flex items-center gap-4">
//           <a href="/" className="text-gray-700 font-medium hover:text-blue-500 transition">Home</a>
//           <a href="/products" className="text-gray-700 font-medium hover:text-blue-500 transition">Products</a>
//           <a href="/cart" className="flex items-center text-gray-700 font-medium hover:text-blue-500 transition">
//             <FiShoppingCart className="mr-1" />
//             Cart
//           </a>
//           <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold transition">Login</button>
//           <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white font-semibold transition">Become a Seller</button>
//         </div>

//         {/* MOBILE: Hamburger */}
//         <div className="flex md:hidden">
//           <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
//             {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* MOBILE: Slide-out menu (includes searchbar) */}
//       {mobileOpen && (
//         <div className="md:hidden px-4 pb-3 bg-white shadow-lg">
//           <div className="my-2">
//             <Searchbar />
//           </div>
//           <a href="/" className="block py-2 text-gray-700 font-medium hover:text-blue-500">Home</a>
//           <a href="/products" className="block py-2 text-gray-700 font-medium hover:text-blue-500">Products</a>
//           <a href="/cart" className="block py-2 text-gray-700 font-medium hover:text-blue-500 flex items-center">
//             <FiShoppingCart className="mr-1" />
//             Cart
//           </a>
//           <button className="w-full my-2 px-4 py-2 bg-blue-500 text-white rounded font-semibold hover:bg-blue-600">Login</button>
//           <button className="w-full my-1 px-4 py-2 border border-blue-500 text-blue-500 rounded font-semibold hover:bg-blue-500 hover:text-white">Become a Seller</button>
//         </div>
//       )}
//     </nav>
//   );
// }
