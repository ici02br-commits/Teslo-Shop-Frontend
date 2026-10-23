import { axiosApi } from "@/api/tesloApi"

import type { ProductResponse } from "@/interfaces/productsResponse"

interface Options{
    limit?:number |string|undefined,
    offset?:number |string|undefined,
    gender?:string,
    sizes?:string,
    minPrice?:number
    maxPrice?:number,
    query?:string,
}

export const getProducts = async (options:Options)=>{

    const {limit, offset, gender,sizes,minPrice,maxPrice,query} = options
   
    try {
        const {data} = await axiosApi.get<ProductResponse>('products',{
            params:{
                limit,
                offset,
                gender,
                sizes,
                minPrice,
                maxPrice,
                q:query
            }
        })
        console.log('1. El hook useProducts se está ejecutando')
    
    
        const productoConImagen = data.products.map(product=>({
                ...product,
                images: product.images.map(image=>`${import.meta.env.VITE_API_URL}/files/product/${image}`)
        }))

    
        return { 
        ...data,
        products:productoConImagen
    }
    

    } catch (error) {
        console.log(error);
        
    }

    
}
