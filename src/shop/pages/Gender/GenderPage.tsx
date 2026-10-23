
import { CustomPagination } from "@/components/custom/CustomPagination"
import CustomJumbotron from "@/shop/components/CustomJumbotron"
import ProductsGrid from "@/shop/components/ProductsGrid"
import useProducts from "@/shop/hooks/useProducts"
import { useParams } from "react-router"

const GenderPage = () => {

  const {data} = useProducts()
  const {gender} = useParams()
  const smg = (gender == 'men') ? 'hombres': (gender == 'women') ? 'mujeres' : 'niños' 

  const filterProducts = data?.products.filter((producto)=>(
    producto.gender == gender
  ))
 
  
  return (
    <>
        <CustomJumbotron title={`Productos para ${smg}`} subtitle="Ropa minimalista y elegante inspirada en el diseño futurista de Tesla. 
            Calidad premium para un estilo atemporal."/>
        <ProductsGrid products={filterProducts || []}/>
        <CustomPagination totalPages={data?.pages ||1}/>
    </>
  )
}

export default GenderPage