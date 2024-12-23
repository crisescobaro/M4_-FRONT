import { getProducts } from "./getProducts";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (id: number) {
    const products = await getProducts();
    const product = products.find((p) => p.id == id);
    if (!product) throw Error("product not found");
    return product;
}