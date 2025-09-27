import React from 'react'
import './App.css'
import Register from './pages/Register';
import Login from './pages/Login';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './component/PrivateRoute';
import TeacherStudent from './pages/TeacherStudent';
function App() {
  

  return (
    <>
      
    <BrowserRouter>
    <Toaster position="top-right" />
      <Routes>
      {/* private route */}
      <Route element={<PrivateRoute/>}>
        <Route path="/home" element={<Home/>}/>
      </Route>
      <Route path='TS' element={<TeacherStudent/>}/>
        <Route path="/" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
