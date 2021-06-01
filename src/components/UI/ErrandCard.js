/* eslint-disable react/prop-types */
import React from 'react';

const ErrandCard = (props) => {
  return (
    <div className="card col-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4 mx-auto mt-4">
      <img src={props.image} className="card-img card-img-top mx-auto pt-3" alt="dog-walking" />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.description}</p>
        <a href="#" className="btn btn-dark">More details</a>
      </div>
    </div>
  );
};

export default ErrandCard;
