import React, { Suspense } from "react";
import {
  Link,
  useLocation,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getVans } from "../../api.js";

export function loader({ params }) {
  return defer({ vanDetails: getVans(params.id) });
}

function VansDetail() {
  const location = useLocation();
  const dataPromise = useLoaderData();

  const vanSearch = location.state?.search;
  const vanType = location.state?.type;

  function vanDetailElem(data) {
    return (
      <div className="van-detail">
        <img src={data.imageUrl} alt="van detail" />
        <i className={`van-type ${data.type} selected`}>{data.type}</i>
        <h2>{data.name}</h2>
        <p className="van-price">
          <span>${data.price}</span>/day
        </p>
        <p>{data.description}</p>
        <button className="link-button">Rent this van</button>
      </div>
    );
  }

  return (
    <div className="van-detail-container">
      <Link to={`..${vanSearch}`} relative="path" className="back-button">
        &larr; <span>Back to {vanType || "all"} vans</span>
      </Link>
      <Suspense fallback={<h1>Loading van details</h1>}>
        <Await resolve={dataPromise.vanDetails}>
          {(data) => vanDetailElem(data)}
        </Await>
      </Suspense>
    </div>
  );
}

export default VansDetail;
