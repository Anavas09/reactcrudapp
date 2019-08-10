import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

import Error from './Error';

function AddProduct({history, setRefreshProducts}){

    const [saucerName, setSaucerName] = useState('');
    const [saucerPrice, setSaucerPrice] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState(false);

    const checkRadioValue = (e) => {
        setCategory(e.target.value)
    }

    const handleOnSubmit = async e => {
        e.preventDefault();

        if(saucerName === '' || saucerPrice === '' || category ===''){
            setError(true);
            return;
        }

        setError(false)

        //Agregar nuevo producto
        try {
            await axios.post('http://localhost:4000/restaurant',{
                saucerPrice,
                saucerName,
                category
            }).then(res => {
                if(res.status === 201){
                    Swal.fire(
                        'Product Added',
                        'You added a product correctly!',
                        'success'
                    )
                }
            })
        } catch (error) {
            console.error(error);
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'An error has occurred, try again!',
                footer: error
            })
        }

        setRefreshProducts(true);
        history.push('/products-list');

    }

    return (
        <div className="col-md-8 mx-auto">
            <h1 className="text-center">Add Product Component</h1>
            <div className="col-md-8 mx-auto ">
                <h1 className="text-center">Add New Product</h1>

                {error ? <Error message="All fields are required" /> : null}

                <form
                    className="mt-5"
                    onSubmit={handleOnSubmit}
                >
                    <div className="form-group">
                        <label>Saucer Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            onChange={(e) => setSaucerName(e.target.value)}
                            value={saucerName}
                            placeholder="Saucer Name"
                        />
                    </div>

                    <div className="form-group">
                        <label>Saucer Price</label>
                        <input 
                            type="number"
                            className="form-control"
                            name="price"
                            onChange={(e) => setSaucerPrice(e.target.value)}
                            value={saucerPrice}
                            placeholder="Saucer Price"
                        />
                    </div>

                    <legend className="text-center">Category:</legend>
                    <div className="text-center">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="category"
                                value="dessert"
                                onChange={checkRadioValue}
                            />
                            <label className="form-check-label">
                                Dessert
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="category"
                                value="drink"
                                onChange={checkRadioValue}
                            />
                            <label className="form-check-label">
                                Drink
                            </label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="category"
                                value="slices"
                                onChange={checkRadioValue}
                            />
                            <label className="form-check-label">
                                Slices
                            </label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="category"
                                value="salad"
                                onChange={checkRadioValue}
                            />
                            <label className="form-check-label">
                                Salad
                            </label>
                        </div>
                    </div>

                    <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Add Product" />
                </form>
            </div>
        </div>
    );
};

AddProduct.propTypes = {
    setRefreshProducts: PropTypes.func.isRequired,
};

export default withRouter(AddProduct);