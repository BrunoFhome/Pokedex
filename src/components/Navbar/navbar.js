import './navbar.css';
import React, { useContext } from 'react';
import {FaBars, FaTimes} from "react-icons/fa";
import { useRef } from 'react';
import FavoriteContext from '../../Contexts/favoritesContext';
import { Link } from 'react-router-dom';
function Navbar(){
    const {favoritePokemons} = useContext (FavoriteContext);
    const navRef = useRef();
    const showNavbar = () =>{
        navRef.current.classList.toggle("responsive_nav")
    }

    return(
        <header>
            <img src='https://logodownload.org/wp-content/uploads/2017/08/pokemon-logo-0.png' alt="Logo" className='navbar-img'/>
            <div>
                {favoritePokemons.length}🤍
            </div>
            <nav ref={navRef}>
                <Link to='/'>Home</Link>
                <Link to="/Login">Login</Link>    
                <button className='nav-btn nav-close-btn' onClick={showNavbar}>
                    <FaTimes/>
                </button>
            </nav>
            <button className='nav-btn' onClick={showNavbar}>
                <FaBars/>
            </button>
        </header>
    )






}



export default Navbar;