# Subscription Tracker 👋

A React Native subscription management app built with Expo and Supabase authentication.

## Features

- 🔐 **Google OAuth Authentication** - Secure sign-in with Gmail
- 📱 **Protected Routes** - Secure access to app features
- 👤 **User Profile Management** - View and manage account settings
- 📊 **Subscription Tracking** - Track and manage your subscriptions
- 💾 **Persistent Sessions** - Stay logged in across app restarts

## 📚 Documentation

All detailed documentation is available in the [docs/](./docs/) folder:
- **[Documentation Index](./docs/README.md)** - Complete documentation overview
- **[Setup Guide](./docs/setup/SUPABASE_SETUP.md)** - Complete Supabase and Google OAuth setup
- **[Troubleshooting](./docs/development/TROUBLESHOOTING.md)** - Common issues and solutions
- **[Environment Variables](./docs/setup/env.example)** - Configuration template
- **[Testing Guide](./docs/testing/README.md)** - Test structure and best practices

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase Authentication

Follow the detailed setup guide in [docs/setup/SUPABASE_SETUP.md](./docs/setup/SUPABASE_SETUP.md) to:
- Create a Supabase project
- Set up Google OAuth credentials
- Configure environment variables

### 3. Start the App

```bash
npx expo start
```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
