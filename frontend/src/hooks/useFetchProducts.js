import React, { useEffect, useState } from 'react'


export const useFetchProducts = (url) => {

    const[data, setData] = useState([]); 
    useEffect(()=>{
         const fetchData = async () => {
            try {
            const response = await fetch(url);
            const ans = await response.json(); 
            setData(ans); 
            setLoading(false); 
            } catch (error) {
                setError("Something error in Api"); 
                setLoading(false); 
            } 
         }
         fetchData(); 
    }, [url] ); 

  return {data}; 
}
