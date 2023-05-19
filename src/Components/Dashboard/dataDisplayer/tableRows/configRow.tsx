import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../../../Custom/Button/Button"
import { useAxiosPost } from "../../../../Hooks/useAxiosHook"

const ConfigRows = ({ tableProperty, data }:{tableProperty:any,data:any}) =>{
    const [isLoadedData, setIsLoadedData] = useState<string>("")
    const { response, postAxios } = useAxiosPost(`spotify/podcast/refresh/${isLoadedData}`);
    const updateEpisodes = () =>{
      postAxios();
    }
    useEffect(() => {
      if(data){
        if('spotify' in data){
          setIsLoadedData(data.spotify.episodeId)
        } 
      }
    }, [data])
    
    
    
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
             {key === "spotify" &&  <>
             <a className="button bg-primary text-secondary" href="http://localhost:8888/spotify/callback" target="_blank" rel="noopener">Autoryzuj</a> 
             <Button name="Aktualizuj" clickFunction={updateEpisodes} disabled={!data?.spotify.episodeId}/>
             </>    
             }
            </td>
          </tr>
            
        ))
        }
       </>
    )
}

export default ConfigRows
