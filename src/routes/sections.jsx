import { lazy, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';


// ----------------------------------------------------------------------


export default function Router() {

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
  }, [currentUser])



  const routes = useRoutes([
    {
      path: '/',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <HomePage />
        </Suspense>
      ),
    },
    {
      path: 'login',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: 'register',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <RegisterPage />
        </Suspense>
      ),
    },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
    {
      path: '/',
      element: <Navigate to="/" replace />,
    },
  ]);

  return routes;
}
