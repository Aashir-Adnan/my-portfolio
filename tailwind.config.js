module.exports = {
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px) scale(0.95)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        fadeOutDown: {
          "0%": { opacity: "1", transform: "translateY(0) scale(1)" },
          "100%": { opacity: "0", transform: "translateY(20px) scale(0.95)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.3s ease-out forwards",
        fadeOutDown: "fadeOutDown 0.3s ease-in forwards",
      },
    },
  },
  plugins: [],
};
