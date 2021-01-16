import React from 'react';
import "../styles/cardBattle.css"

const CardBattle = ({playedCard, opponentCard}) => {



    return (
        <div>
            <Card name={playedCard}/>
            <div>V.S</div>
            <Card />
        </div>

    )

}

export {CardBattle};