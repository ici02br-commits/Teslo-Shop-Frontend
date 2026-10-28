import { axiosApi } from "@/api/tesloApi"
import type { AuthResponse } from "@/auth/interfaces/auth.response"

 export const chechAuth = async():Promise<AuthResponse>=>{
    const token = localStorage.getItem('token')
    if(!token) throw new Error('token not found')

    try {

        const {data} = await axiosApi.get<AuthResponse>('/auth/check-status',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        localStorage.setItem('token', data.token)
        console.log(data);
        
        return data

    } catch (error) {

        localStorage.removeItem('token')
        throw new Error( 'Token Expired')
        console.log('error');
        
    }
 }