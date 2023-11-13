import React, { Suspense } from "react";
import { Await, Link, useLoaderData, defer } from "react-router-dom";
import { getHostVans } from "../../api";
import { requireAuth } from "../../utils.js";

export async function loader({ request }) {
  await requireAuth(request);
  let hostVansPromise = getHostVans();
  return defer({ hostVans: hostVansPromise });
}

function HostVans() {
  const data = useLoaderData();

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
        <Suspense fallback={<h2>Loading host vans...</h2>}>
          <Await resolve={data.hostVans}>
            {(resolvedHostVans) => {
              const hostVansEls = resolvedHostVans.map((van) => {
                return (
                  <Link
                    to={van.id}
                    key={van.id}
                    className="host-van-link-wrapper"
                  >
                    <div className="host-van-single" key={van.id}>
                      <img src={van.imageUrl} alt={` of ${van.name}`} />
                      <div className="host-van-info">
                        <h3>{van.name}</h3>
                        <p>${van.price}/day</p>
                      </div>
                    </div>
                  </Link>
                );
              });
              return <ul>{hostVansEls}</ul>;
            }}
          </Await>
        </Suspense>
      </div>
    </section>
  );
}

export default HostVans;
