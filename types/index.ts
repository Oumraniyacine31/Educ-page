export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  sizes: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export interface OrderData {
  orderId: string;
  date: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
}
