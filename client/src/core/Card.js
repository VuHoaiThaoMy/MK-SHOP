import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import CardM from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import { addItem, updateItem, removeItem } from './cartHelpers';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,

  },
  productDescription: {
    height: '100px',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f, // default value of function
  run = undefined, // default value of undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link href={`/product/${product._id}`} className='mr-2'>
          <Button variant='contained' color='primary' style={{ color: '#E7385E', background: 'black' }}>
            <b className='btn-view'>VIEW PRODUCT</b>
          </Button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <Button onClick={addToCart} variant='outlined' color='secondary' className='btn-add_cart'>
          Add to Cart
        </Button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className='badge badge-primary badge-pill' style={{ color: 'white', background: 'green' }}>In Stock </span>
    ) : (
      <span className='badge badge-primary badge-pill' style={{ color: 'white', background: 'red' }}>Out of Stock </span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div className='mt-2'>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Adjust Quantity</span>
            </div>
            <input
              type='number'
              className='form-control'
              style={{ textAlign: 'center' }}
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <Button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          variant='contained'
          color='secondary'
          className={classes.button}
          startIcon={<DeleteIcon />}
        >
          Remove Product
        </Button>
      )
    );
  };

  const classes = useStyles();

  return (
    // <div className='card'>
    //   <div className='card-header name'>{product.name}</div>
    //   <div className='card-body'>
    //     {shouldRedirect(redirect)}
    //     <ShowImage item={product} url='product' />
    //     <p className='lead mt-2'>{product.description.substring(0, 100)}</p>
    //     <p className='black-10'>${product.price}</p>
    //     <p className='black-9'>
    //       Category: {product.category && product.category.name}
    //     </p>
    //     <p className='black-8'>
    //       Added on {moment(product.createdAt).fromNow()}
    //     </p>

    //     {showStock(product.quantity)}
    //     <br></br>

    //     {showViewButton(showViewProductButton)}

    //     {showAddToCartBtn(showAddToCartButton)}

    //     {showRemoveButton(showRemoveProductButton)}

    //     {showCartUpdateOptions(cartUpdate)}
    //   </div>
    // </div>

    <Container className={classes.cardGrid} maxWidth='md'>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <CardM className={classes.card + ' product-item'}>
            {shouldRedirect(redirect)}
            <ShowImage item={product} url='product' />
            <CardContent className={classes.cardContent} style={{ textAlign: 'center' }}>
              <Typography gutterBottom variant='h5' component='h2' style={{ color: '#E7385E', textTransform: 'uppercase', fontWeight: 'bold' }}>
                {product.name}
              </Typography>
              {!showViewProductButton && <Typography className={classes.productDescription} style={{}}><i>{product.description.substring(0, 100)}</i></Typography>}
              <p className='black-10'><i>Price: </i><b style={{ color: 'red', fontSize: '25px' }}>${product.price}</b></p>
              <p className='black-9'>
                <b style={{ color: 'blue', fontSize: '20px' }}>{product.category && product.category.name}</b>{' '}
              </p>{' '}
              <p className='black-8'>
                Added on {moment(product.createdAt).fromNow()}{' '}
              </p>
              <p>{showStock(product.quantity)}</p>
              <br></br>
              <span>
                {showViewButton(showViewProductButton)}
                {showAddToCartBtn(showAddToCartButton)}
                {showRemoveButton(showRemoveProductButton)}
              </span>
              {showCartUpdateOptions(cartUpdate)}
            </CardContent>
          </CardM>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Card;
