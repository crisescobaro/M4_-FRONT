// import Image from "next/image";
// import getProduct from "@/helpers/getProduct";
// import AddProduct from "@/components/ProductAdd/AddProduct";
// import Navbar from "@/components/Navbar/Navbar";

// export default async function ProductPage({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   try {
//     // Convierte el slug en un número
//     const product = await getProduct(Number(params.slug));

//     return (
//       <>
//         <Navbar />
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-4xl font-bold mb-4 mt-20">{product.name}</h1>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <Image
//               src={product.image}
//               alt={product.name}
//               width={500} // Ajusta según tu diseño
//               height={300} // Ajusta según tu diseño
//               layout="responsive"
//               className="rounded-lg"
//             />
//             <div>
//               <p className="text-xl mb-2">{product.description}</p>
//               <p className="text-2xl font-semibold mb-4">${product.price}</p>
//               <p className="text-gray-700 mb-4">Stock: {product.stock}</p>
//               <AddProduct product={product} />
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return <div className="text-red-500 text-center">Producto no encontrado</div>;
//   }
// }





// import Image from "next/image";
// import getProduct from "@/helpers/getProduct";
// import AddProduct from "@/components/ProductAdd/AddProduct";
// import Navbar from "@/components/Navbar/Navbar";  

// export default async function ProductPage({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   try {
//     // Convierte el slug a un número y obtiene los datos del producto
//     const product = await getProduct(Number(params.slug));

//     return (
//       <>
//         <Navbar />
//         <div className="container mx-auto px-4 py-8">
//           <h1 className="text-4xl font-bold mb-4 mt-20">{product.name}</h1>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <Image
//               src={product.image}
//               alt={product.name}
//               width={500} // Ajusta según el diseño
//               height={300} // Ajusta según el diseño
//               layout="responsive"
//               className="rounded-lg"
//             />
//             <div>
//               <p className="text-xl mb-2">{product.description}</p>
//               <p className="text-2xl font-semibold mb-4">${product.price}</p>
//               <p className="text-gray-700 mb-4">Stock: {product.stock}</p>
//               <AddProduct product={product} />
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return (
//       <div className="text-red-500 text-center">
//         Producto no encontrado
//       </div>
//     );
//   }
// }


import Image from "next/image";
import getProduct from "@/helpers/getProduct";
import AddProduct from "@/components/ProductAdd/AddProduct";
import Navbar from "@/components/Navbar/Navbar";

type Params = {
  slug: string;
};

export default async function ProductPage({ params }: { params: Params }) {
  try {
    // Convertir el slug a un número y obtener los datos del producto
    const product = await getProduct(Number(params.slug));

    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-4 mt-20">{product.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={300}
              className="rounded-lg"
            />
            <div>
              <p className="text-xl mb-2">{product.description}</p>
              <p className="text-2xl font-semibold mb-4">${product.price}</p>
              <p className="text-gray-700 mb-4">Stock: {product.stock}</p>
              <AddProduct product={product} />
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return (
      <div className="text-red-500 text-center">
        Producto no encontrado
      </div>
    );
  }
}
