import { CartProvider } from "./CartContext";
import { AuthProvider } from "./AuthContext";
import { UIProvider } from "./UIContext";
import { ProductProvider } from "./ProductContext";

export const ContextWrapper = ({ children }) => {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <UIProvider>{children}</UIProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
};
