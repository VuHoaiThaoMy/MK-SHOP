import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from './apiAdmin';
import DeleteIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/EditOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import '../styles.css'

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteProductData, setDeleteProductData] = useState(null);

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };
  const goBack = () => (
    <div className='mt-5' style={{ marginLeft: '300px' }}>
      <Link to='/admin/dashboard' className='warning-back'>
        <DashboardIcon style={{ marginBottom: '5px' }} />
        Back to Dashboard
      </Link>
    </div>
  );
  const handleClickDelete = (p) => {
    setDeleteProductData(p);
    setShowDeleteConfirmation(true);
  }
  const handleClickConfirm = () => {
    if (deleteProductData)
      destroy(deleteProductData._id);
    setShowDeleteConfirmation(false);
  }
  const handleClickCancel = () => {
    setDeleteProductData(null);
    setShowDeleteConfirmation(false);
  }
  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout>
      <div className='row' style={{ marginTop: '0' }}>
        <div className='col-12'>
          {goBack()}
          <h2 className='text-center' style={{ fontSize: '40px', fontWeight: 'bold', color: 'grey' }}>TOTAL {products.length} PRODUCTS</h2>
          <hr />
          <ul className='list-group' style={{ alignItems: 'center' }}>
            {products.map((p, i) => (
              <li
                key={i}
                className='list-group-item d-flex justify-content-between align-items-center'
                style={{ margin: '5px', width: '700px', border: '1px solid grey', borderRadius: '10px', color: '#E7385E', background: 'black' }}
              >
                <strong>{p.name}</strong>
                <div style={{ float: 'right' }}>
                  <Link to={`/admin/product/update/${p._id}`} style={{ margin: '10px' }}>
                    <span className='badge badge-warning badge-pill edit-icon'>
                      <EditIcon />
                    </span>
                  </Link>
                  <DeleteIcon onClick={() => handleClickDelete(p)} style={{ cursor: 'pointer' }} />
                </div>
              </li>
            ))}
          </ul>
          {showDeleteConfirmation && <div>
            <Dialog
              open={showDeleteConfirmation}
              onClose={handleClickCancel}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"ARE YOU SURE?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <strong>{deleteProductData.name}</strong> WILL BE DELETED PERMANENT.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClickCancel} variant="contained" style={{ backgroundColor: 'lightgrey' }}>
                  No
                </Button>
                <Button onClick={handleClickConfirm} variant="contained" autoFocus style={{ backgroundColor: 'red' }}>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          }
        </div>
      </div>
    </Layout >
  );
};

export default ManageProducts;
