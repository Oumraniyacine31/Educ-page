"use client";

import { useState } from "react";
import { Product, CartItem } from "@/types";
import ProductCard from "@/components/ProductCard";
import Cart from "@/components/Cart";
import CheckoutForm from "@/components/CheckoutForm";

const products: Product[] = [
  {
    id: "1",
    name: "Classic White Tee",
    price: 29.99,
    description: "Premium cotton white t-shirt, perfect for everyday wear",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "2",
    name: "Black Essential",
    price: 29.99,
    description: "Timeless black tee made from soft, breathable fabric",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "3",
    name: "Navy Blue Crew",
    price: 32.99,
    description: "Classic navy blue crew neck with a modern fit",
    image: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=400&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "4",
    name: "Heather Gray",
    price: 27.99,
    description: "Comfortable heather gray tee for casual style",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "5",
    name: "Olive Green",
    price: 34.99,
    description: "Trendy olive green t-shirt with premium quality",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "6",
    name: "Burgundy Red",
    price: 32.99,
    description: "Rich burgundy color with excellent durability",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
];

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const addToCart = (product: Product, size: string) => {
    const existingItem = cart.find(
      (item) => item.id === product.id && item.selectedSize === size
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1, selectedSize: size }]);
    }
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity === 0) {
      setCart(cart.filter((item) => !(item.id === id && item.selectedSize === size)));
    } else {
      setCart(
        cart.map((item) =>
          item.id === id && item.selectedSize === size
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const removeFromCart = (id: string, size: string) => {
    setCart(cart.filter((item) => !(item.id === id && item.selectedSize === size)));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    setCart([]);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">T-Shirt Store</h1>
              <p className="text-sm text-gray-600">Premium Quality Tees</p>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium t-shirt collection. Made with high-quality materials
            for ultimate comfort and style.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">
            © 2025 T-Shirt Store. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <Cart
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        totalPrice={getTotalPrice()}
        onCheckout={handleCheckout}
      />

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutForm
          cart={cart}
          totalPrice={getTotalPrice()}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderComplete={handleOrderComplete}
        />
      )}
    </div>
  );
}
