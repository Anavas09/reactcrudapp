import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ProductList from './ProductList';

function Products({products, setRefreshProducts}){
    return (
        <Fragment>
            <h2 className="text-center">Saucer List</h2>
            <ul className="list-group-mt-5">
                {products.map(product => {
                    const { id } = product;
                    return(
                        <ProductList
                            key={id}
                            product={product}
                            setRefreshProducts={setRefreshProducts}
                        />
                    )
                })}
            </ul>
        </Fragment>
    );
};

Products.propTypes = {
    products: PropTypes.array.isRequired,
};

export default Products;