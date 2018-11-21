import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import registerServiceWorker from './registerServiceWorker';
import Navigation from './components/Navigation';

ReactDOM.render(<Navigation />, document.getElementById('root'));
registerServiceWorker();
