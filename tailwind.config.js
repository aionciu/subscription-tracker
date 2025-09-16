/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#007AFF', // iOS blue - works well in both light and dark
          600: '#0056b3',
          700: '#004085',
        },
        // Secondary colors - light mode
        secondary: {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#1a1a1a',
        },
        // Dark mode colors
        dark: {
          50: '#f8f9fa',   // Light text on dark backgrounds
          100: '#e9ecef',  // Light text secondary
          200: '#dee2e6',  // Light borders
          300: '#ced4da',  // Light borders secondary
          400: '#adb5bd',  // Muted text
          500: '#6c757d',  // Muted text secondary
          600: '#495057',  // Dark text on light backgrounds
          700: '#343a40',  // Dark text secondary
          800: '#212529',  // Dark backgrounds
          900: '#1a1a1a',  // Darkest backgrounds
        },
        // Status colors
        success: '#28a745',
        warning: '#ffc107',
        danger: '#ff3b30',
        info: '#17a2b8',
        // Google brand color
        google: '#4285f4',
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '28px',
        '4xl': '32px',
      },
      spacing: {
        '18': '72px',
        '88': '352px',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'card': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'card-lg': '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}