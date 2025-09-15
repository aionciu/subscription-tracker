# Documentation

This folder contains all the documentation for the Subscription Tracker app.

## 📚 Available Documentation

### Setup Guides
- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Complete guide to set up Supabase authentication with Google OAuth
- **[env.example](./env.example)** - Environment variables template

### Troubleshooting
- **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Common issues and solutions for Gmail authentication

## 🚀 Quick Start

1. **Follow the Supabase setup guide** to configure authentication
2. **Copy env.example** to your project root as `.env` and fill in your credentials
3. **Run the app** and test the Gmail authentication flow

## 📱 Features Implemented

- ✅ **Google OAuth Authentication** - Sign in with Gmail
- ✅ **Protected Routes** - Secure access to app features  
- ✅ **User Profile Management** - View and manage account settings
- ✅ **Persistent Sessions** - Stay logged in across app restarts
- ✅ **Dashboard** - Overview of subscription statistics
- ✅ **Profile Screen** - User information and settings
- ✅ **Subscriptions Screen** - Ready for subscription management features

## 🔧 Technical Stack

- **Frontend**: React Native with Expo
- **Authentication**: Supabase Auth with Google OAuth
- **Routing**: Expo Router with file-based routing
- **State Management**: React Context API
- **Storage**: AsyncStorage for session persistence
- **UI**: React Native components with custom styling

## 📖 Next Steps

The authentication system is complete and working! Next development priorities:

1. **Subscription Management** - Add, edit, delete subscriptions
2. **Database Schema** - Set up Supabase tables for subscriptions
3. **Notifications** - Renewal reminders and alerts
4. **Analytics** - Spending trends and insights
5. **Export Features** - Data export and backup
