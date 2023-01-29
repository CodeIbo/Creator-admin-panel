import { useContext } from "react";
import { UserContext } from "../../../Context/UserContext";


const Users = () => {
    const userContext = useContext(UserContext);
    return <h2>Login User: {userContext.user?.email} </h2>
}

export default Users