import React from "react"
import { RootState } from "../redux/store"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

interface Props {
    children: React.ReactNode
}

export const ProtectedComponent = (props: Props) => {

    const user = useSelector((state: RootState) => state.user)
    const location = useLocation();
    console.log(user);
    if (user?.isAuth) {
        return (
            <>
                {props.children}
            </>
        )
    }

    return <Navigate to='/login' state={{ from: location }} replace />


}
