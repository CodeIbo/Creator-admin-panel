import { ButtonInterface, IconButtonInterface } from "../../../Interfaces/buttonInterface"
import './button.scss';
import {BsInfoCircleFill} from 'react-icons/bs';

export const Button = ({clickFunction, name,backgroundColorClass,textColorClass,type}: ButtonInterface) =>{
    return (
        <button onClick={(e) =>{ clickFunction(e)}} className={`button ${backgroundColorClass || 'bg-primary' }  ${textColorClass || 'text-secondary'}`} type={type || "button"}>
            <span>{name}</span>
        </button>
    )
}
export const IconButton = ({clickFunction,Icon,title,type,customClass}:IconButtonInterface) =>{
    return (
        <button onClick={(e) =>{ clickFunction(e)}} title={title || "Click me"} className={`${customClass} button-icon`} type={type || "button"}>{Icon ? Icon : <BsInfoCircleFill/>}</button>
    )
}