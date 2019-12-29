import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import './App.css';
import CheckOut from  './containers/CheckOut/Checkout';
import Orders from './containers/Orders/Orders';
//import CheckOut from './containers/CheckOut/CheckOut';


function App() {
  return (
    <div>
         <Layout>
           <Switch>
           <Route path="/checkout" component={CheckOut} />
           <Route path="/orders" component={Orders} />
           <Route path="/" exact component={BurgerBuilder} />
           <CheckOut/>
           </Switch>
          
         </Layout>
        
    </div>
  );
}

export default App;
