import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./app/App";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://576656ce9f166178d09577c142fa5dbd@o4511259794997248.ingest.de.sentry.io/4511259932819536",
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
  sendDefaultPii: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={<p>Something went wrong</p>}>
      <App />
    </Sentry.ErrorBoundary>
  </StrictMode>,
);
