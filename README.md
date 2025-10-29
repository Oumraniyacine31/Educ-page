# T-Shirt E-Commerce Store

A modern, responsive e-commerce website for selling t-shirts with Google Sheets integration for order management.

## Features

- 🛍️ **Product Catalog**: Browse a collection of premium t-shirts
- 🛒 **Shopping Cart**: Add items, adjust quantities, and manage your cart
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 💳 **Checkout System**: Simple and intuitive checkout process
- 📊 **Google Sheets Integration**: Automatically save orders to Google Sheets
- ⚡ **Built with Next.js**: Fast, modern, and SEO-friendly

## Tech Stack

- **Framework**: Next.js 14 (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API Integration**: Google Sheets API
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd sandbox
```

2. Install dependencies:
```bash
npm install
```

3. Set up Google Sheets integration (optional):
   - Follow the detailed guide in [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)
   - Copy `.env.example` to `.env.local` and add your credentials

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
/vercel/sandbox/
├── app/
│   ├── api/
│   │   └── orders/
│   │       └── route.ts          # API endpoint for order submission
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main product catalog page
├── components/
│   ├── Cart.tsx                  # Shopping cart sidebar
│   ├── CheckoutForm.tsx          # Checkout form modal
│   └── ProductCard.tsx           # Product display card
├── types/
│   └── index.ts                  # TypeScript type definitions
├── public/                       # Static assets
├── GOOGLE_SHEETS_SETUP.md        # Setup guide for Google Sheets
└── README.md                     # This file
```

## Google Sheets Integration

Orders are automatically saved to Google Sheets with the following information:
- Order ID
- Date & Time
- Customer Name
- Email
- Phone Number
- Shipping Address
- Items Ordered (with sizes and quantities)
- Total Amount

See [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) for detailed setup instructions.

## Customization

### Adding Products

Edit the `products` array in `app/page.tsx`:

```typescript
const products: Product[] = [
  {
    id: "1",
    name: "Your Product Name",
    price: 29.99,
    description: "Product description",
    image: "https://your-image-url.com/image.jpg",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  // Add more products...
];
```

### Styling

The project uses Tailwind CSS. Modify styles in:
- `tailwind.config.ts` - Tailwind configuration
- `app/globals.css` - Global CSS variables
- Component files - Component-specific styles

### Colors

Update the color scheme in `tailwind.config.ts` or use Tailwind's utility classes directly in components.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings:
   - `GOOGLE_SHEETS_CREDENTIALS`
   - `GOOGLE_SHEETS_SPREADSHEET_ID`
4. Deploy!

The application is optimized for Vercel deployment with automatic builds and deployments.

## Environment Variables

Create a `.env.local` file with:

```env
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account",...}
GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id
```

See `.env.example` for the template.

## License

MIT License - feel free to use this project for your own e-commerce needs!

## Support

For issues or questions:
1. Check [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) for integration help
2. Review the code comments in component files
3. Open an issue on GitHub

---

Built with ❤️ using Next.js and Tailwind CSS
