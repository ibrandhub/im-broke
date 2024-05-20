import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const CustomerPage = Loadable(lazy(() => import('pages/customer/index')));
const LandingPage = Loadable(lazy(() => import('pages/landing/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '/dashboard',
      element: <DashboardDefault />
    },
    {
      path: '/customer',
      element: <CustomerPage />
    }
  ]
};

export default MainRoutes;
