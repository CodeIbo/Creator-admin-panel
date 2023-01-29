import { Auth, User } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

export interface userContextInterface {
    user: User | null
    setUser: Dispatch<SetStateAction<User | null>>
    login: (auth:Auth,loginEmail:string,loginPassword:string) => void
    logout: () => void
} 