import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getPurchaseHistory } from './apiUser';
import moment from 'moment';

const Dashboard = () => {
  const [history, setHistory] = useState([]);

  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const token = isAuthenticated().token;

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userLinks = () => {
    return (
      <div className='card'>
        <h4 className='card-header'><b>USER</b></h4>
        <ul className='list-group'>
          <li className='list-group-item itemhover'>
            <Link className='nav-link' to='/cart'>
              MY CART
            </Link>
          </li>
          <li className='list-group-item itemhover'>
            <Link className='nav-link' to={`/profile/${_id}`}>
              MY PROFILE
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>User Information</h3>
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

  const orderStatus = (status) => {
    switch (status) {
      case 'Not processed':
        return <h6>Status: <span style={{ color: 'lightgrey' }}>Not processed</span></h6>
      case 'Processing':
        return <h6>Status: <span style={{ color: 'grey' }}>Processing</span></h6>
      case 'Shipped':
        return <h6>Status: <span style={{ color: 'blue' }}>Shipped</span></h6>
      case 'Delivered':
        return <h6>Status: <span style={{ color: 'green' }}>Delivered</span></h6>
      case 'Cancelled':
        return <h6>Status: <span style={{ color: 'red' }}>Cancelled</span></h6>
      default:
        return null
    }
  }

  const purchaseHistory = (history) => {
    return (
      <div className='card mb-5'>
        <h3 className='card-header'>Purchase History</h3>
        <ul className='list-group'>
          <li className='list-group-item'>
            {history.map((h, i) => {
              return (
                <div key={i}>
                  <hr />
                  <h6>Purchased Date: {moment(h.createdAt).fromNow()}</h6>
                  <h6>Amount: {h.amount}</h6>
                  {orderStatus(h.status)}
                  <h6>Address: {h.address}</h6>
                  {h.products.map((p, j) => {
                    return (
                      <div key={j}>
                        <h6>Product Name: {p.name}</h6>
                        <h6>Product Price: ${p.price}</h6>
                      </div>
                    );
                  })}
                </div>
              );
            })}
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
        <div className='col-md-3'>{userLinks()}</div>
        <div className='col-md-9'>
          {userInfo()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
