import { Button } from "../../Custom/Button/Button"
import { UserContext } from "../../../Context/UserContext"
import { useContext } from "react"
import './upperBar.scss'
export const UpperBar = () => {
    const userContext = useContext(UserContext);
    return (
        <section className="upperBar">
            <div className="signboard">
                <span>ADMIN PANEL</span>
            </div>
            <Button clickFunction={userContext.logout} name={"Wyloguj"}backgroundColorClass="bg-secondary" textColorClass="text-primary"/>
        </section>
    )
}
