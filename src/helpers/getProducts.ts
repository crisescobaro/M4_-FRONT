// import axios from "axios";
// import {IProduct} from "../interfaces/IProduct"

// export const getProducts = async (): Promise<IProduct[]> => {
//     const fetch = await axios.get(process.env.NEXT_PUBLIC_API_URL_PRODUCTS as string);
//     return fetch.data
// };


import { IProduct } from "../interfaces/IProduct";
import axios from "axios";

export const getProducts = async (): Promise<IProduct[]> => {
  const fetch = await axios.get(`${process.env.API_URL}/products`);
  return fetch.data;
};