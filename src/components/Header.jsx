import React from 'react';
import { NavLink } from 'react-router-dom';

function Header(){
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <NavLink to="/" className="navbar-brand" >
                    React CRUD & Routing
                </NavLink>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/products-list">Products</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/products/new">Add</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;