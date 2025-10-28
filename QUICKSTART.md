# Quick Start Guide

## Your T-Shirt E-Commerce Store is Ready! 🎉

The application has been successfully built and is ready to use.

## What's Included

✅ **Complete E-Commerce Website**
- Product catalog with 6 premium t-shirts
- Shopping cart with add/remove/quantity management
- Checkout form with customer information
- Responsive design (mobile, tablet, desktop)
- Modern UI with Tailwind CSS

✅ **Google Sheets Integration**
- API endpoint ready to save orders
- Detailed setup guide included
- Works without configuration (orders logged to console)

✅ **Production Ready**
- TypeScript for type safety
- Next.js 14 for performance
- Optimized build completed successfully
- Ready to deploy to Vercel

## How to Run Locally

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   - Navigate to http://localhost:3000
   - You should see the T-Shirt Store homepage

3. **Test the features:**
   - Browse the 6 t-shirt products
   - Click on different sizes
   - Add items to cart
   - View cart (click "Cart" button in header)
   - Adjust quantities in cart
   - Click "Proceed to Checkout"
   - Fill out the checkout form
   - Submit an order

## Setting Up Google Sheets (Optional)

To save orders to Google Sheets:

1. Follow the detailed guide in `GOOGLE_SHEETS_SETUP.md`
2. Create a Google Cloud project
3. Enable Google Sheets API
4. Create service account credentials
5. Create a Google Sheet with the proper headers
6. Add credentials to `.env.local`

**Note:** The app works perfectly without Google Sheets configured. Orders will be logged to the console instead.

## Deploy to Vercel

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit: T-Shirt e-commerce store"
   git push
   ```

2. **Deploy on Vercel:**
   - Go to https://vercel.com
   - Import your repository
   - Add environment variables (if using Google Sheets)
   - Deploy!

## Project Structure

```
/vercel/sandbox/
├── app/
│   ├── api/orders/route.ts      # Order submission API
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main store page
├── components/
│   ├── Cart.tsx                 # Shopping cart
│   ├── CheckoutForm.tsx         # Checkout modal
│   └── ProductCard.tsx          # Product cards
├── types/index.ts               # TypeScript types
├── README.md                    # Full documentation
├── GOOGLE_SHEETS_SETUP.md       # Google Sheets guide
└── QUICKSTART.md                # This file
```

## Customization

### Add More Products

Edit `app/page.tsx` and add to the `products` array:

```typescript
{
  id: "7",
  name: "Your New T-Shirt",
  price: 29.99,
  description: "Description here",
  image: "https://your-image-url.com/image.jpg",
  sizes: ["S", "M", "L", "XL", "XXL"],
}
```

### Change Colors

The site uses a clean black and white theme. To customize:
- Edit `tailwind.config.ts` for theme colors
- Modify component classes in the component files
- Update `app/globals.css` for global styles

### Modify Checkout Fields

Edit `components/CheckoutForm.tsx` to add or remove form fields.

## Features Demonstrated

1. **State Management**: React hooks (useState) for cart and UI state
2. **Component Architecture**: Reusable, modular components
3. **API Routes**: Next.js API routes for backend functionality
4. **External API Integration**: Google Sheets API
5. **Form Handling**: Validation and submission
6. **Responsive Design**: Mobile-first approach
7. **Image Optimization**: Next.js Image component
8. **TypeScript**: Full type safety

## Troubleshooting

### Build Issues
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (18+ required)

### Images Not Loading
- Check internet connection (images are from Unsplash)
- Verify `next.config.mjs` has proper image configuration

### Orders Not Saving
- Check console for error messages
- Verify Google Sheets setup if configured
- Ensure `.env.local` has correct credentials

## Next Steps

1. **Test the application** - Run `npm run dev` and test all features
2. **Customize products** - Add your own t-shirt designs and images
3. **Set up Google Sheets** - Follow the setup guide to save orders
4. **Deploy** - Push to Vercel for production deployment
5. **Add payment** - Integrate Stripe or PayPal for real payments

## Support

- Check `README.md` for full documentation
- Review `GOOGLE_SHEETS_SETUP.md` for integration help
- All code is commented for clarity

---

**Built with Next.js 14, TypeScript, and Tailwind CSS**

Enjoy your new e-commerce store! 🚀
