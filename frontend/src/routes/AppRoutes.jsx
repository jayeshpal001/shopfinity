import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import {Register} from '../pages/Register'

import { CartPage } from '../pages/CartPage';
import UserProfile from '../pages/UserProfile';
import { ProductContext } from '../context/ProductContext';

export const AppRoutes = () => {

   const {loading, error} = useContext(ProductContext); 
      
  return (
    <div>
      <Routes>
        <Route path='/' element={
          loading ? (<p className='text-blue-800 text-3xl text-center m-20' >Loading........</p>) : error ?( <p>{error}</p> ) : ( <Home/> ) 
        }  />
        <Route path='login' element={ <Login /> } />
        <Route path='register' element={ <Register/> } />
        <Route path='cart' element={<CartPage/>} />
         <Route path='profile' element={<UserProfile/>} />

      </Routes>
    </div>
  )
}
