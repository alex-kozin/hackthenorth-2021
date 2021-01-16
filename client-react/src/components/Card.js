import React from 'react';
import '../styles/cards.css'

const Card = ({name, image, price, stars, reviews, active, onSelect}) => {

    return (
    <div class={active ? "card-container" : "card-container inactive"} onClick={active ? onSelect : () => null}>
            <div class="title">{name}</div>
            <div class="stats-centering">
                <div class="stats-container">
                    <img class="card-image" src={image}/>
                    
                    <div class="stat-box">
                        <div class="stat price">
                            <div class="stat-value name">
                                Price: 
                            </div>
                            <div class="stat-value">
                                {price}
                            </div>
                        </div>

                        <div class="stat stars">
                            <div class="stat-value name">
                                Stars: 
                            </div>
                            <div class="stat-value">
                                {stars}
                            </div>
                        </div>

                        <div class="stat reviews">
                            <div class="stat-value name">
                                Reviews: 
                            </div>
                            <div class="stat-value">
                                {reviews}
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
    </div>
    )
}

export {Card}