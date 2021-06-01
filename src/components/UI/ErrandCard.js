import React from 'react';
import DogWalkingImg from '../../images/dog_walking.jpg';

const ErrandCard = () => {
  return (
    <div className="card col-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4 mx-auto mt-4">
      <img src={DogWalkingImg} className="card-img card-img-top mx-auto pt-3" alt="dog-walking" />
      <div className="card-body">
        <h5 className="card-title">Dog walking</h5>
        <p className="card-text">Looking for a dog lover to walk my puppy 🐶</p>
        <a href="#" className="btn btn-dark">More details</a>
      </div>
    </div>
  );
};

export default ErrandCard;
