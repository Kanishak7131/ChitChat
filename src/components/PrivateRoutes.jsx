import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"

export default function PrivateRoutes() {
    let { user } = useAuth();
    return (
        <>
            {user ? <Outlet /> : <Navigate to="/login" />}
        </>
    )
}