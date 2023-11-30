import React from "react"
import { RootState } from "../redux/store"
import { useSelector } from "react-redux"
import { Navigate,  useLocation } from "react-router-dom"

interface Props {
    children: React.ReactNode,
    allowedRoles: string[]
}

export const ProtectedComponent = ({ children, allowedRoles }: Props) => {

    const user = useSelector((state: RootState) => state.user)
    const location = useLocation();

    //console.log(user);
    console.log("find", allowedRoles.find((role) => user.role.includes(role)));

    if (allowedRoles.find((role) => user.role.includes(role))) {
        console.log("true");
    }
    return user?.isAuth && allowedRoles.find((role) => user.role.includes(role)) ?
        (children) :
        (<Navigate to='/login' state={{ from: location }} replace />)
}



