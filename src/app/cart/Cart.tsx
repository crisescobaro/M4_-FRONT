
// "use client";

// import { useCart } from "../../contexts/ContextCart";

// export default function Cart() {
//     const { items } = useCart();
//     return (
//         <div>
//             <h1>Cart</h1>
//             <div>
//                 {items?.length ? (
//                     <div>
//                         {items.map((e) => {
//                             return (
//                                 <div>
//                                     <h3>{e.name}</h3>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 ) : (
//                     <h2>No Hay Productos</h2>
//                 )}
//             </div>
//         </div>
//     );
// }



// "use client";

// import Navbar from "@/components/Navbar/Navbar";
// import { useCart } from "../../contexts/ContextCart";
// import { ShoppingCart, ShoppingBag } from 'lucide-react';

// export default function Cart() {
//     const { items } = useCart();

//     return (
// <>
// <Navbar/>
//         <div className=" rounded-lg p-6 max-w-md mx-auto">
//             <div className="flex items-center justify-between mb-6 mt-20">
//                 <h1 className="text-2xl font-bold text-gray-800 flex items-center">
//                     <ShoppingCart className="mr-2" />
//                     Carrito de Compras
//                 </h1>
//                 <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
//                     {items?.length || 0} items
//                 </span>
//             </div>
//             <div>
//                 {items?.length ? (
//                     <div className="space-y-4">
//                         {items.map((e, index) => (
//                             <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm transition duration-300 ease-in-out hover:shadow-md">
//                                 <div className="flex items-center space-x-4">
//                                     <div className="bg-blue-100 p-2 rounded-full">
//                                         <ShoppingBag className="text-blue-500" />
//                                     </div>
//                                     <h3 className="font-medium text-gray-800">{e.name}</h3>
//                                 </div>
//                                 <button className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out">
//                                     Eliminar
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="text-center py-8">
//                         <ShoppingCart className="mx-auto text-gray-400 mb-4" size={48} />
//                         <h2 className="text-xl font-medium text-gray-500">Tu carrito está vacío</h2>
//                         <p className="text-gray-400 mt-2">Agrega algunos productos para comenzar</p>
//                     </div>
//                 )}
//             </div>
//             {items?.length > 0 && (
//                 <button className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
//                     Proceder al pago
//                 </button>
//             )}
//         </div>
//                         </>
//     );
// }



"use client";

import Navbar from "@/components/Navbar/Navbar";
import { useCart } from "../../contexts/ContextCart";
import { ShoppingCart, ShoppingBag } from "lucide-react";
import Swal from "sweetalert2";
import axios from "axios";
import { useAuth } from "@/contexts/ContextAuht";
import { useRouter } from "next/navigation";


export default function Cart() {
    const { items, removeItemFromCart, emptyCart } = useCart();
    const { token, user } = useAuth();
    const router = useRouter();

    const emptyCarthandler = () => {
        emptyCart();
    };

    const checkoutHandler = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "you wont be able to revert",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "yes, delete",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                .post(
                    `${process.env.NEXT_PUBLIC_API_URL_ORDERS}/orders/`,
                {
                    userId: user?.id,
                    products: items.map((e) => e.id),
                },
                {
                    headers: {
                        authorization: token,
                    },
                }
            )
            .then((res) => {
                console.log(res);
                Swal.fire({
                    title: "deleted",
                    text: "your file deleted",
                    icon: "success",
                });
                emptyCart();
                router.push("/dashboard");
            })
            .catch((error) => {
                console.log(error);
                
            });
            }
        });
    };

    return (
        <>
            <Navbar />
            <div className="rounded-lg p-6 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-6 mt-20">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                        <ShoppingCart className="mr-2" />
                        Carrito de Compras
                    </h1>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                        {items?.length || 0} items
                    </span>
                </div>
                <div>
                    {items?.length ? (
                        <div className="space-y-4">
                            {items.map((e, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm transition duration-300 ease-in-out hover:shadow-md"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-blue-100 p-2 rounded-full">
                                            <ShoppingBag className="text-blue-500" />
                                        </div>
                                        <h3 className="font-medium text-gray-800">{e.name}</h3>
                                    </div>
                                    <button
                                        className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out"
                                        onClick={() => removeItemFromCart(e.id)} // Llama a la función con el ID del producto
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <ShoppingCart
                                className="mx-auto text-gray-400 mb-4"
                                size={48}
                            />
                            <h2 className="text-xl font-medium text-gray-500">
                                Tu carrito está vacío
                            </h2>
                            <p className="text-gray-400 mt-2">
                                Agrega algunos productos para comenzar
                            </p>
                        </div>
                    )}
                </div>
                {items?.length > 0 && (
                        <>
                    <button className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                    onClick={checkoutHandler}
                    >
                        Proceder al pago
                    </button>
                    <button 
                    className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                    onClick={emptyCarthandler}
                    >
                        
                        Limpiar Carrito
                    </button>
                    </>
                )}
            </div>
            
        </>
    );
}
