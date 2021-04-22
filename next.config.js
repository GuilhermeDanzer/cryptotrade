const withImages = require("next-images");
module.exports = withImages({
  esModule: true,
  env: {
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
  },
});
