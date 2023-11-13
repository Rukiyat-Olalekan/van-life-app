import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans, { loader as vansLoader } from "./pages/vans/Vans";
import VansDetail, { loader as vanDetailLoader } from "./pages/vans/VansDetail";
import HostLayout from "./components/HostLayout";
import Dashboard from "./pages/host/Dashboard";
import Income from "./pages/host/Income";
import HostVans, { loader as hostVansLoader } from "./pages/host/HostVans";
import HostVansDetail, {
  loader as hostVansDetailloader,
} from "./pages/host/HostVansDetail";
import HostVansInfo from "./pages/host/HostVansInfo";
import HostVansPricing from "./pages/host/HostVansPricing";
import HostVansPhotos from "./pages/host/HostVansPhotos";
import Reviews from "./pages/host/Reviews";
import NotFound from "./pages/NotFound";
import Error from "./components/Error";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./pages/auth/Login";
import { requireAuth } from "./utils";
import "./server";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route
        path="vans"
        element={<Vans />}
        loader={vansLoader}
        errorElement={<Error />}
      />
      <Route
        path="login"
        element={<Login />}
        loader={loginLoader}
        action={loginAction}
      />
      <Route
        path="vans/:id"
        element={<VansDetail />}
        loader={vanDetailLoader}
        errorElement={<Error />}
      />

      <Route path="host" element={<HostLayout />}>
        <Route
          index
          element={<Dashboard />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route
          path="income"
          element={<Income />}
          loader={async ({ request }) => await requireAuth(request)}
        />
        <Route
          path="vans"
          element={<HostVans />}
          loader={hostVansLoader}
          errorElement={<Error />}
        />
        <Route
          path="vans/:id"
          element={<HostVansDetail />}
          loader={hostVansDetailloader}
          errorElement={<Error />}
        >
          <Route
            index
            element={
              <HostVansInfo
                loader={async ({ request }) => await requireAuth(request)}
              />
            }
          />
          <Route
            path="pricing"
            element={
              <HostVansPricing
                loader={async ({ request }) => await requireAuth(request)}
              />
            }
          />
          <Route
            path="photos"
            element={<HostVansPhotos />}
            loader={async ({ request }) => await requireAuth(request)}
          />
        </Route>
        <Route
          path="reviews"
          element={<Reviews />}
          loader={async ({ request }) => await requireAuth(request)}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
