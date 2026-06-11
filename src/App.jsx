import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProductDetails from './pages/ProductDetails'

function App() {
 

  return (
    <>
     <ToastContainer />
    <Routes>
      <Route path='/' element= {<Home/>}/>
      <Route path='/login' element= {<Login/>}/>
      <Route path='/signup' element= {<Signup/>}/>
      <Route path='/product/:id' element= {<ProductDetails/>}/>
      
    </Routes>
      
    </>
  )
}

export default App
