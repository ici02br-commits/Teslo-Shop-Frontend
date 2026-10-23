import { axiosApi } from "@/api/tesloApi"
import type { Product } from "@/interfaces/product.interface"

export const getProductById = async(id: string): Promise<Product > => {
    if(!id) throw new Error("Product id is required")

    if(id === "new"){
        return {
            id: "new",
            title: "",
            name: "",
            slug: "",
            description: "",
            price: 0,
            stock: 0,
            sizes: [],
            gender: "men",
            tags: [],
            images: [],
        } as unknown as Product
    
    }

    const { data } = await axiosApi.get<Product>(`/products/${id}`)
    const images = data.images.map((image) => {
        if(image.includes("http")) return image
        return `${import.meta.env.VITE_API_URL}/files/product/${image}`
    })
    
    return {
        ...data,
        images
    }
}