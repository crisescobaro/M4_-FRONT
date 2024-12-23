/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client"

import { useCart } from "../../contexts/ContextCart"
import { IProduct } from "../../interfaces/IProduct"
import { useEffect, useState } from "react"

export default function AddProduct({ product }: {product: IProduct}) {
    const { addItemToCart, items , countItems } = useCart();
    const [disabled, setDisabled] = useState(false);

    const clickHandler = () => {
        addItemToCart(product);
    };

    useEffect(() => {
        // countItems(product.id ) >= product.stock && setDisabled(true);
        countItems(product.id ) >= 1 && setDisabled(true);
    }, [items]);

    return ( 
    <button
    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded" 
     onClick={clickHandler}
     disabled={disabled}
     >
        Add Product To Cart
        </button>
    );
}