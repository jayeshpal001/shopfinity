import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const [isRemoving, setIsRemoving] = useState(null);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shipping = subtotal > 0 ? 50 : 0;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const handleRemove = (id) => {
    setIsRemoving(id);
    setTimeout(() => {
      removeFromCart(id);
      setIsRemoving(null);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 mr-2 text-indigo-600"
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
                  Shopping Cart
                </h1>
                <p className="text-gray-600 mt-1">
                  {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in
                  your cart
                </p>
              </div>

              <AnimatePresence>
                {cartItems.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-16 px-4"
                  >
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 flex items-center justify-center mb-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-gray-400"
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
                    </div>
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-gray-600 text-center max-w-md mb-6">
                      Looks like you haven't added anything to your cart yet.
                      Start shopping to fill it with amazing products!
                    </p>
                    <Link to="/" >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md"
                      >
                        Start Shopping
                      </motion.button>
                    </Link>
                  </motion.div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: isRemoving === item.id ? 0 : 1,
                          y: 0,
                          x: isRemoving === item.id ? 100 : 0,
                        }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 flex flex-col sm:flex-row"
                      >
                        <div className="flex-shrink-0 w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                          <img
                            src={item?.image}
                            alt={item.title}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>

                        <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">
                                {item.title}
                              </h3>
                              <p className="mt-1 text-gray-600 text-sm">
                                SKU:{" "}
                                {Math.floor(100000 + Math.random() * 900000)}
                              </p>
                            </div>
                            <button
                              onClick={() => handleRemove(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
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
                            </button>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100" onClick={()=> decreaseQuantity(item.id) }>
                                  -
                                </button>
                                <span className="px-4 py-1">{item.quantity}</span>
                                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100" onClick={()=> increaseQuantity(item.id) } >
                                  +
                                </button>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900">
                                ₹{(item.price.toFixed(2)*item.quantity)}
                              </p>
                              {item.originalPrice && (
                                <p className="text-sm text-gray-500 line-through">
                                  ₹{item.originalPrice.toFixed(2)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {cartItems.length > 0 && (
              <div className="mt-6 flex justify-between">
                <button
                  onClick={clearCart}
                  className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Clear Cart
                </button>
                <Link to="/" >
                <button className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    />
                  </svg>
                  Continue Shopping
                </button>
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="md:w-1/3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-6">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">
                  Order Summary
                </h2>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping > 0 ? `₹${shipping.toFixed(2)}` : "Free"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (18%)</span>
                    <span className="font-medium">₹{tax.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {cartItems.length > 0 && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      Proceed to Checkout
                    </motion.button>

                    <div className="mt-6 text-center">
                      <p className="text-gray-600 text-sm">We accept:</p>
                      <div className="flex justify-center space-x-4 mt-2">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-8" />
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-8" />
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-8" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {cartItems.length > 0 && (
              <div className="mt-6 bg-indigo-50 rounded-xl p-6">
                <h3 className="font-bold text-indigo-800 mb-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Secure Checkout
                </h3>
                <p className="text-indigo-700 text-sm">
                  Your payment information is encrypted and secure. We don't
                  share your details with anyone.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
