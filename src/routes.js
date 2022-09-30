import React from 'react'

const Home = React.lazy(() => import('./views/Home'))
const Signin = React.lazy(() => import('./views/Signin'))
const Profile = React.lazy(() => import('./views/Profile'))

const routes = [
  { public: true, path: '/', name: 'Home', element: Home },
  { public: true, path: '/signin', name: 'Signin', element: Signin },
  { path: '/profile', name: 'Chat', element: Profile },
]

export default routes
