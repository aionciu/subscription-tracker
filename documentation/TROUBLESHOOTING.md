# Gmail Authentication Troubleshooting Guide

## Common Issues and Solutions

### 1. **"Missing Supabase environment variables" Error**

**Problem**: App crashes on startup with environment variable error.

**Solution**:
1. Make sure you have a `.env` file in your project root
2. Copy `env.example` to `.env`: `copy env.example .env`
3. Fill in your Supabase credentials in the `.env` file:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB=your-web-client-id
EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS=your-ios-client-id
EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID=your-android-client-id
```

### 2. **"Continue with Gmail" Button Not Working**

**Possible Causes**:

#### A. Supabase Project Not Set Up
- **Check**: Go to [supabase.com](https://supabase.com) and verify your project exists
- **Solution**: Create a new Supabase project if needed

#### B. Google OAuth Not Configured
- **Check**: In Supabase dashboard → Authentication → Providers → Google
- **Solution**: Enable Google provider and add your OAuth credentials

#### C. Invalid Redirect URIs
- **Check**: Google Cloud Console → Credentials → OAuth 2.0 Client IDs
- **Solution**: Add these redirect URIs:
  - `https://your-project-ref.supabase.co/auth/v1/callback`
  - `exp://127.0.0.1:8081/--/(auth)/callback` (for development)

### 3. **OAuth Flow Opens Browser But Doesn't Return to App**

**Problem**: Browser opens for Google sign-in but doesn't redirect back to the app.

**Solutions**:
1. **Check Redirect URI**: Make sure the redirect URI in Google Cloud Console matches exactly
2. **Check Supabase Settings**: Verify the redirect URL in Supabase matches your app's callback
3. **Clear Browser Cache**: Clear cookies and cache in your browser
4. **Try Different Browser**: Test with Chrome, Firefox, or Safari

### 4. **"Invalid Client" Error**

**Problem**: Google returns "Invalid Client" error.

**Solution**:
1. Check your Google Client ID is correct in the `.env` file
2. Verify the Client ID is for the correct platform (Web/iOS/Android)
3. Make sure the OAuth consent screen is configured
4. Check that the app is not in "Testing" mode with restricted users

### 5. **App Stuck on Loading Screen**

**Problem**: App shows loading spinner indefinitely.

**Debug Steps**:
1. Check the console logs for errors
2. Verify Supabase connection: `console.log('Supabase URL:', process.env.EXPO_PUBLIC_SUPABASE_URL)`
3. Check network connectivity
4. Verify AsyncStorage permissions

### 6. **Development vs Production Issues**

**For Development**:
- Use `exp://127.0.0.1:8081/--/(auth)/callback` as redirect URI
- Make sure Expo development server is running
- Test on Expo Go app or development build

**For Production**:
- Update redirect URIs to your production domain
- Use production Supabase project
- Update environment variables for production

## Debugging Steps

### 1. Enable Console Logging
The app now includes detailed console logging. Check your development console for:
- OAuth data
- Session information
- Error messages

### 2. Test Supabase Connection
Add this to test your Supabase setup:

```javascript
// In your component
useEffect(() => {
  console.log('Supabase URL:', process.env.EXPO_PUBLIC_SUPABASE_URL);
  console.log('Supabase Key:', process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ? 'Present' : 'Missing');
}, []);
```

### 3. Check Network Requests
- Open browser developer tools
- Monitor network requests during OAuth flow
- Look for failed requests or CORS errors

### 4. Verify Environment Variables
Run this command to check if environment variables are loaded:

```bash
npx expo start --clear
```

## Quick Setup Checklist

- [ ] Supabase project created
- [ ] Google OAuth credentials created
- [ ] Redirect URIs configured in Google Cloud Console
- [ ] Google provider enabled in Supabase
- [ ] `.env` file created with correct credentials
- [ ] App restarted after adding environment variables
- [ ] Testing on correct platform (web/mobile)

## Still Having Issues?

1. **Check the console logs** for specific error messages
2. **Verify each step** in the SUPABASE_SETUP.md guide
3. **Test with a fresh Supabase project** to rule out configuration issues
4. **Try the OAuth flow in a web browser** first to isolate mobile-specific issues

## Common Error Messages

| Error | Solution |
|-------|----------|
| "Missing Supabase environment variables" | Create `.env` file with credentials |
| "Invalid redirect URI" | Check Google Cloud Console redirect URIs |
| "Client ID not found" | Verify Google Client ID in `.env` file |
| "Supabase connection failed" | Check Supabase URL and anon key |
| "OAuth consent screen required" | Configure OAuth consent screen in Google Cloud Console |
