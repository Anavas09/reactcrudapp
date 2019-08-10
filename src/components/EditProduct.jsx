import React, { useRef, useState }  from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

import Error from './Error';

function EditProduct(props){

    const {history, product, setRefreshProducts} = props;

    const { id, saucerName, saucerPrice } = product;

    const saucerNameRef = useRef('');
    const saucerPriceRef = useRef('');

    const [category, setCategory] = useState('');
    const [error, setError] = useState(false);

    const checkRadioValue = (e) => {
        setCategory(e.target.value)
    }

    const handleOnSubmit = async e => {
        e.preventDefault();

        const newSaucerName = saucerNameRef.current.value;
        const newSaucerPrice = saucerPriceRef.current.value;
    
        if(newSaucerName === '' || newSaucerPrice === ''){
            setError(true);
            return;
        }

        setError(false);
        
        const suacerCategory = (category === '') ? product.category : category
        //Obtener valores del formulario
        const editSaucer = {
            saucerName: newSaucerName,
            saucerPrice: newSaucerPrice,
            category: suacerCategory
        }

        //Enviar el request
        const url = `http://localhost:4000/restaurant/${id}`

        try {
            await axios.put(url, editSaucer)
                    .then(res => {
                        if(res.status === 200){
                            Swal.fire(
                                'Product Edited',
                                'You product has correctly edited!',
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
        history.push('/products-list')
    }

    return (
        <div className="col-md-8 mx-auto">
            <h1 className="text-center">Edit Saucer</h1>
            <div className="col-md-8 mx-auto ">

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
                            placeholder="Saucer Name"
                            ref={saucerNameRef}
                            defaultValue={saucerName}
                        />
                    </div>

                    <div className="form-group">
                        <label>Saucer Price</label>
                        <input 
                            type="number"
                            className="form-control"
                            name="price"
                            placeholder="Saucer Price"
                            ref={saucerPriceRef}
                            defaultValue={saucerPrice}
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
                                defaultChecked={(product.category === 'dessert')}
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
                                defaultChecked={(product.category === 'drink')}
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
                                defaultChecked={(product.category === 'slices')}
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
                                defaultChecked={(product.category === 'salad')}
                            />
                            <label className="form-check-label">
                                Salad
                            </label>
                        </div>
                    </div>

                    <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Edit Product" />
                </form>
            </div>
        </div>
    );
};

EditProduct.propTypes = {
    product: PropTypes.object,
};

export default withRouter(EditProduct);