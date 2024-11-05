
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './tpRedux02/App';
import store from './tpRedux02/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
  
);
