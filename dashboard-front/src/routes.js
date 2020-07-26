import React from 'react';

const Charts = React.lazy(() => import('./views/Charts/Charts.js'));
const Login = React.lazy(() => import('./views/Pages/Login/Login'));
const Register = React.lazy(() => import('./views/Pages/Register/Register'));
const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
const Attack = React.lazy(() => import('./views/Pages/Exploit/Attack/Attack'));
const SetupTarget = React.lazy(() => import('./views/Pages/Target/Target'));
const Target = React.lazy(() => import('./components/Target/Target'));
const Profile = React.lazy(() => import('./views/Pages/Profile/Profile'));
const Osint = React.lazy(() => import('./views/Pages/Detect/OSINT/OSINT'));
const Scan = React.lazy(() => import('./views/Pages/Detect/Scan/Scan'));
const Harvest = React.lazy(() => import('./views/Pages/Detect/Harvest/Harvest'));
const History = React.lazy(() => import('./views/Pages/Report/History'));
const Anssi = React.lazy(() => import('./views/Pages/Anssi/Search'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/attack', exact: true, name: 'Attack', component: Attack },
  { path: '/target', exact: true, name: 'SetupTarget', component: SetupTarget },
  { path: '/target/:id', exact: true, name: 'Target', component: Target },
  { path: '/profile', exact: true, name: 'Profile', component: Profile },
  { path: '/osint', exact: true, name: 'Osint', component: Osint },
  { path: '/scan', exact: true, name: 'Scan', component: Scan },
  { path: '/harvest', exact: true, name: 'Harvest', component: Harvest },
  { path: '/history', exact: true, name: 'History', component: History },
  { path: '/anssi', exact: true, name: 'Anssi', component: Anssi }
];

export default routes;
