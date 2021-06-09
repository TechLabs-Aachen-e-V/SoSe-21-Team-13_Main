import React, { Fragment, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/UI/Navbar';

const NewErrandForm = () => {

  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const locationInputRef = useRef();
  const compensationInputRef = useRef();
  const dateDueInputRef = useRef();
  const timeDueInputRef = useRef();
  const categoryInputRef = useRef();
  const imageInputRef = useRef();

  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();
    
    const errandData = {
      title: titleInputRef.current.value,
      description: descriptionInputRef.current.value,
      location: locationInputRef.current.value,
      compensation: compensationInputRef.current.value,
      dateDue: dateDueInputRef.current.value,
      timeDue: timeDueInputRef.current.value,
      category: categoryInputRef.current.value,
      image: imageInputRef.current.value
    };

    await fetch(
      '/errands',
      {
        method: 'POST',
        body: JSON.stringify(errandData),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    history.replace('/');
  };

  return (
    <Fragment>
      <Navbar />
      <form className='col-10 col-md-7 col-lg-6 col-xl-5 col-xxl-4 mx-auto pt-5' onSubmit={submitHandler} >
        <div className='form-group'>
          <label htmlFor='errand-title'>Errand title</label>
          <input type='text' className='form-control' id='errand-title' placeholder='Dog-walking' ref={titleInputRef} required autoFocus />
        </div>
        <div className='form-group pt-2'>
          <label htmlFor='errand-description' >Description</label>
          <textarea className='form-control' id='errand-description' rows='3' placeholder='Looking for a dog lover to walk my puppy 🐶' ref={descriptionInputRef} required></textarea>
        </div>
        <div className='form-group pt-2'>
          <label htmlFor='errand-location'>Errand location</label>
          <input type='text' className='form-control' id='errand-location' placeholder='Aachen-Mitte' ref={locationInputRef} />
        </div>
        <div className='form-group pt-2'>
          <label htmlFor='errand-compensation'>Errand compensation (EUR)</label>
          <input type='number' step='.1' className='form-control' id='errand-compensation' placeholder='5.5' ref={compensationInputRef} required />
        </div>
        <div className='form-group pt-2'>
          <label htmlFor='date-due'>Date due</label>
          <input type='date' className='form-control' id='date-due' ref={dateDueInputRef} required />
        </div>
        <div className='form-group pt-2'>
          <label htmlFor='time-due'>Time due</label>
          <input type='time' className='form-control' id='time-due' ref={timeDueInputRef} />
        </div>
        <div className='form-group pt-2'>
          <label htmlFor='category'>Category</label>
          <select className='form-control' id='category' ref={categoryInputRef}>
            <option>Household</option>
            <option>Pet</option>
            <option>Delivery</option>
            <option>Shopping</option>
          </select>
        </div>
        <div className='form-group pt-2'>
          <label htmlFor='errand-image'>Image URL</label>
          <input type='text' className='form-control' id='errand-image' placeholder='https://source.unsplash.com/random' ref={imageInputRef} />
        </div>
        {/* <div className="form-group pt-2">
          <label htmlFor="img-upload">Upload an image:</label>
          <br />
          <input type="file" accept="image/png, image/gif, image/jpeg" className="form-control-file pt-1" id="img-upload" ref={imageInputRef} />
        </div> */}
        <button className='btn btn-dark mt-3' type='submit'>Submit</button>
      </form>
    </Fragment>
  );
};

export default NewErrandForm;