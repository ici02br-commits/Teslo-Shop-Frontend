import { CustomPagination } from "@/components/custom/CustomPagination"

import CustomJumbotron from "@/shop/components/CustomJumbotron"
import ProductsGrid from "@/shop/components/ProductsGrid"
import useProducts from "@/shop/hooks/useProducts"

const Home = () => {

  const {data} = useProducts()  

  return (
    <>
        <CustomJumbotron title="ArmonyShop" subtitle="Ropa minimalista y elegante inspirada en el diseño futurista de Tesla. 
            Calidad premium para un estilo atemporal."/>
        <ProductsGrid products={data?.products || []}/>
        <CustomPagination totalPages={data?.pages || 1}/>
    </>
  )
}

export default Home
