
import Image from "next/image";
import getProduct from "@/helpers/getProduct";
import AddProduct from "@/components/ProductAdd/AddProduct";
import Navbar from "@/components/Navbar/Navbar";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
  const product = await getProduct(Number(slug));
  

    return (
      <>
      <Navbar/>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4 mt-20">{product.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Image
            src={product.image}
            alt={product.name}
            width={500} // Ajusta según tu diseño
            height={300} // Ajusta según tu diseño
            layout="responsive"
            className="rounded-lg"
          />
          <div>
            <p className="text-xl mb-2">{product.description}</p>
            <p className="text-2xl font-semibold mb-4">${product.price}</p>
            <p className="text-gray-700 mb-4">Stock: {product.stock}</p>
            
            {/* <button  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
          Agregar al carrito
        </button> */}
        <AddProduct product={product} />

          </div>
        </div>
      </div>
      
    </>
    );
  } catch {
    return <div className="text-red-500 text-center">Producto no encontrado</div>;
  }
}
