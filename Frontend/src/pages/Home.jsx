import React, { useContext } from 'react'
import TodoPage from './TodoPage'
import Navbar from '../component/Navbar'
function Home() {

  return (
    <div className="m-0">
 <Navbar/>
 <TodoPage/>
    </div>
  )
}

export default Home
