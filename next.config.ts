require('dotenv').config();

module.exports = {
  env: {
    MAPTILER_KEY: process.env.MAPTILER_KEY,
  },
  images: {
    domains: ['files.edgestore.dev']
  }
};