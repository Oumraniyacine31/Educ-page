"use client";

import { useState } from "react";
import { CartItem, OrderData } from "@/types";

interface CheckoutFormProps {
  cart: CartItem[];
  totalPrice: number;
  onClose: () => void;
  onOrderComplete: () => void;
}

export default function CheckoutForm({
  cart,
  totalPrice,
  onClose,
  onOrderComplete,
}: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Validate form
    if (!formData.customerName || !formData.email || !formData.phone || !formData.address) {
      setError("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    // Create order data
    const orderData: OrderData = {
      orderId: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      items: cart,
      total: totalPrice,
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit order");
      }

      setSuccess(true);
      setTimeout(() => {
        onOrderComplete();
      }, 2000);
    } catch (err) {
      setError("Failed to submit order. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        {/* Modal */}
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b sticky top-0 bg-white">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
              >
                ×
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {success ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">
                  Order Placed Successfully!
                </h3>
                <p className="text-gray-600">
                  Thank you for your purchase. We&apos;ll send you a confirmation email shortly.
                </p>
              </div>
            ) : (
              <>
                {/* Order Summary */}
                <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div
                        key={`${item.id}-${item.selectedSize}`}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-600">
                          {item.name} ({item.selectedSize}) x {item.quantity}
                        </span>
                        <span className="font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                      <span>Total:</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Shipping Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      required
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                  >
                    {isSubmitting ? "Processing..." : "Place Order"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
