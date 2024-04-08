/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "login-url": "url('../assets/Images/delivery-tracking-service-shipping-logistic_24640-49701.jpg')"
      },
      sceens: {
        "random": "1087px"
      },
      width: {
        'random': '50%',
        "one-third": "30%",
      },
     

    },
  },
  plugins: [],
}

