import { useZustandAuth } from "@/auth/zustand/auth.zustand";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";

export const autenticatedRoute = ({children}:PropsWithChildren)=>{
    const {authStatus} = useZustandAuth()

    if(authStatus === "checking") return null
    if (authStatus === "not-authenticated") return <Navigate to={'/auth/login'}/>

    return children
}

export const NotAutenticatedRoute = ({children}:PropsWithChildren)=>{
    const {authStatus} = useZustandAuth()

    if(authStatus === "checking") return null
    if (authStatus === "authenticated") return <Navigate to={'/'}/>

    return children
}

export const AdminRoute = ({children}:PropsWithChildren)=>{
    const {authStatus, isAdmin} = useZustandAuth()

    if(authStatus === "checking") return null
    if (authStatus === "not-authenticated") return <Navigate to={'/auth/login'}/>

    if (!isAdmin()) return <Navigate to={'/'}/>

    return children
}