import React, { Component } from 'react';
import Order from '../../components/Order/CheckOutSummary/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';

 class Orders extends Component {
    state ={
        orders:[],
        loading:true
    }
    componentDidMount (){
        axios.get('/orders.json')
              .then(res=>{
              const fetchorders =[];
              for(let key in res.data){
                  fetchorders.push({
                      ...res.data[key],
                      id: key
                  });
              }
              this.setState({loading:false ,orders:fetchorders});

              })
              .catch(err =>{
                this.setState({loading:false});

              });

    }
    render() {

        return (
            <div>
                {this.state.orders.map(orders =>(
                    <Order 
                    key={orders.id}
                    ingredients={orders.ingredients}
                    price={orders.price} />
                ))}
                
                
                
            </div>
        )
    }
}
export default withErrorHandler(Orders,axios);

