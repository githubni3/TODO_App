import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import '../styles/Header.css'
import { Context, server } from '../index'
import axios from 'axios';
import { toast } from 'react-hot-toast';
function Header() {
  const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);
  const [hamburger,setHamburger] = useState(false);

  const logoutHandler = async()=>{
    hamburgerHandler()
    setLoading(true);
    try {
      const {data} = await axios.get(`${server}/user/logout`,{
        withCredentials:true
      })
      setIsAuthenticated(false)
      setLoading(false)
      toast.success(data.message);
    } catch (error) {

      setIsAuthenticated(isAuthenticated);

      setLoading(false)
      toast.error(error.response.data.message);
    }
  }

  const hamburgerHandler =()=>{ 
    // hamburgerHandler()
    setHamburger(!hamburger)
  }

  return (
    <>
      <nav className='header'>
        <div>
            <Link to={"/"}>TODO App</Link>
        </div>
        <article>
            <Link to={"/"}>Home</Link>
            <Link to={"/profile"}>Profile</Link>
            {
              isAuthenticated? 
              <button disabled={loading} onClick={logoutHandler} className='btn'>Logout</button>:
              <Link to={"/login"}>Login</Link>
          }
        </article>
      </nav>
      <nav className='mob_header'>
        <div>
            <Link to={"/"}>TODO App</Link>
        </div>
        <div onClick={hamburgerHandler} className={`${hamburger? 'hamburger_cross':''} hamburger`}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <article className={`${!hamburger? 'hide':''} mob_sidebar`}>
            <Link onClick={hamburgerHandler} to={"/"}>Home</Link>
            <Link onClick={hamburgerHandler} to={"/profile"}>Profile</Link>
            {
              isAuthenticated? 
              <button disabled={loading} onClick={logoutHandler} className='btn'>Logout</button>:
              <Link onClick={hamburgerHandler} to={"/login"}>Login</Link>
          }
        </article>
    </nav>
    </>
    
  )
}

export default Header