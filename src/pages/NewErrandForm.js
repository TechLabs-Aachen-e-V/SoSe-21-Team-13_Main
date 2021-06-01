import React, { Fragment } from 'react';
import Navbar from '../components/UI/Navbar';

const NewErrandForm = () => {
  return (
    <Fragment>
      <Navbar />
      <form className='col-10 col-md-7 col-lg-6 col-xl-5 col-xxl-4 mx-auto pt-5'>
        <div className="form-group">
          <label htmlFor="errand-title">Errand title</label>
          <input type="text" className="form-control" id="errand-title" placeholder="Dog-walking" autoFocus />
        </div>
        <div className="form-group pt-2">
          <label htmlFor="errand-description" >Description</label>
          <textarea className="form-control" id="errand-description" rows="3" placeholder="Looking for a dog lover to walk my puppy 🐶"></textarea> 
        </div>
        <div className="form-group pt-2">
          <label htmlFor="errand-location">Errand location</label>
          <input type="text" className="form-control" id="errand-location" placeholder="Aachen-Mitte" />
        </div>
        <div className="form-group pt-2">
          <label htmlFor="errand-compensation">Errand compensation (EUR)</label>
          <input type="number" step=".1" className="form-control" id="errand-compensation" placeholder="5.5" />
        </div>
        <div className="form-group pt-2">
          <label htmlFor="date-due">Date due</label>
          <input type="date" className="form-control" id="date-due" />
        </div>
        <div className="form-group pt-2">
          <label htmlFor="time-due">Time due</label>
          <input type="time" className="form-control" id="time-due" />
        </div>
        <div className="form-group pt-2">
          <label htmlFor="category">Category</label>
          <select className="form-control" id="category">
            <option>Household</option>
            <option>Pet</option>
            <option>Delivery</option>
            <option>Shopping</option>
          </select>
        </div>
        <div className="form-group pt-2">
          <label htmlFor="img-upload">Upload an image:</label>
          <br />
          <input type="file" accept="image/png, image/gif, image/jpeg" className="form-control-file pt-1" id="img-upload" />
        </div>
        <button className="btn btn-dark mt-3" type="submit">Submit</button>
      </form>
    </Fragment>
  );
};

export default NewErrandForm;
