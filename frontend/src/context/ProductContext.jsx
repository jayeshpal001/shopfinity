import { createContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export const  ProductContext = createContext(); 

export const ProductProvider = ({children})=>{
     const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null); 
      const [productData, setProductData] = useState([]); 
      useEffect(() => {
        const getData = async()=>{
             try {
                const res = await axiosInstance.get("/products"); 
                  setProductData(res.data); 
                  setLoading(false); 
             } catch (error) {
                 setError("Something error in API...."); 
                 setLoading(false);
             }
        }
        getData(); 
      }, [])
      console.log("This data form context", productData);

return(
    <ProductContext.Provider value={{productData, loading, error}}>
       {children}
    </ProductContext.Provider>
)
}