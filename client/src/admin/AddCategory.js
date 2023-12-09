import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createCategory } from './apiAdmin';
import '../styles.css'
import DashboardIcon from '@material-ui/icons/Dashboard';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError('');
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    // make request to api to create category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError('');
        setSuccess(true);
      }
    });
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit} style={{ textAlign: 'center' }}>
      <div className='form-group' style={{ marginBottom: '30px' }}>
        <label style={{ color: 'black', marginBottom: '25px', fontSize: '30px' }}><b>NAME CATEGORY</b></label>
        <input
          type='text'
          className='form-control'
          style={{ width: '100%', height: '50px', border: '2px solid lightgrey' }}
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className='btn btn-outline-primary btn-products' ><b>CREATE</b></button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className='success' style={{ color: '#1ADD2E', textAlign: 'center', fontSize: '15px' }}>{name} is created!</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className='danger' style={{ color: 'red', textAlign: 'center', fontSize: '15px' }}>Category should be unique!</h3>;
    }
  };

  const goBack = () => (
    <div className='mt-5'>
      <Link to='/admin/dashboard' className='warning-back'>
        <DashboardIcon style={{ marginBottom: '5px' }} />
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    <Layout>
      <div className='row' style={{ marginTop: '0' }}>
        <div className='col-md-8 offset-md-2'>
          {goBack()}
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
