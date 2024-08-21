import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from 'react';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import { logout } from './redux/userSlice';
import { ToastContainer } from 'react-toastify';
import axiosInstance from './api/axiosConfig';
import "./index.css"
// ----------------------------------------------------------------------

// axios intercepters
axiosInstance.interceptors.request.use((request) => {
  const token = localStorage.getItem("accessToken");
  request.headers.Authorization = `Bearer ${token}`;
  return request;
}, (error) => {
  console.log(error)
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      console.log(error.response)
      window.location = '/login';
      dispatch(logout());
    }
    return Promise.reject(error);
  }
);


if (import.meta.env.NODE_ENV === 'production') {
  console.log = () => { }
  console.error = () => { }
  console.debug = () => { }
}



const { dispatch } = store;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <HelmetProvider>
        <BrowserRouter>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Suspense>
            <App />
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </PersistGate>
  </Provider>
);
