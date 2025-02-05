import { jwtDecode } from "jwt-decode";

export const getUserId = () => {
    return localStorage.getItem("token") ? jwtDecode(localStorage.getItem("token")).id : null;
}