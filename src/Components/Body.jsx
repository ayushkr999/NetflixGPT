import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";
import ProtectedRoute from "./ProtectedRoute";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: (
        <ProtectedRoute>
          <Browse />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default Body;
