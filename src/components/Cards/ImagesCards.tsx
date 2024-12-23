import React from "react";
import Image from "next/image"; // Importa el componente Image

interface ProductProps {
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
}

const ProductCard: React.FC<ProductProps> = ({
  name,
  price,
  description,
  image,
  stock,
}) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
      {/* Usamos el componente Image de next/image */}
      <Image
        src={image}
        alt={name}
        width={400} 
        height={300}
        className="w-full h-88 object-cover"
      />
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold text-green-600">${price}</span>
          <span
            className={`text-sm ${
              stock > 0 ? "text-blue-500" : "text-red-500"
            }`}
          >
            {stock > 0 ? `Stock: ${stock}` : "Sin Stock"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
