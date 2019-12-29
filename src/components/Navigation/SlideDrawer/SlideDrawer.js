import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SlideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../Hoc/Aux';

const SlideDrawer = (props) =>
{
    let attachedClasses =[classes.SlideDrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.SlideDrawer, classes.Open];
    }

    
    return(
        <Aux>
         <Backdrop show ={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
            <div className={classes.Logo}>
            <Logo/>
            </div>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
        </Aux>
    );

};
export default SlideDrawer;