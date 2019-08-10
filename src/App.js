import React, { Fragment, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import AddProduct from './components/AddProduct';
import Products from './components/Products';
import EditProduct from './components/EditProduct';
import Product from './components/Product';
import Header from './components/Header';
import axios from 'axios';

function App() {

  const [products, setProducts] = useState([]);
  const [refreshProducts, setRefreshProducts] = useState(true);
  
  useEffect(()=>{

      if(refreshProducts){
        const fetchAPI = async () => {
          await axios.get('http://localhost:4000/restaurant')
                  .then(res => {
                    console.log(res.data);
                    setProducts(res.data);
                  })
                  .catch(err => {
                    console.error(err);
                  })
        }
        fetchAPI();

        setRefreshProducts(false)
      }
  },[refreshProducts])

  return (
    <Fragment>
      <Router>
        <Header />
        <main className="container mt-5">
          <Switch>
            <Route
              exact path="/products-list"
              render={()=> {
                return(
                  <Products
                    products={products}
                    setRefreshProducts={setRefreshProducts}
                  />
                )
              }}
            />
            <Route
              exact path="/products/new"
              render={()=> {
                return(
                  <AddProduct setRefreshProducts={setRefreshProducts}/>
                )
              }}
            />
            <Route exact path="/products/:id" component={Product} />
            <Route
              exact path="/products/edit/:id"
              render={(props)=> {
                //Tomar el ID del producto
                const productID = parseInt(props.match.params.id);
              
                //El producto que se pasará al state
              
                const product = products.filter(product => product.id === productID)
                return(
                  <EditProduct
                    product={product[0]}
                    setRefreshProducts={setRefreshProducts}
                  />
                )
              }}
            />
          </Switch>
        </main>
        <p className="mt-4 p2 text-center">Todos los derechos reservados</p>
      </Router>
    </Fragment>
  );
}

export default App;
