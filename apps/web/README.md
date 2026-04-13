# MFurniture Web App

A modern Next.js web application for the MFurniture e-commerce platform.

## 🚀 Quick Start

### Installation

```bash
# From the root of the monorepo
pnpm install

# Or just install for web app
cd apps/web
pnpm install
```

### Environment Setup

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Get your Supabase Anon Key from the shared config:
   - URL: `https://ewlpwjkhuustiljvcdtn.supabase.co`
   - Project Ref: `ewlpwjkhuustiljvcdtn`
   - Ask for the NEXT_PUBLIC_SUPABASE_ANON_KEY

3. Update `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
REACT_APP_APP_URL=http://localhost:3000
```

### Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
apps/web/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Home page
│   │   ├── products/        # Products listing
│   │   ├── cart/            # Shopping cart
│   │   ├── orders/          # Order history
│   │   ├── profile/         # User profile
│   │   ├── login/           # Login page
│   │   └── register/        # Registration page
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── TextInput.tsx
│   │   │   └── Card.tsx
│   │   └── layout/          # Layout components
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── MainLayout.tsx
│   └── styles/              # Design system & styles
│       ├── colors.ts
│       ├── spacing.ts
│       ├── typography.ts
│       └── globals.css
├── .env.example             # Environment variables template
├── next.config.js           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

## 🎨 Design System

### Colors
All colors are defined in `src/styles/colors.ts` and match the mobile app:
- Primary: `#2C3E50` (Dark blue)
- Accent: `#E67E22` (Orange)
- Success: `#27AE60` (Green)
- Error: `#E74C3C` (Red)

### Spacing
Consistent spacing system (4px base unit):
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, xxl: 48px

### Typography
Professional typography with 5 weights:
- regular (400), medium (500), semiBold (600), bold (700)

## 🔗 Shared Backend

All data calls use the shared `@mffurniture/shared` package:

```typescript
import { auth, api } from "@mffurniture/shared";

// Authentication
await auth.signInWithEmail(email, password);
await auth.signUpWithEmail(email, password);
await auth.signOut();

// API Calls
const products = await api.fetchProducts();
const orders = await api.fetchUserOrders(userId);
const profile = await api.fetchUserProfile(userId);
```

## 📦 Key Components

### Button
```tsx
<Button variant="primary|secondary|outline|danger" size="sm|md|lg" fullWidth loading>
  Click me
</Button>
```

### TextInput
```tsx
<TextInput
  label="Email"
  type="email"
  error={errorMessage}
  helpText="Enter your email"
  placeholder="your@email.com"
/>
```

### Card
```tsx
<Card clickable>
  Card content here
</Card>
```

### MainLayout
Wraps pages with Header and Footer:
```tsx
<MainLayout cartCount={0} userEmail="user@email.com" onLogout={handleLogout}>
  Page content
</MainLayout>
```

## 🛠️ Development

### Create a New Page

1. Create a folder in `src/app/`
2. Add `page.tsx`:

```tsx
"use client";

import MainLayout from "@/components/layout/MainLayout";

export default function NewPage() {
  return (
    <MainLayout>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        Your page content
      </div>
    </MainLayout>
  );
}
```

### Create a New Component

1. Create file in `src/components/common/` or `src/components/layout/`
2. Use TypeScript and follow the existing patterns
3. Use CSS-in-JS with React.CSSProperties
4. Export as default

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run linting
pnpm lint
```

## 🚀 Building for Production

```bash
pnpm build
pnpm start
```

## 📚 Technologies Used

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: CSS-in-JS (inline styles)
- **State Management**: React hooks
- **Backend**: Supabase
- **Package Manager**: pnpm (workspaces)

## 🔒 Security

- All sensitive data (API keys) are stored in `.env.local`
- Supabase handles authentication securely
- OAuth integration with Google
- No credentials are committed to git

## 📱 Responsive Design

The app is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1200px)
- Mobile (< 768px)

## 🐛 Troubleshooting

### Module Not Found: `@mffurniture/shared`
```bash
# Make sure you've installed from root
cd ../..
pnpm install
```

### Port 3000 Already in Use
```bash
# Use a different port
pnpm dev -- -p 3001
```

### Supabase Connection Error
- Check that `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set in `.env.local`
- Verify the Supabase URL is correct
- Check your internet connection

## 📞 Support

For issues or questions:
1. Check the [Supabase docs](https://supabase.com/docs)
2. Check the [Next.js docs](https://nextjs.org/docs)
3. Review the mobile app implementation in `apps/mobile/` for reference

## 📄 License

This project is part of the MFurniture monorepo.
