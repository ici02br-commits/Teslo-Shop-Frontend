import { CustomPagination } from "@/components/custom/CustomPagination"
import { Button } from "@/components/ui/button"
import {  TableCaption,  TableHeader,  TableRow,  TableHead,  TableBody,  TableCell,  TableFooter, Table } from "@/components/ui/table"
import { products } from "@/dataTemporal/products.temp"
import useProducts from "@/shop/hooks/useProducts"
import { PencilIcon, PlusIcon } from "lucide-react"
import { Link, Links } from "react-router"



const AdminProductsPage = () => {

  const {data} = useProducts()

  return (
    <>

      <div className="flex justify-between ">
        <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Productos
            </h1>
            
      </div>
      
      <Link to={`/admin/products/new`}>
        <Button>
          <PlusIcon/>
            Nuevo Producto
        </Button>
      </Link>
      </div>

       <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead className="">Ctegoria</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Tallas</TableHead>
  
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.products.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className=""><img src={invoice.images[0]} alt={invoice.title} className="w-20 h-20 object-cover rounded-md"></img></TableCell>
              <TableCell>{invoice.title}</TableCell>
              <TableCell>${invoice.price}</TableCell>
              <TableCell className="">{invoice.gender}</TableCell>
              <TableCell>{invoice.stock}</TableCell>
              <TableCell>{invoice.sizes.join(`, `)}</TableCell>

              <TableCell>
                <Link to={`/admin/products/${invoice.id}`}><PencilIcon className="ml-4 p-0.5 text-blue-500 hover:text-blue-900"/></Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
          <br></br><br></br>
      <CustomPagination totalPages={data?.pages||0}/>
    </>
  )
}

export default AdminProductsPage
