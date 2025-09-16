# Supabase Authentication Setup Guide

This guide will help you set up Supabase authentication with Google OAuth for your React Native subscription tracker app.

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new account
2. Create a new project
3. Note down your project URL and anon key from the project settings

## 2. Configure Google OAuth

### Enable Google Provider in Supabase

1. In your Supabase dashboard, go to **Authentication > Providers**
2. Enable **Google** provider
3. You'll need to create Google OAuth credentials

### Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Go to **Credentials** and create **OAuth 2.0 Client IDs**
5. Create credentials for:
   - **Web application** (for Expo web)
   - **iOS application** (for iOS builds)
   - **Android application** (for Android builds)

### Configure OAuth Redirect URIs

For each platform, add these redirect URIs:

**Web:**
- `https://your-project-ref.supabase.co/auth/v1/callback`
- `http://localhost:8081/--/(auth)/callback` (for development)

**iOS:**
- `https://your-project-ref.supabase.co/auth/v1/callback`

**Android:**
- `https://your-project-ref.supabase.co/auth/v1/callback`

### Add Credentials to Supabase

1. In Supabase dashboard, go to **Authentication > Providers > Google**
2. Add your Google OAuth credentials:
   - **Client ID (Web)**: Your web client ID
   - **Client Secret (Web)**: Your web client secret
   - **Client ID (iOS)**: Your iOS client ID
   - **Client ID (Android)**: Your Android client ID

## 3. Environment Configuration

1. Copy `env.example` to `.env` in your project root
2. Fill in your Supabase credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB=your-web-client-id
EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS=your-ios-client-id
EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID=your-android-client-id
```

## 4. Test the Setup

1. Run your app: `npm start`
2. Try signing in with Google
3. Check the Supabase dashboard to see if users are being created

## 5. Troubleshooting

### Common Issues

**"Invalid redirect URI"**
- Make sure your redirect URIs are correctly configured in Google Cloud Console
- Ensure the URIs match exactly (including http vs https)

**"Client ID not found"**
- Verify your client IDs are correctly set in the environment variables
- Make sure you're using the right client ID for each platform

**"Supabase connection failed"**
- Check your Supabase URL and anon key
- Ensure your Supabase project is active

### Development vs Production

For production builds, you'll need to:
1. Update redirect URIs in Google Cloud Console
2. Update redirect URIs in Supabase dashboard
3. Use production client IDs in your environment variables

## 6. Security Notes

- Never commit your `.env` file to version control
- Use different client IDs for development and production
- Regularly rotate your Supabase anon keys
- Monitor authentication logs in Supabase dashboard

## 7. Next Steps

Once authentication is working:
1. Set up user profiles table in Supabase
2. Create subscriptions table schema
3. Implement subscription CRUD operations
4. Add push notifications for renewal reminders
