import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TransitionProvider from './components/TansitionProvider.jsx'
import {Provider} from 'react-redux';
import store from './redux/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TransitionProvider>
  <Provider store={store}>
    <App />
  </Provider>
    </TransitionProvider>
  </StrictMode>,
)
