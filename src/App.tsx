import { RouterProvider } from "react-router"
import { router } from "./app.router"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import {Toaster} from 'sonner'
import type { PropsWithChildren } from "react" 
import { useZustandAuth } from "./auth/zustand/auth.zustand"

function App() {



  const queryClient = new QueryClient

  const ChechProvider = ({children}:PropsWithChildren)=>{

    const {checkAuthStatus} = useZustandAuth()

    useQuery({
      queryKey:['auth'],
      queryFn: checkAuthStatus,
      retry: false,
      refetchInterval: 1000*60*1.5 // reutiliza la funcion cada hora y media

    })
    return children
  }
 
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster/>
      <ChechProvider>
        <RouterProvider router={router}/>
      </ChechProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    
  )
}

export default App
