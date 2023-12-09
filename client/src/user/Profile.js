import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { read, update, updateUser } from './apiUser';

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: false,
    success: false,
  });

  const { token } = isAuthenticated();
  const { name, email, password, error, success } = values;

  const init = (userId) => {
    // console.log(userId);
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    update(match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          // console.log(data.error);
          alert(data.error);
        } else {
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            });
          });
        }
      }
    );
  };

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to='/user/dashboard' />;
    }
  };

  const profileUpdate = (name, email, password) => (
    <form>
      <div className='form-group'>
        <label style={{ color: 'grey', marginBottom: '8px', fontSize: '15px' }}>Name</label>
        <input
          type='text'
          onChange={handleChange('name')}
          className='form-control'
          value={name}
          style={{ width: '800px' }}
        />
      </div>
      <div className='form-group'>
        <label style={{ color: 'grey', marginBottom: '8px', fontSize: '15px' }}>Email</label>
        <input
          type='email'
          onChange={handleChange('email')}
          className='form-control'
          value={email}
          style={{ width: '800px' }}
        />
      </div>
      <div className='form-group'>
        <label style={{ color: 'grey', marginBottom: '8px', fontSize: '15px' }}>Password</label>
        <input
          type='password'
          onChange={handleChange('password')}
          className='form-control'
          value={password}
          style={{ width: '800px' }}
        />
      </div>
      <div style={{ float: 'right', display: 'flex' }}>
        <div className='' style={{ padding: '4px 1px', marginTop: '5px' }}>
          <Link className='nav-link-cancel' to='/user/dashboard'>
            Cancel
          </Link>
        </div>
        <button onClick={clickSubmit} className='btn btn-primary btn-profile' style={{ marginLeft: '2px' }}><b>SUBMIT</b></button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <h2 className='mb-4' style={{ marginTop: '30px', color: '#E7385E' }}><b>EDIT PROFILE</b></h2>
        {profileUpdate(name, email, password)}
        {redirectUser(success)}
      </div>
    </Layout>
  );
};

export default Profile;
