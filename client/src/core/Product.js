import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout>
      <div className='container' style={{ marginTop: '30px' }}>
        <div style={{ display: 'grid', placeItems: 'center' }}>
          <h4 style={{ fontSize: '40px' }}><b>PRODUCT DETAILS</b></h4>
          <div className='card-product_details' style={{ width: '1000px' }}>
            {product && product.description && (
              <Card product={product} showViewProductButton={false} />
            )}
          </div>
        </div>
        <div className='card-product_related'>
          <h4 style={{ fontSize: '28px', color: 'grey' }}>RELATED PRODUCTS</h4>
          <div className='row row-cols-3'>
            {relatedProduct.map((p, i) => (
              <div className='col' key={i}>
                <Card product={p} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Product;
