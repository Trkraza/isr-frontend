# ChainHub Frontend - ISR Learning Project

A modern Web3 app directory built with Next.js 15 to showcase all ISR (Incremental Static Regeneration) features.

## 🎯 ISR Features Demonstrated

This project covers **ALL** Next.js ISR patterns:

### 1. **Time-Based Revalidation** (`/apps`)
- Set `revalidate = 60` on pages
- Automatic background regeneration
- Stale-while-revalidate behavior

### 2. **On-Demand Revalidation - Path** (`/api/revalidate-path`)
- `revalidatePath('/apps')` - Invalidate specific URLs
- Triggered via secure API endpoint
- Instant cache updates

### 3. **On-Demand Revalidation - Tag** (`/api/revalidate-tag`)
- `revalidateTag('featured-apps')` - Granular control
- Only affects tagged fetch requests
- More efficient than path revalidation

### 4. **generateStaticParams** (`/apps/[slug]`)
- Pre-render all known pages at build time
- Reduces server load
- Instant page loads

### 5. **dynamicParams** (`/apps/[slug]`)
- `dynamicParams = true` - Generate new pages on-demand
- `dynamicParams = false` - Return 404 for unknown pages

### 6. **Multiple Revalidate Times** (`/`)
- Different fetch calls with different times
- Lowest time wins for page revalidation
- Shows priority handling

### 7. **Fetch with Tags** (All pages)
- Tag individual fetch requests
- Enable granular cache control
- Multiple tags per request

## 📁 Project Structure

```
frontend/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage (multi-revalidate demo)
│   ├── apps/
│   │   ├── page.tsx           # All apps (time-based ISR)
│   │   └── [slug]/page.tsx    # App detail (generateStaticParams)
│   ├── featured/page.tsx       # Featured apps (revalidateTag)
│   ├── stats/page.tsx          # Stats (long revalidation)
│   └── api/
│       ├── revalidate-path/    # Path revalidation endpoint
│       └── revalidate-tag/     # Tag revalidation endpoint
├── components/
│   ├── ISRStatus.tsx          # Educational ISR indicator
│   ├── CacheIndicator.tsx     # Cache status badge
│   ├── AppCard.tsx            # App card component
│   └── ...
└── lib/
    ├── api.ts                 # Fetch functions with ISR tags
    ├── types.ts               # TypeScript types
    └── utils.ts               # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Backend API running on port 3001

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local`:
```bash
cp .env.local.example .env.local
```

3. Configure environment variables:
```env
NEXT_PUBLIC_CONTENT_API_URL=http://localhost:3001
REVALIDATE_SECRET=your-super-secret-key-change-in-production-min-32-chars
```

4. Run development server:
```bash
npm run dev
```

Visit `http://localhost:3000`

## 🧪 Testing ISR Features

### Test Time-Based Revalidation

1. Visit `/apps`
2. Note the "Last Updated" time
3. Wait 60 seconds
4. Refresh - see stale content served instantly
5. Wait a bit more - see fresh content

### Test On-Demand Path Revalidation

```bash
curl -X POST http://localhost:3000/api/revalidate-path \
  -H "Content-Type: application/json" \
  -d '{"path":"/apps","secret":"your-secret"}'
```

### Test On-Demand Tag Revalidation

```bash
curl -X POST http://localhost:3000/api/revalidate-tag \
  -H "Content-Type: application/json" \
  -d '{"tag":"featured-apps","secret":"your-secret"}'
```

### Test generateStaticParams

```bash
npm run build
```

Check build output - see pre-rendered pages:
```
├ ● /apps/uniswap (ISR: 60 Seconds)
├ ● /apps/aave (ISR: 60 Seconds)
└ ● /apps/curve (ISR: 60 Seconds)
```

## 📊 ISR Debugging

### Enable Cache Logging

Add to `.env.local`:
```env
NEXT_PRIVATE_DEBUG_CACHE=1
```

Run production mode:
```bash
npm run build
npm start
```

Check console for:
- Cache HIT
- Cache MISS
- Cache SET

### Monitor Performance

```bash
npm run build -- --profile
```

## 🎨 Design System

- **Dark glassmorphic theme**
- **Bento grid layout** (not standard cards)
- **Educational ISR indicators** on every page
- **Real-time cache status** badges

## 📦 Dependencies

- `next@15.1.0` - Next.js framework
- `react@18.3.1` - React library
- `react-markdown@9.0.1` - Markdown rendering
- `framer-motion@11.0.0` - Animations
- `lucide-react@0.309.0` - Icons
- `tailwindcss@3.4.1` - Styling

## 🌐 Deployment to Vercel

1. Push to GitHub
2. Import to Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_CONTENT_API_URL` - Your backend URL
   - `REVALIDATE_SECRET` - Same as backend
4. Deploy!

## 🔧 Build Configuration

`next.config.ts` includes:
- Image optimization
- Fetch logging
- ISR optimizations

## 📚 Learning Resources

Each page includes:
- ISRStatus component showing configuration
- Educational notes about ISR behavior
- Cache indicators showing freshness
- Debug information in production mode

## 🎓 What You'll Learn

- How ISR reduces server load
- When to use time-based vs on-demand revalidation
- How to debug cache behavior
- Real-world ISR deployment patterns
- How to choose the right ISR strategy

## 🐛 Troubleshooting

**Pages not updating?**
- Check revalidation secret matches
- Verify API endpoint is accessible
- Enable debug mode to see cache logs

**Build failing?**
- Ensure backend API is running
- Check all required env vars are set
- Verify generateStaticParams returns valid slugs

## 📝 License

MIT - Educational project for learning Next.js ISR

---

Built with ❤️ to master Incremental Static Regeneration