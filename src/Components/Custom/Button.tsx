import { ButtonInterface } from "../../Interfaces/buttonInterface"
import './button.scss'


export const Button = ({clickFunction, name,backgroundColorClass,textColorClass}: ButtonInterface) =>{


    return (
        <button onClick={clickFunction} className={`button ${backgroundColorClass} ${textColorClass}`}>
            <span>{name}</span>
        </button>
    )
}