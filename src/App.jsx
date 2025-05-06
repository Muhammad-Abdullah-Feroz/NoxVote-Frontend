import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import './App.css'
import { Toaster } from 'react-hot-toast';

import MainPage from './components/MainPage'
import UserDashboard from './components/UserDashboard';

function App() {
  const [count, setCount] = useState(0)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage/>,
    },
    {
      path: "/user",
      element: <UserDashboard/>,
    }
  ]);
  return (
    <>
    <Toaster/>
    <RouterProvider router={router} />
    </>
  )
}

export default App
