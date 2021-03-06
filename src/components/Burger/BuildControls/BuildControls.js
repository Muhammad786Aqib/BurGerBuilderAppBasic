import React  from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl';

const controls =[
    {label:'salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'},

    ];


const BuildControls = (props) => {
    
          return(
        
            <div className={classes.BuildControls}>
                <p>CurrentPrice:<strong>{props.price.toFixed(2)}</strong></p>
                {controls.map(ctr =>(
                    <BuildControl 
                    key  = {ctr.label} 
                    label={ctr.label} 
                    added={()=>props.ingredientAdded(ctr.type)}
                    removed={()=>props.ingredientRemove(ctr.type)}
                    disabled={props.disabled[ctr.type]}/>
                    
                ))}
                <button 
                 className={classes.OrderButton}
                 disabled={!props.purchasable}
                 onClick={props.ordered}>ORDER NOW</button>
            </div>
          );
    }
export default BuildControls;
