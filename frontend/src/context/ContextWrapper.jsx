import { CartProvider } from "./CartContext";
import { AuthProvider } from "./AuthContext";
import { UIProvider } from "./UIContext";
import { ProductProvider } from "./ProductContext";

export const ContextWrapper = ({ children }) => {
  return (
    <UIProvider>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
    </UIProvider>
  );
};
