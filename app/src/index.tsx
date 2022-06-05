import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import App from './components/App';

import './i18n';
import 'bootstrap/dist/css/bootstrap.min.css';

Sentry.init({
  dsn: 'https://f2107223361646888197f11c1e47c63a@o100511.ingest.sentry.io/6471716',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <Suspense fallback="...">{React.createElement(App)}</Suspense>,
  document.getElementById('root'),
);
