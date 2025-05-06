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
      <Toaster />
      <div className="relative min-h-screen overflow-x-hidden">
        {/* Animated background shapes */}
        <div className="animated-bg-shape bg-shape-1"></div>
        <div className="animated-bg-shape bg-shape-2"></div>
        <div className="animated-bg-shape bg-shape-3"></div>
        <div className="relative z-10">
          <RouterProvider router={router} />
        </div>
      </div>
    </>
  );
}

export default App
