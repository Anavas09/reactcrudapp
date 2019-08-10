import React from 'react';
import PropTypes from 'prop-types';

function Error({message}){
    return (
        <p className="alert alert-danger p3 my-5 text-center text-uppercase font-weight-bold">
            {message}
        </p>
    );
};

Error.propTypes = {
    message: PropTypes.string.isRequired,
};

export default Error;