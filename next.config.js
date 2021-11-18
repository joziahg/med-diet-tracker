const { withSuperjson } = require('next-superjson')
const { withPlugins } = require('next-compose-plugins')

// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE
})

module.exports = withPlugins([
  withBundleAnalyzer,
  withSuperjson
], {
  reactStrictMode: true
})
