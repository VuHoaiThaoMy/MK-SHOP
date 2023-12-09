import React from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import '../styles.css';

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header'><b>ADMIN</b></h4>
        <ul className='list-group'>
          <li className='list-group-item itemhover'>
            <Link className='nav-link' to='/create/category'>
              Create CATEGORY
            </Link>
          </li>
          <li className='list-group-item itemhover'>
            <Link className='nav-link' to='/create/product'>
              Create PRODUCT
            </Link>
          </li>
          <li className='list-group-item itemhover'>
            <Link className='nav-link' to='/admin/orders'>
              View ORDERS
            </Link>
          </li>
          <li className='list-group-item itemhover'>
            <Link className='nav-link' to='/admin/products'>
              Manage PRODUCTS
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>Admin Information</h3>
        <ul className='list-group'>
          <li className='list-group-item item'>{name}</li>
          <li className='list-group-item item'>{email}</li>
          <li className='list-group-item item role'>
            <b>{role === 1 ? 'ADMIN' : 'REGISTERED USER'}</b>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title='Dashboard'
      description={`${name}`}
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-md-3'>{adminLinks()}</div>
        <div className='col-md-9'>{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
