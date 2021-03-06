import React, { Component } from 'react';
import Aux from '../../Hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../Hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';


const INGREDIENTS_PRICE = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7,
};

 class BurgerBuilder extends Component {
     state = {
         ingredients:{
             salad:0,
             bacon:0,
             cheese:0,
             meat:0
         },
         totalPrice : 0,
         purchasable:false,
         purchasing:false,
         loading:false,
         error:false

        }
        componentDidMount (){
            axios.get('https://react-my-burger-ca3b5.firebaseio.com/ingredients.json')
                 .then(response =>{
                    this.setState({ingredients:response.data});
                 })
                 .catch(error =>{
                     this.setState({error:true})
                 });
        }
        updatePurchaseState(ingredients){
            //const ingredients ={
              //  ...this.state.ingredients
            //};
            const sum = Object.keys(ingredients)
              .map(igKey=>{
                  return ingredients[igKey]
              })
              .reduce((sum,el)=>{
                  return sum + el;


              },0);
              this.setState({purchasable:sum >0});
        }
        addIngredientHandler =(type) =>{
            const oldCount = this.state.ingredients[type];
            const updateCount = oldCount + 1;
            const updateIngredients ={
                ...this.state.ingredients
            };
            updateIngredients[type] = updateCount;
            const priceAddition = INGREDIENTS_PRICE[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice + priceAddition;
            this.setState({totalPrice:newPrice,ingredients:updateIngredients});
            this.updatePurchaseState(updateIngredients);

        }

        removeIngredientHandler = (type) => {
            const oldCount = this.state.ingredients[type];
            if(oldCount <=0){
                return;
            }
            const updateCount = oldCount - 1;
            const updateIngredients ={
                ...this.state.ingredients
            };
            updateIngredients[type] = updateCount;
            const priceDeduction = INGREDIENTS_PRICE[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;
            this.setState({totalPrice:newPrice,ingredients:updateIngredients});
            this.updatePurchaseState(updateIngredients);
        }
        purchaseHandler = () => {
            this.setState({purchasing:true});
        }
        purchaseCancelHandler = () =>{
            this.setState({purchasing:false});
        }
        purchaseContinueHandler = () =>{
            
            const queryParams =[];
            for(let i in this.state.ingredients){
                queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
            }
            queryParams.push('price=' + this.state.totalPrice);
            const queryString = queryParams.join('&');
            this.props.history.push({
            pathname:'/Checkout',
            search:'?' + queryString});

        
        }

    render() {
        const disabledInfo ={
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key] <= 0
        }
        let orderSummary = null
        
        
        let burger =this.state.error ? <p>ingredients cannot be loaded!</p> : <Spinner />
        if(this.state.ingredients){
        burger=(<Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
        ingredientAdded={this.addIngredientHandler}
        ingredientRemove={this.removeIngredientHandler}
        disabled ={disabledInfo}
        price={this.state.totalPrice}
        ordered={this.purchaseHandler}
        purchasable={this.state.purchasable}/>
        </Aux>
        );
        orderSummary=<OrderSummary 
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued ={this.purchaseContinueHandler}
        price={this.state.totalPrice}
        ingredients={this.state.ingredients}/>
        if (this.state.loading){
            orderSummary=<Spinner />
}
}
            
        
        

        return (
            <Aux>
                <Modal show ={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
                
            </Aux>
        )
    }
}

export default withErrorHandler (BurgerBuilder,axios);
