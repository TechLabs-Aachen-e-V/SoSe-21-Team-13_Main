/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Modal from './Modal';

const ErrandCard = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const { currentUser } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const clickHandler = () => {
    setIsVisible(!isVisible);
  };

  const deleteHandler = async () => {
    const errandId = props.id;
    const testObj = {};

    await fetch(`/errands/${errandId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testObj)
    });

    props.refreshMain();
  };

  const requestHandler = async () => {
    //const errandId = props.id;

    setModalIsOpen(!modalIsOpen);
    // await fetch(`/errands/${errandId}/book`, {
    //   method: 'POST'
    // });
  };

  const submitRequestHandler = async(event) => {
    event.preventDefault();
    console.log('errand requested');
  };

  return (
    <div className='card m-3 col-md-5 col-lg-4 col-xl-3 shadow'>
      <img src={props.image} className='card-img card-img-top mx-auto pt-3' alt='dog-walking' />
      <div className='card-body'>
        <h5 className='card-title'>{props.title}</h5>
        <p className='card-text'>{props.description}</p>
        <button onClick={clickHandler} className='btn btn-dark'>{isVisible ? 'Hide details' : 'More details'}</button>
        {isVisible && 
        (
          <div className='mt-3'>
            <p>Location: {props.location}</p>
            <p>Compensation: {props.compensation} EUR</p>
            <p>Date due: {props.dateDue}</p>
            <p>Time due: {props.timeDue}</p>
            <p>Category: {props.category}</p>
            {
              (currentUser && currentUser.userId === props.user) &&
              (<div className='text-center mb-2'>
                <button onClick={deleteHandler} className = 'btn btn-danger'>Delete errand</button>
              </div>
              )
            }
            {
              (currentUser && currentUser.userId !== props.user && !props.assignedUser) &&
                (<div className='text-center mb-2'>
                  <button className = 'btn btn-secondary' onClick={requestHandler} >Request errand</button>
                </div>
                )
            }
            {
              modalIsOpen && (
                <form onSubmit={submitRequestHandler}>
                  <div className='form-floating mb-2'>
                    <textarea className='form-control' id='request-msg' name='request-msg'
                      rows='5' cols='34'>
                      Hey, ...
                    </textarea>
                    <button className='btn btn-primary'>Send</button>
                  </div>
                </form>
              )
            }
            {
              (props.assignedUser) && (
                <div className='text-center'>
                  <button className = 'btn btn-secondary disabled' >Errand is unavailable</button>
                </div>
              )
            }
          </div>
        )
        }
      </div>
    </div>
  );
};

export default ErrandCard;