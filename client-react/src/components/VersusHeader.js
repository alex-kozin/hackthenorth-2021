import React from 'react';
import "../styles/versusHeader.css";

const VersusHeader = ({username, opponentName}) => {

    return (
        <div class="header-container">
            <div class="username">
                {username}
            </div>

            <div class="vs">V.S</div>

            <div class="opponent">
                {opponentName}
            </div>
        </div>
    )
}

export {VersusHeader};