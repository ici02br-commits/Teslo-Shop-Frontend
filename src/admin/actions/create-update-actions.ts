import { axiosApi } from "@/api/tesloApi";
import type { Product } from "@/interfaces/product.interface";

export const createUpdateProductAction = async (
    productLike: Partial<Product> & {files?: File[]}
):Promise<Product> =>{
    const { id, user, images = [], files = [] , ...rest } = productLike
    const isCreating = id === 'new'

    rest.stock = Number( rest.stock || 0)
    rest.price = Number( rest.price || 0)

    const uploadFiles = async(files: File[])=>{
        const uploadPromise = files.map( async file =>{
            const formData = new FormData()
            formData.append('file', file)
            
            const { data } = await axiosApi({
                url: '/files/product',
                method: 'POST',
                data: formData
            })

            return data.fileName            
        })

        const upladedFileName =  await Promise.all(uploadPromise)
        return upladedFileName
    }

    if(files.length > 0){
       const imagesName =  await uploadFiles(files)
       images.push( ...imagesName    )
    } 
        //rest.images = [...images, ...uploadedFiles.map((file) => file.id)]
   // }

    const imagesToSave = images.map(image=>{                              //  las imagenes pueden venir como una url, en caso de no cargar correctamente esta segmento de codigo lo puede arreglar
     if(image.includes('http')) return image.split('/').pop() || ''
     return image
    })

    const { data } = await axiosApi<Product>({
        url: isCreating ? '/products' : `/products/${id}`,
        method: isCreating ? 'POST' : 'PATCH',
        data: {
            ...rest,
            images: imagesToSave // cambiar images por imagesToSave
        }
        
    })

    return {
        ...data,
        images: data.images.map((image) => {
            if(image.includes("http")) return image
            return `${import.meta.env.VITE_API_URL}/files/product/${image}`
        })      
    }
}