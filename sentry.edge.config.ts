import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://89643f584abe40b9a6a7a6d501316a7a@o4505509160026112.ingest.sentry.io/4505509161140224',

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
