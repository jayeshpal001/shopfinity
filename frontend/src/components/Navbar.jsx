import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { UIContext } from "../context/UIContext";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartItems } = useContext(CartContext);
  const { hideNav } = useContext(UIContext);
  const { logoutUser } = useContext(AuthContext);
  const location = useLocation();

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-xl py-1"
          : "bg-white/80 backdrop-blur-sm py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Animated Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 flex items-center"
          >
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"
            >
              Shopfinity
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <NavLink to="/" text="Home" />
            <NavLink to="/cart" text="Cart" count={cartItems.length} />

            {hideNav && (
              <div>
                {" "}
                <NavLink to="/login" text="Login" />
              </div>
            )}

            {/* Profile icon with dropdown */}
            {hideNav ? (
              <span></span>
            ) : (
              <div className="relative group ml-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-1">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-purple-100"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-gray-800 hover:bg-purple-100"
                  >
                    My Orders
                  </Link>
                  <Link
                    onClick={logoutUser}
                    className="block px-4 py-2 text-gray-800 hover:bg-purple-100"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <div className="flex md:hidden items-center">
            {/* Cart icon with badge for mobile */}
            <Link to="/cart" className="relative mr-4 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartItems.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {cartItems.length}
                </motion.span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 p-2 rounded-lg hover:bg-gray-100 focus:outline-none transition-all"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="px-4 pt-2 pb-4 space-y-3">
              <MobileLink to="/" text="Home" />
              <MobileLink
                to="/cart"
                text={`Cart ${
                  cartItems.length > 0 ? `(${cartItems.length})` : ""
                }`}
              />
              {hideNav ? (
                <MobileLink to="/login" text="Login" />
              ) : (
                <div className="border-t border-gray-200 pt-3">
                  <MobileLink to="/profile" text="My Profile" />
                  <MobileLink to="/orders" text="My Orders" />
                  <Link
                    onClick={logoutUser}
                    className="block py-2 px-4 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all font-medium"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Reusable NavLink Component
const NavLink = ({ to, text, count }) => (
  <motion.div whileHover={{ y: -2 }} className="relative">
    <Link
      to={to}
      className="text-gray-700 hover:text-purple-600 transition-all font-medium flex items-center"
    >
      {text}
      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-1.5 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
        >
          {count}
        </motion.span>
      )}
    </Link>
    <motion.div
      className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
      whileHover={{ width: "100%" }}
      transition={{ duration: 0.3 }}
    />
  </motion.div>
);

// Mobile Link Component
const MobileLink = ({ to, text }) => (
  <Link
    to={to}
    className="block py-2 px-4 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all font-medium"
  >
    {text}
  </Link>
);

export default Navbar;
