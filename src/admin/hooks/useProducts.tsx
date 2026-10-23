import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProductById } from "../actions/get-product-by-id"
import type { Product } from "@/interfaces/product.interface"
import { createUpdateProductAction } from "../actions/create-update-actions"

export const useProducts = (id:string ) => {

    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey: ['products',{id}],
        queryFn: ()=>getProductById(id),
        retry: false,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
        enabled: !!id
    })

    //mutacion

    const mutation = useMutation({
        mutationFn: createUpdateProductAction,
        onSuccess: (product:Product)=>{
            
            //Invalidar Cahe
            queryClient.invalidateQueries({queryKey:['products']})
            queryClient.invalidateQueries({queryKey:['product',{id: product.id}]})

            // Actualizar queryData
            queryClient.setQueryData(['products',{id: product.id}],product)
        }
    })

    //const handleSubmitForm = async (productLike: Partial<Product>)=>{
    //    console.log(productLike);
    // } 

    return {
        ...query,
        mutation
    }  
}