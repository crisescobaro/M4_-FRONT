/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
// "use client"

// import Navbar from '@/components/Navbar/Navbar';
// // import Navbar from '@/components/Navbar/Navbar';
// import { useAuth } from '@/contexts/ContextAuht';
// import { usePrivate } from '@/hooks/PrivateUse';
// import React from 'react';


// const Demo: React.FC = () => {
//     usePrivate();
//     const { user } = useAuth();
    
// return(
//     <>
//         <Navbar/>
//     <div >
//         <div>

//         <div className='bg-green-500 w-4/5 mx-auto'>
//         <div className='bg-red-500'>
//             <p>Name: {user?.name}</p>
//             <p>Email {user?.email}</p>
//             <p>Addres {user?.address} </p>
//             <p>Phone {user?.phone} </p>
//         </div>
//         </div>
//         <div className='bg-yellow-500 w-4/5 mx-auto'>
//             {user?.orders.length ? (
//                 <div>Tengo pedidos</div>
//             ) : (
//                 <div>You dont have any order yet</div>
//             )}
//         </div>
//         </div>
//     </div>
//     </>
// );
// }

// export default Demo;

"use client"

import Navbar from '@/components/Navbar/Navbar';
import { useAuth } from '@/contexts/ContextAuht';
import { usePrivate } from '@/hooks/PrivateUse';
import { useEffect, useState } from 'react';
import { ShoppingBag, User, Mail, MapPin, Phone } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Demo: React.FC = () => {
    usePrivate();
    const { user, token } = useAuth();
    const [userOrders, setUserOrders] = useState([]);
    console.log(userOrders);
    console.log(setUserOrders);
    
    

    useEffect(() => {
        if (!token) return;

        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL_USER_ORDERS}/users/orders`, {
                headers: { authorization: token },
            })
            .then((res) => {
                setUserOrders(res.data);
            })
            .catch(() => {
                Swal.fire("Error al obtener las órdenes del usuario");
            });
    }, [token]);

    return (
        <div className="text-gray-600 text-sm mb-4 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar />
            <main className="text-gray-600 text-sm mb-4 container mx-auto px-4 py-12">
                <div className="text-gray-600 text-sm mb-4 bg-white shadow-2xl rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-3xl mt-20">
                    <div className="text-gray-600 text-sm mb-4 p-8 relative overflow-hidden">
                        <div className="text-gray-600 text-sm mb-4 absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 opacity-50"></div>
                        <div className="text-gray-600 text-sm mb-4 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                            {[
                                { label: "Name", value: user?.name, icon: User },
                                { label: "Email", value: user?.email, icon: Mail },
                                { label: "Address", value: user?.address, icon: MapPin },
                                { label: "Phone", value: user?.phone, icon: Phone }
                            ].map((item, index) => (
                                <div key={index} className="text-gray-600 text-sm mb-4 bg-white p-6 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:bg-purple-50 group">
                                    <div className="text-gray-600 text-sm mb-4 flex items-center mb-3">
                                        <item.icon className="text-gray-600 text-sm mb-4 w-5 h-5 text-purple-500 mr-2" />
                                        <p className="text-gray-600 text-sm mb-4 font-medium text-purple-600 group-hover:text-purple-700 transition-colors duration-300">{item.label}</p>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4 text-lg text-gray-700 group-hover:text-gray-800 transition-colors duration-300">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-8 bg-gradient-to-r from-purple-100 to-pink-100">
                        <h3 className="text-2xl font-serif font-bold mb-6 text-gray-800 border-b-2 border-purple-200 pb-2 inline-block">Orders</h3>
                        {userOrders?.length ? (
                            <div className="bg-white bg-opacity-70 p-6 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:bg-opacity-90">
                                <div className="flex items-center">
                                    <ShoppingBag className="w-6 h-6 text-purple-500 mr-3" />
                                    <p className="font-medium text-gray-700 hover:text-gray-800 transition-colors duration-300">You have active orders</p>
                                </div>
                                {userOrders.map((order) => (
                                    <div>
                                       <p>  {order.id} </p>
                                       <p>  {order.status} </p>
                                       <p>  {order.date} </p>
                                       {/* <p>  {order.products.name} </p> */}
                                       
                                    
                                        {/* {id, status, date, products} */}
                                        
                                        
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white bg-opacity-70 p-6 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:bg-opacity-90">
                                <div className="flex items-center">
                                    <ShoppingBag className="w-6 h-6 text-pink-500 mr-3" />
                                    <p className="font-medium text-gray-700 hover:text-gray-800 transition-colors duration-300">You don't have any orders yet</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Demo;



