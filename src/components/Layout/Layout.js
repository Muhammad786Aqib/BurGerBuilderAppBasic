import React,{Component}  from 'react';
import Aux from '../../Hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SlideDrawer from '../Navigation/SlideDrawer/SlideDrawer';

class Layout extends Component {
    state ={
        showSlideDrawer:false
    } 
    SlideDrawerCloseHandler = () =>{
        this.setState({showSlideDrawer:false});

    }
    SlideDrawerToogleHandler = () =>{
        this.setState ((prevState) => {
            return{showSlideDrawer:!prevState.showSlideDrawer};

        });
        }
    
   render(){
        return(
           <Aux>
            <Toolbar drawToogleClicked ={this.SlideDrawerToogleHandler}/>
            <SlideDrawer open={this.state.showSlideDrawer}
             closed={this.SlideDrawerCloseHandler}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
            </Aux>
            )
    
}
}

export default Layout;
