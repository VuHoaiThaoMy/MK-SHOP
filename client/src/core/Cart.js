import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';
import Copyright from './Copyright';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <h2>YOUR CART HAS {`${items.length}`} ITEMS</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2 style={{ marginTop: '30px' }}>
      YOUR CART IS EMPTY <br /> <Link to='/shop'><i><u>Continue Shopping</u></i></Link>
    </h2>
  );

  return (
    <Layout>
      <div className='row'>
        <div className='col-md-2'></div>
        <div className='col-md-4'>
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className='col-md-4' style={{ marginTop: '150px' }}>
          <h2 className='mb-4'>YOUR CART SUMMARY</h2>
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
        <div className='col-md-2'></div>
      </div>
      <Copyright />
    </Layout>
  );
};

export default Cart;
