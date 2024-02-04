import React from 'react'
import Logo from '../download.png'
import { Link } from 'react-router-dom'
function NavBar() {
  return (
    <div className=" flex items-center space-x-8 text-black-400 text-xl font-bold pl-12 py-4"
    >
        <img src={Logo} className="w-[50px]"></img>
        <Link to="/">Movies</Link>
        <Link to="/favourites">Favourites</Link>
    </div>
  )
}

export default NavBar