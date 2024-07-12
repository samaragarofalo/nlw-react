import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { TripDetails } from "./routes/trip-details";
import { CreateTripPage } from "./routes/create-trip"

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />,
  },
  {
    path: "/trips/:tripId",
    element: <TripDetails />,
  },
])

export default function App() {  
  return <RouterProvider router={router} />
}
