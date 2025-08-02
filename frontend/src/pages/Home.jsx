
import { useContext } from "react";
import { CartCard } from "../components/CartCard";
import { ProductContext } from "../context/ProductContext";

const Home = () => {
  const {productData} = useContext(ProductContext)
  console.log("App ka Data", productData);
  
  return (
    <div className="w-screen flex gap-4 flex-wrap justify-center">
      {productData?.map((item, index) => (
        <CartCard key={index} items={item} />
      ))}
    </div>
  );
};

export default Home;
