import React from 'react';
import classes from './GameItems.module.css';
import GameItem from './GameItem/GameItem';


const gameItems = props => {
    let games = (
        <div style={{color: 'white'}}>No results found!</div>
    );
    if(props.gamesArray.length){
        const items = Object.values(props.gamesArray);
        games = items.map(item => {
            return <GameItem loadDetails={props.loadDetails}
                             addToCart={props.addToCart}
                             key={item.id}
                             id={item.id}
                             name={item.name}
                             rating={item.rating} image={item.background_image}/>
        })
    }
    return (
        <div className={classes.GameItems}>
            {games}
        </div>
    );
}
export default React.memo(gameItems);
