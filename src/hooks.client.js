import { handleErrorWithSentry, replayIntegration } from "@sentry/sveltekit";
import * as Sentry from "@sentry/sveltekit";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY,

  tracesSampleRate: 1.0,
});

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
