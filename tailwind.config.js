import { defineConfig } from 'tailwindcss';

export default defineConfig({
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        sfu: ['"SF UI Text"', 'sans-serif'], // Use Inter as the default sans-serif font
        // If you want to use a system font stack (like Apple's San Francisco), use this:
        // sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      
    },
  },
  plugins: [],
});