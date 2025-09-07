# 🔧 Google Analytics Setup Guide

## Step 1: Create Google Analytics Property

1. **Go to Google Analytics**: https://analytics.google.com/
2. **Sign in** with your Google account
3. **Create Account** (if you don't have one):
   - Account name: `TextCraft` (or your company name)
   - Country: Your country
   - Currency: USD
4. **Create Property**:
   - Property name: `TextCraft`
   - Reporting time zone: Your timezone
   - Currency: USD
5. **Choose Data Stream**:
   - Platform: **Web**
   - Website URL: `https://www.textcraft.dev`
   - Stream name: `TextCraft Web`

## Step 2: Get Your Measurement ID

After creating the property, you'll get a **Measurement ID** that looks like: `G-XXXXXXXXXX`

## Step 3: Update Your App

### Option A: Update Configuration File (Recommended)

1. Open `src/config/analytics.ts`
2. Replace `G-XXXXXXXXXX` with your actual Measurement ID:

```typescript
export const ANALYTICS_CONFIG = {
  GOOGLE_ANALYTICS_ID: 'G-YOUR_ACTUAL_ID_HERE', // ← Replace this
  ENABLED: import.meta.env.PROD,
  DEBUG: import.meta.env.DEV,
};
```

### Option B: Use Environment Variables

1. Create `.env` file in your project root:
```bash
VITE_GA_MEASUREMENT_ID=G-YOUR_ACTUAL_ID_HERE
```

2. Update `src/hooks/useAnalytics.tsx` to use environment variable:
```typescript
const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || getGoogleAnalyticsId();
```

## Step 4: Update HTML

Update `index.html` with your actual Measurement ID:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ACTUAL_ID_HERE"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR_ACTUAL_ID_HERE', {
    page_title: document.title,
    page_location: window.location.href,
  });
</script>
```

## Step 5: Test Your Setup

1. **Build and run your app**:
   ```bash
   npm run build
   npm run preview
   ```

2. **Check browser console** for:
   - ✅ `Google Analytics initialized with ID: G-XXXXXXXXXX`
   - ❌ `Google Analytics not configured` (if not set up)

3. **Check Google Analytics**:
   - Go to your GA4 property
   - Check "Realtime" reports
   - Visit your app and see if events appear

## Step 6: Verify Tracking

Your app will automatically track:
- ✅ Page views
- ✅ Tool usage
- ✅ User interactions
- ✅ Performance metrics
- ✅ Errors (if configured)

## Troubleshooting

### Common Issues:

1. **"Google Analytics not configured"**
   - Make sure you updated the Measurement ID in `src/config/analytics.ts`

2. **No data in Google Analytics**
   - Check if the Measurement ID is correct
   - Verify the domain matches your GA4 property
   - Wait 24-48 hours for data to appear

3. **Events not showing**
   - Check browser console for errors
   - Verify gtag is loaded: `window.gtag` should exist
   - Check if ad blockers are interfering

### Debug Mode:

In development, analytics events are logged to console. Look for:
- `Analytics Event: page_view`
- `Analytics Event: tool_usage`
- `Analytics Event: user_interaction`

## Production Checklist

- [ ] Measurement ID updated in `src/config/analytics.ts`
- [ ] Measurement ID updated in `index.html`
- [ ] App builds without errors
- [ ] Console shows "Google Analytics initialized"
- [ ] Test events appear in GA4 Realtime reports
- [ ] Deploy to production
- [ ] Verify tracking works in production

## Need Help?

- **Google Analytics Help**: https://support.google.com/analytics
- **GA4 Documentation**: https://developers.google.com/analytics/devguides/collection/ga4
- **Measurement ID Format**: Always starts with `G-` followed by 10 characters
