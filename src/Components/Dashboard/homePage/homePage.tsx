import { useContext } from "react";
import { UserContext } from "../../../Context/UserContext";

const HomePage = () => {
    const userContext = useContext(UserContext);
    return (
            <div className="py-1 text-secondary text-center">   
                <h1 className="pb-2">Witaj</h1>                
               {userContext.user?.displayName && <p>{userContext.user?.displayName}</p>}
               <p className="pb-1">Twój email:</p>
               <p>{userContext.user?.email}</p>
            </div>
            
    )
}
export default HomePage