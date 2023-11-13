import React, { Suspense } from "react";
import {
  Link,
  useSearchParams,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getVans } from "../../api";

export async function loader() {
  return defer({ vans: getVans() });
}

function Vans() {
  const data = useLoaderData();

  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");

  const handleFilterChange = (key, value) => {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  };

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <Suspense fallback={<h1>Loading...</h1>}>
      <Await resolve={data.vans}>
        {(resolvedData) => {
          const filteredVansData = typeFilter
            ? resolvedData.filter((van) => van.type === typeFilter)
            : resolvedData;

          const vansElement = filteredVansData.map((van) => (
            <div key={van.id} className="van-tile">
              <Link
                to={van.id}
                state={{
                  search: `?${searchParams.toString()}`,
                  type: typeFilter,
                }}
              >
                <img src={van.imageUrl} alt="van-type" />
                <div className="van-info">
                  <h3>{van.name}</h3>
                  <p>
                    ${van.price}
                    <span>/day</span>
                  </p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
              </Link>
            </div>
          ));

          return (
            <>
              {" "}
              <div className="van-list-filter-buttons">
                <button
                  className={`van-type simple ${
                    typeFilter === "simple" ? "selected" : ""
                  }`}
                  onClick={() => handleFilterChange("type", "simple")}
                >
                  Simple
                </button>
                <button
                  className={`van-type luxury ${
                    typeFilter === "luxury" ? "selected" : ""
                  }`}
                  onClick={() => handleFilterChange("type", "luxury")}
                >
                  Luxury
                </button>
                <button
                  className={`van-type rugged ${
                    typeFilter === "rugged" ? "selected" : ""
                  }`}
                  onClick={() => handleFilterChange("type", "rugged")}
                >
                  Rugged
                </button>
                {searchParams.has("type") ? (
                  <button
                    className="van-type clear-filters"
                    onClick={() => handleFilterChange("type", null)}
                  >
                    Clear
                  </button>
                ) : null}
              </div>
              <ul className="van-list">{vansElement}</ul>
            </>
          );
        }}
      </Await>
      </Suspense>
    </div>
  );
}

export default Vans;
