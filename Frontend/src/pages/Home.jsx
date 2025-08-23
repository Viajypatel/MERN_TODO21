import React, { useContext } from 'react'
import TodoPage from './TodoPage'
import { AuthContext, AuthProvider } from '../context/AuthContext'
function Home() {
  const {logout}=useContext(AuthContext);
  return (
    <div className="">
 <button
    className="fixed top-4 right-4 hover:bg-red-700 bg-red-500 px-3 py-2 border-2 border-black rounded-md z-50"
    onClick={logout}
  >
    Logout
  </button>

 <TodoPage/>
    </div>
  )
}

export default Home
