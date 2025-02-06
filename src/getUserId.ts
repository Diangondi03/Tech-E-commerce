import { jwtDecode } from "jwt-decode";

export const getUserId  = () : string | null => {
    const token : string | null = localStorage.getItem("token")
    if(token)
        return jwtDecode(token)?.id;
    return null
}