import { axiosApi } from "@/api/tesloApi"
import type { AuthResponse } from "../interfaces/auth.response";

export const loginActions  = async(email:string, password:string):Promise<AuthResponse>=>{

    try {
        const {data} = await axiosApi.post<AuthResponse>('auth/login',{
            email:email,
            password:password
        })

        console.log(data );
        return data

    } catch (error) {
        console.log(error);
        throw error
        
    }
}

export const RegisterActions  = async(email:string, password:string, fullName:string):Promise<AuthResponse>=>{

    try {
        const {data} = await axiosApi.post<AuthResponse>('auth/register',{
            email:email,
            password:password,
            fullName: fullName
        })

        console.log(data );
        return data

    } catch (error) {
        console.log(error);
        throw error
        
    }
}