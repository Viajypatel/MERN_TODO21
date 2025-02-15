import React, { useContext } from 'react'
import TodoPage from './TodoPage'
import { AuthContext, AuthProvider } from '../context/AuthContext'
function Home() {
  const {logout}=useContext(AuthContext);
  return (
    <div>
 <button
  className="absolute top-0 right-0 mt-2 mr-2 hover:bg-red-700 bg-red-500 px-2 py-2 border-2 border-black rounded-md"
  onClick={logout}
>
  Logout
</button>

      <TodoPage/>
    </div>
  )
}

export default Home
