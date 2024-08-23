import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import AppLayout from './layout/App'
import HomePage from './pages/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppLayout>
        <HomePage />
      </AppLayout>
    ),
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
