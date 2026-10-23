
import { Navigate, useNavigate, useParams } from 'react-router';

import { useProducts } from '@/admin/hooks/useProducts';
import { ProductForm } from './ui/ProductForm';
import type { Product } from '@/interfaces/product.interface';
import { toast } from 'sonner';



const AdminProductPage = () => {
  const { id } = useParams();
  const { isLoading, isError, data: product, mutation } = useProducts(id || '')
  const navigate = useNavigate()

  const productTitle = id === 'nuevo' ? 'Nuevo producto' : 'Editar producto';
  const productSubtitle =
    id === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.';

  if(isError){
    return <Navigate to="/admin/products"/>
  }

  if(isLoading){
    return <div>Cargando...</div>
  }

  if(!product){
    return <Navigate to="/admin/products"/>
  }

  const handleSubmit = async (productLike: Partial<Product> & {files?: File[]})=>{
    console.log(productLike);
    
    await mutation.mutateAsync(productLike, {
      
      onSuccess: ( data )=>{
        toast.success('Producto actualizado correctamente', {
          position: 'top-right',
        });
        navigate(`/admin/products/${data.id}`);
      },
      onError: ()=>{
        toast.error('Error al actualizar el producto', {
          position: 'top-right',
        });
      }
    })
  }

  return (
    <ProductForm
      title={productTitle}
      subTitle={productSubtitle}
      product={product}
      onSubmit = {handleSubmit}
      isPosting = {mutation.isPending}
    ></ProductForm>
  )

 
};

export default AdminProductPage