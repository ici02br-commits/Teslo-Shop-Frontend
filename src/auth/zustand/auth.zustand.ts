import type { User } from '@/interfaces/user.interface'
import { create } from 'zustand'
import { loginActions, RegisterActions } from '../actions/login.action'
import { chechAuth } from '@/shop/Actions/chec-auth.actions'

type AuthStastus =  'authenticated'|'not-authenticated'|'checking'

interface AuthState {
    //propiedades
    user:User|null
    token: string|null
    authStatus:AuthStastus

    isAdmin:()=>boolean

    //funciones
    login: (email:string, password:string)=>Promise<boolean>
    register:(email:string, password:string, fullName:string)=> Promise<boolean>
    logout: ()=> void
    checkAuthStatus: ()=> Promise<boolean>
}



export const useZustandAuth= create<AuthState>()((set,get) => ({
    user:null,
    token:null,
    authStatus: 'checking',

    isAdmin: ()=>{
        const user = get().user?.roles || []
        return user.includes('admin')  //devuelve true si se encuentra admin en user
    }
    ,

    login: async(email:string, password:string)=>{
       
        try {
            const data = await loginActions(email, password)
            localStorage.setItem('token',data.token)  

            set({user: data.user, token:data.token, authStatus:'authenticated'})
            
            return true

        } catch (error) {
            localStorage.removeItem('token')
            set({user: null, token:null, authStatus:'not-authenticated'})
            return false
        }
       
    },

     register: async(email:string, password:string, fullName:string)=>{
       
        try {
            const data = await RegisterActions(email, password,fullName)
            localStorage.setItem('token',data.token)  

            set({user: data.user, token:data.token, authStatus:'authenticated'})
            
            return true

        } catch (error) {
            localStorage.removeItem('token')
            set({user: null, token:null, authStatus:'not-authenticated'})
            return false
        }
       
    },

    logout: ()=>{
        localStorage.removeItem('token')
        set({
            user:null,
            token:null,
            authStatus:'not-authenticated'
        })
    },

    checkAuthStatus: async()=>{
        try {
            const { user,token} = await chechAuth()
            set({
                user,
                token,
                authStatus:'authenticated'
            })
            return true
        } catch (error) {
            set({
            user:undefined,
            token:undefined,
            authStatus:'not-authenticated'
        })
            throw new Error("error");     
            return false       
        }
    }
}))