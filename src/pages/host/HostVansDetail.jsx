import React, { Suspense } from "react";
import {
  NavLink,
  Outlet,
  Link,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getHostVans } from "../../api";
import { requireAuth } from "../../utils";

export async function loader({ params, request }) {
  await requireAuth(request);
  return defer({ hostVansDetails: getHostVans(params.id) });
}

function HostVansDetail() {
  const currentVanPromise = useLoaderData();

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <section>
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all vans</span>
      </Link>
      <div className="host-van-detail-layout-container">
        <Suspense fallback={<h2>Loading host vans details...</h2>}>
          <Await resolve={currentVanPromise.hostVansDetails}>
            {(currentVan) => {
              return (
                <>
                  <div className="host-van-detail">
                    <img src={currentVan.imageUrl} alt={currentVan.name} />
                    <div className="host-van-detail-info-text">
                      <i className={`van-type van-type-${currentVan.type}`}>
                        {currentVan.type}
                      </i>
                      <h3>{currentVan.name}</h3>
                      <h4 className="van-price">
                        <span>${currentVan.price}</span>/day
                      </h4>
                    </div>
                  </div>

                  <nav className="host-van-detail-nav">
                    <NavLink
                      to="."
                      end
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                    >
                      Details
                    </NavLink>
                    <NavLink
                      to="pricing"
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                    >
                      Pricing
                    </NavLink>
                    <NavLink
                      to="photos"
                      style={({ isActive }) => (isActive ? activeStyles : null)}
                    >
                      Photos
                    </NavLink>
                  </nav>
                  <Outlet context={[currentVan]} />
                </>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </section>
  );
}

export default HostVansDetail;
