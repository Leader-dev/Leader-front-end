const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@/components": path.resolve(__dirname, "src/components/"),
      "@/pages": path.resolve(__dirname, "src/pages/"),
      "@/utils": path.resolve(__dirname, "src/utils/"),
      "@/services": path.resolve(__dirname, "src/services/"),
    },
  },
};
