import { useContext } from "react";
import AuthContext from "../utils/AuthContext";

export default function useAuth() {
    let authObj = useContext(AuthContext);
    return authObj;
}