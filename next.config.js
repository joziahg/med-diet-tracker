const { withSuperjson } = require('next-superjson')
const { withPlugins } = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')

module.exports = withPlugins([
  withSuperjson(),
  [withBundleAnalyzer, {
    enabled: process.env.ANALYZE === 'true'
  }]
], {
  reactStrictMode: true
})
