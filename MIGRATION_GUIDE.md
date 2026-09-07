# Migration Guide: Vanilla JS to Next.js + TypeScript

This document outlines the migration from the original vanilla JavaScript implementation to the new Next.js with TypeScript version.

## Major Changes

### 1. **Framework Migration**
- **Before**: Static HTML files with vanilla JavaScript
- **After**: Next.js 14 with App Router

### 2. **Type Safety**
- **Before**: Plain JavaScript
- **After**: TypeScript with strict type checking

### 3. **Styling**
- **Before**: Custom CSS with CSS variables
- **After**: Tailwind CSS with custom configuration

### 4. **State Management**
- **Before**: LocalStorage with manual state handling
- **After**: Zustand with persistence middleware

### 5. **Component Architecture**
- **Before**: Global functions and DOM manipulation
- **After**: React components with hooks

## File Mapping

### Pages
| Old File | New File | Notes |
|----------|----------|-------|
| `public/index.html` | `src/app/page.tsx` | Main catalog page |
| `public/auth.html` | `src/app/auth/page.tsx` | Authentication |
| `public/checkout.html` | `src/app/checkout/page.tsx` | Checkout flow |
| `public/admin.html` | `src/app/admin/page.tsx` | Admin dashboard |
| N/A | `src/app/cart/page.tsx` | New dedicated cart page |

### JavaScript Modules
| Old File | New File | Notes |
|----------|----------|-------|
| `public/js/cart.js` | `src/store/cartStore.ts` | Zustand store |
| `public/js/catalog.js` | `src/app/page.tsx` | Integrated into page |
| `public/js/gallery.js` | `src/components/Gallery.tsx` | React component |

### Styles
| Old File | New File | Notes |
|----------|----------|-------|
| `public/css/style.css` | `src/app/globals.css` | Tailwind + custom styles |
| `public/css/admin.css` | Integrated into `globals.css` | Admin-specific styles |

## Key Improvements

### 1. Type Safety
All data structures now have TypeScript interfaces:
```typescript
interface Dress {
  id: string;
  name: string;
  price: number;
  stock: number;
  media: Media[];
}
```

### 2. Better State Management
Zustand provides:
- Centralized state
- Automatic persistence
- DevTools integration
- Better performance

### 3. Component Reusability
- `Header`: Shared navigation
- `DressCard`: Product display
- `Gallery`: Media viewer

### 4. Improved Developer Experience
- Hot reload with Fast Refresh
- TypeScript IntelliSense
- ESLint integration
- Better error messages

### 5. Performance Optimizations
- Automatic code splitting
- Image optimization (Next.js Image)
- Lazy loading
- Static generation where possible

## Breaking Changes

### 1. **Global Functions Removed**
Old approach:
```javascript
window.signOut = async () => { ... }
```

New approach:
```typescript
const handleSignOut = async () => { ... }
```

### 2. **Direct DOM Manipulation Removed**
Old approach:
```javascript
document.getElementById('cartBadge').textContent = count;
```

New approach:
```typescript
const itemCount = useCartStore(state => state.getItemCount());
```

### 3. **CSS Classes**
Old approach:
```html
<button class="btn btn-primary">Click</button>
```

New approach (Tailwind):
```tsx
<button className="btn btn-primary">Click</button>
```

## Migration Steps for Developers

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.local.example .env.local
# Edit .env.local with your Firebase config
```

### 3. Update Firebase Project
```bash
# Update .firebaserc with your project ID
# Deploy new hosting config
firebase deploy --only hosting
```

### 4. Deploy Functions (Unchanged)
```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

## Backward Compatibility

The following remain **unchanged** and compatible:
- ✅ Firebase Functions (`functions/index.js`)
- ✅ Firestore security rules (`firestore.rules`)
- ✅ Storage rules (`storage.rules`)
- ✅ Firestore indexes (`firestore.indexes.json`)
- ✅ Database structure
- ✅ Authentication flow

## Testing Checklist

- [ ] User can browse dresses
- [ ] User can add items to cart
- [ ] Cart persists across page reloads
- [ ] User can sign in/sign up
- [ ] Admin can access dashboard
- [ ] Admin can add/edit/delete products
- [ ] Checkout process works
- [ ] WhatsApp integration works
- [ ] Real-time updates work
- [ ] Stock management functions correctly

## Rollback Plan

If issues arise, you can rollback by:
1. Keep the `public/` folder backup
2. Revert `firebase.json` hosting config to:
```json
{
  "hosting": {
    "public": "public"
  }
}
```
3. Redeploy: `firebase deploy --only hosting`

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)
- [Firebase with Next.js](https://firebase.google.com/docs/web/setup)

