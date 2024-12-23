"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/Cards/ImagesCards";
import axios from "axios";
import { Product } from "../../interfaces/Imgcard";


const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL_PRODUCTS}/products`)
        setProducts(response.data);
      } catch (err) {
        setError("Error al cargar los productos.");
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 mt-20">Nuestros Productos</h1>

      {error && <div className="text-center text-red-500">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} passHref>
            <ProductCard
              name={product.name}
              price={product.price}
              description={product.description}
              image={product.image}
              stock={product.stock}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
