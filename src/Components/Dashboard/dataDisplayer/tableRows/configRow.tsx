import { useState } from "react"
import { Link } from "react-router-dom"

const ConfigRows = ({ tableProperty, data }:{tableProperty:any,data:any}) =>{
    const [clickedLink, setClickedLink] = useState<boolean>(false)
    // Object.keys(data[`${key}`])[0]
    
    return(
       <>
        {
        data && Object.keys(data).map(key =>(
            <tr className="table__row shadow" key={key}>
                <td>{key}</td>   
                <td>Placeholder</td>
                
              <td className="d-flex justify-content-center flex-column gap-1">
              <Link
                className="button bg-primary text-secondary"
                to={`${key}/edit`}
              >
                <span>Edycja</span>
              </Link>
             {key === "spotify" &&  <a className={`button bg-primary text-secondary ${clickedLink && 'btn--disabled'}`} href="http://localhost:8888/spotify/callback" target="_blank" rel="noopener">Autoryzuj</a>      
             }
            </td>
            </tr>
            
        ))
        }
       </>
    )
}

export default ConfigRows
