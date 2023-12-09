import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './apiAdmin';
import DashboardIcon from '@material-ui/icons/Dashboard';

const AddProduct = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: '',
  });

  const { user, token } = isAuthenticated();

  const {
    name,
    description,
    price,
    categories,
    quantity,
    loading,
    error,
    createdProduct,
    formData,
  } = values;

  // load categories and set form data
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          photo: '',
          price: '',
          quantity: '',
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const newPostForm = () => (
    <form className='mb-3' onSubmit={clickSubmit}>
      <h4 style={{ color: 'black', marginTop: '30px', fontSize: '30px' }}><b>POST PRODUCT</b></h4>
      <div className='form-group' style={{ marginTop: '15px' }}>
        <label className='btn btn-secondary'>
          <input
            onChange={handleChange('photo')}
            type='file'
            name='photo'
            accept='image/*'
            required
          />
        </label>
      </div>

      <div className='form-group'>
        <label style={{ color: 'grey', marginBottom: '8px', fontSize: '17px' }}>Name</label>
        <input
          onChange={handleChange('name')}
          type='text'
          className='form-control'
          value={name}
          required
        />
      </div>

      <div className='form-group'>
        <label style={{ color: 'grey', marginBottom: '8px', fontSize: '17px' }}>Description</label>
        <textarea
          onChange={handleChange('description')}
          className='form-control'
          value={description}
          required
        />
      </div>

      <div className='form-group'>
        <label style={{ color: 'grey', marginBottom: '8px', fontSize: '17px' }}>Price</label>
        <input
          onChange={handleChange('price')}
          type='number'
          className='form-control'
          value={price}
          required
        />
      </div>

      <div className='form-group'>
        <label style={{ color: 'grey', marginBottom: '8px', fontSize: '17px' }}>Category</label>
        <select onChange={handleChange('category')} className='form-control' required>
          <option>Please select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className='form-group'>
        <label style={{ color: 'grey', marginBottom: '8px', fontSize: '17px' }}>Shipping</label>
        <select onChange={handleChange('shipping')} className='form-control' required>
          <option>Please select</option>
          <option value='0'>NO</option>
          <option value='1'>YES</option>
        </select>
      </div>

      <div className='form-group'>
        <label style={{ color: 'grey', marginBottom: '8px', fontSize: '17px' }}>Quantity</label>
        <input
          onChange={handleChange('quantity')}
          type='number'
          className='form-control'
          value={quantity}
          required
        />
      </div>

      <button className='btn btn-outline-primary btn-products' style={{ float: 'right' }}><b>CREATE</b></button>
    </form >
  );

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: createdProduct ? '' : 'none' }}
    >
      <h2 style={{ color: '#1ADD2E', fontSize: '18px' }}>{`${createdProduct}`} is created!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className='alert alert-success'>
        <h2 style={{ color: 'grey', fontSize: '15px' }}>Loading...</h2>
      </div>
    );
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
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <div style={{ marginTop: '0' }}>
            {goBack()}
            {newPostForm()}
          </div>
          {showLoading()}
          <div style={{ marginTop: '20px', width: '350px', textAlign: 'center' }}>
            {showSuccess()}
          </div>
          {showError()}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
