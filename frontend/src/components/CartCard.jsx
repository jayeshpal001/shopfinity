import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';

export const CartCard = ({ items }) => {
  const { addToCart } = useContext(CartContext);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(items);
    setIsAdded(true);
    
    // Reset animation after 2 seconds
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div
      className="relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Favorite button */}
      <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md z-10 hover:text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Product Image */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={items?.image} 
          alt={items?.title} 
          className="w-full h-full object-contain p-4 transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <div className="p-5">
        <h3 className="text-gray-900 font-medium text-lg mb-1 line-clamp-2 h-14">
          {(items.title).substring(0, 35)}
        </h3>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-indigo-600">₹{items.price}</span>
          
          {/* Rating */}
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-gray-600 ml-1">(24)</span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          className={`w-full mt-4 py-3 rounded-lg font-medium transition-all
            ${isAdded 
              ? 'bg-green-500 text-white' 
              : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700'}
          `}
          onClick={handleAddToCart}
          whileTap={{ scale: 0.95 }}
          animate={isAdded ? { 
            backgroundColor: ['#6366f1', '#10b981'],
            transition: { duration: 0.5 } 
          } : {}}
        >
          <div className="flex items-center justify-center">
            {isAdded ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Added!
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </>
            )}
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
};