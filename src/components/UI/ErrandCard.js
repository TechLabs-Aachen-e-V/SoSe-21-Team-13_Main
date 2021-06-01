/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const ErrandCard = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const clickHandler = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="card col-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4 mx-auto mt-4">
      <img src={props.image} className="card-img card-img-top mx-auto pt-3" alt="dog-walking" />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.description}</p>
        <button onClick={clickHandler} className="btn btn-dark">{isVisible ? 'Hide details' : 'More details'}</button>
        {isVisible && 
        (
          <div className='mt-3'>
            <p>Location: {props.location}</p>
            <p>Compensation: {props.compensation} EUR</p>
            <p>Date due: {props.dateDue}</p>
            <p>Time due: {props.timeDue}</p>
            <p>Category: {props.category}</p>
          </div>
        )
        }
      </div>
    </div>
  );
};

export default ErrandCard;
