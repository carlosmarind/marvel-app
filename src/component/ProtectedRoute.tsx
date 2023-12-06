import React from "react"
import { RootState } from "../redux/store"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

interface Props {
    children: React.ReactNode,
    allowedRoles: string[]
}

export const ProtectedComponent = (props: Props) => {

    const user = useSelector((state: RootState) => state.user)
    const location = useLocation();

    return user?.isAuth && props.allowedRoles.filter(rol => user?.role.includes(rol)).length > 0 ?
        (props.children)
        :
        <Navigate to='/login-jwt' state={{ from: location }} replace />
}
