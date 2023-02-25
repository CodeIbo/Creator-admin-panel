import { useState } from "react"
import { Link } from "react-router-dom"
import './navigation.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faArrowLeft } from "@fortawesome/free-solid-svg-icons"
const NavigationBar = () =>{
    const [menu, setMenu] = useState(false)
    return(
        menu ?
        <nav className="nav">
            <button className="nav__icons" onClick={() => setMenu(!menu)}><FontAwesomeIcon icon={faArrowLeft} /></button>
            <Link className="nav__link" to="/dashboard">Główna Strona</Link>
            <Link className="nav__link" to="/dashboard/subsites">Podstrony</Link>
            <Link className="nav__link" to="/dashboard/blog">Blog</Link>
            <Link className="nav__link" to="/dashboard/users">Użytkownicy</Link>
            <Link className="nav__link" to="/dashboard/statistics">Statystyki</Link>
        </nav>
        : 
        <nav className="nav nav--hide">
            <button className="nav__icons" onClick={() => setMenu(!menu)}><FontAwesomeIcon icon={faBars} /></button>
        </nav>
    )
}

export default NavigationBar