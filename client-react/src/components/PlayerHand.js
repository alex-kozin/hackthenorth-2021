import React, {useState, useEffect} from 'react';
import {Card} from "./Card";
import "../styles/playerHand.css";

const PlayerHand = ({active, cards, onSelect}) => {

    const cardComponents = cards.map(({name, image, price, stars, reviews}, index) => 
    {return <Card 
            name={name}
            image={image} 
            price={price} 
            stars={stars} 
            reviews={reviews} 
            active={active} 
            onSelect={() => onSelect(index)}/>})


    return (
        <div class="hand-container">
            {cardComponents}
        </div>
    )
}
export {PlayerHand};