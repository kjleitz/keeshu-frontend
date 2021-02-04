/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/explicit-function-return-type */
const path = require("path");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { IgnorePlugin } = require('webpack');
const PrerenderSpaPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer;

const envToBool = (envVarName, defaultValue = false) => {
  const rawValue = (process.env[envVarName] || '').toLowerCase();
  if (!rawValue) return defaultValue;
  return ['true', 't', 1].includes(rawValue);
};

const envPlugins = process.env.NODE_ENV !== 'production'
  ? []
  : [
      new PrerenderSpaPlugin({
        staticDir: path.join(__dirname, 'dist'),
        routes: ['/', '/hotels', '/info', '/map', '/us'],
        renderer: new Renderer({
          renderAfterElementExists: '#app',
          headless: true,
          // so we can tell if we're in the prerender step
          injectProperty: '__PRERENDER_INJECTED',
          inject: {
            foo: 'bar',
          },
        }),
        postProcess(rendered) {
          rendered.html = rendered.html.replace(/https?:\/\/localhost:\d+/gi, '');
          return rendered;
        },
      }),
    ];

const webpackPlugins = [
  new IgnorePlugin({
    resourceRegExp: /^\.\/locale$/,
    contextRegExp: /moment$/,
  }),
  ...envPlugins,
];

if (envToBool('BUNDLE_ANALYZER')) webpackPlugins.push(new BundleAnalyzerPlugin());

module.exports = {
  lintOnSave: false,
  publicPath: '/',

  devServer: {
    proxy: "http://localhost:3000",
  },

  configureWebpack: {
    plugins: webpackPlugins,
  },

  pluginOptions: {
    s3Deploy: {
      // acl: 'public-read', // Access control list permissions to apply in S3 (default: public-read)
      acl: 'private', // Access control list permissions to apply in S3 (default: public-read)
      assetMatch: '**', // Regex matcher for asset to deploy (default: **)
      assetPath: 'dist', // The path to the built assets (default: dist)
      awsProfile: 'keeshu-deployer', // Specifies the credentials profile to use. For env vars, omit or set to 'default'. (default: default)
      // awsProfile: 'default', // Specifies the credentials profile to use. For env vars, omit or set to 'default'. (default: default)
      bucket: 'keeshu', // The S3 bucket name (required)
      cacheControl: 'max-age=31536000', // Sets cache-control metadata for all uploads, overridden for individual files by pwa settings
      cloudfrontId: 'E3BWVRMCG6TP4U', // The ID of the distribution to invalidate
      cloudfrontMatchers: '/*', // A comma-separated list of paths to invalidate (default: /*)
      createBucket: false, // Create the bucket if it doesn't exist (default: false)
      deployPath: '/', // Path to deploy the app in the bucket (default: /)
      enableCloudfront: true, // Enables support for Cloudfront distribution invalidation (default: false)
      gzip: true, // Enables GZIP compression
      overrideEndpoint: false, // Override the default AWS endpoint with another e.g. DigitalOcean.
      pluginVersion: '4.0.0-rc3', // `vue-cli-plugin-s3-deploy` plugin version
      pwa: true, // Sets max-age=0 for the PWA-related files specified (default: false)
      pwaFiles: 'index.html', // Comma-separated list of files to treat as PWA files
      region: 'us-east-2', // AWS region for the specified bucket (default: us-east-1)
      registry: undefined, // no idea
      staticErrorPage: 'index.html', // Sets the default error file (default: error.html)
      staticHosting: true, // Enable S3 static site hosting (default: false)
      staticIndexPage: 'index.html', // Sets the default index file (default: index.html)
      uploadConcurrency: 5, // Number of concurrent uploads (default: 5)
    },
  },
};
