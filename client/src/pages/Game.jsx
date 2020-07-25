import React from 'react';

const Game = ({name, gameId}) => {
    const event = gameId ? 'Join Game' : 'Create Game';
    console.log(`${name} wants to ${event}`)
    return(
    <div>
        Game
    </div>
    )
}

export default Game;