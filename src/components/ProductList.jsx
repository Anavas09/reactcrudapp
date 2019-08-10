import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import Swal from 'sweetalert2';

function ProductList({product, setRefreshProducts}){

    const { id, category, saucerName, saucerPrice } = product;

    const deleteProduct = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
          }).then(async (result) => {
              if (result.value) {

                const url = `http://localhost:4000/restaurant/${id}`

                try {
                    await axios.delete(url)
                            .then(res => {
                                if(res.status === 200){
                                    Swal.fire(
                                        'Saucer Removed',
                                        'You product has correctly removed!',
                                        'success'
                                    )
                                    setRefreshProducts(true);
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

                await axios.delete('')

                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
          })
    }

    return (
        <li data-category={category} className="list-group-item d-flex justify-content-between align-item-center">
            <p>
                {saucerName} {' '}
                <span className="font-weight-bold">${saucerPrice}</span>
            </p>

            <div>
                <Link
                    to={`/products/edit/${id}`}
                    className="btn btn-success mr-2"
                >
                    Edit
                </Link>

                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={()=> deleteProduct(id)}
                >
                    Delete &times;
                </button>
            </div>
        </li>
    );
};

ProductList.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductList;