import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

// Routes
import AppRoutes from './routes';

ReactDOM.render(
    <Router>
        <AppRoutes />
    </Router>,
    document.getElementById('root')
    );
    
serviceWorker.unregister();