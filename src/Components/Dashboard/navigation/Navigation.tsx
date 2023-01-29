import { Link } from "react-router-dom"
import './navigation.scss'

const NavigationBar = () =>{
    return(
        <nav className="nav">
            <Link className="nav__link" to="/dashboard">Główna Strona</Link>
            <Link className="nav__link" to="/dashboard/subsites">Podstrony</Link>
            <Link className="nav__link" to="/dashboard/blog">Blog</Link>
            <Link className="nav__link" to="/dashboard/users">Użytkownicy</Link>
            <Link className="nav__link" to="/dashboard/statistics">Statystyki</Link>
        </nav>
    )
}

export default NavigationBar