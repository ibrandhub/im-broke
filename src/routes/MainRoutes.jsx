import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const CustomerPage = Loadable(lazy(() => import('pages/customer/index')));
const RoomsPage = Loadable(lazy(() => import('pages/rooms/index')));
const RoomsPageId = Loadable(lazy(() => import('pages/rooms/id/index')));
const LandingPage = Loadable(lazy(() => import('pages/landing/index')));
const RankingPage = Loadable(lazy(() => import('pages/ranking/index')));

// render - sample page

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
    },
    {
      path: '/ranking',
      element: <RankingPage />
    },
    {
      path: '/rooms',
      element: <RoomsPage />
    },
    {
      path: '/rooms/:id',
      element: <RoomsPageId />
    }
  ]
};

export default MainRoutes;
