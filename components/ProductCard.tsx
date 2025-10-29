"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]); // Default to "L"
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(product, selectedSize);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-80 bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
        </div>
        
        {/* Size Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Size
          </label>
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  selectedSize === size
                    ? "border-gray-900 bg-gray-900 text-white"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-3 rounded-lg font-semibold transition-all ${
            isAdding
              ? "bg-green-500 text-white"
              : "bg-gray-900 text-white hover:bg-gray-800"
          }`}
        >
          {isAdding ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
