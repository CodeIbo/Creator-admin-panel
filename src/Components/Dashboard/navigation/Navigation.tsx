import { useState } from "react"
import { Link } from "react-router-dom"
import './navigation.scss'
import {FiMenu} from 'react-icons/fi'
import {BsArrowBarLeft} from 'react-icons/bs'
const NavigationBar = () =>{
    const [menu, setMenu] = useState(false)
    return(
        menu ?
        <nav className="nav">
            <button className="nav__icons" onClick={() => setMenu(!menu)}><BsArrowBarLeft /></button>
            <Link className="nav__link" to="/dashboard">Główna Strona</Link>
            <Link className="nav__link" to="/dashboard/subsites">Podstrony</Link>
            <Link className="nav__link" to="/dashboard/blog">Blog</Link>
            <Link className="nav__link" to="/dashboard/users">Użytkownicy</Link>
            <Link className="nav__link" to="/dashboard/statistics">Statystyki</Link>
        </nav>
        : 
        <nav className="nav nav--hide">
            <button className="nav__icons" onClick={() => setMenu(!menu)}><FiMenu /></button>
        </nav>
    )
}

export default NavigationBar