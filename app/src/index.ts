import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { withAITracking } from '@microsoft/applicationinsights-react-js';
import { reactPlugin } from './AppInsights';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(React.createElement(withAITracking(reactPlugin, App)), document.getElementById('root'));
