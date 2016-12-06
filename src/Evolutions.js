// shows evolutions for a pokemon

import React from 'react';

class Evolutions extends React.Component {
    render() {
            return (
                <div> 
                    <h2>Evolutions of {this.props.name}</h2>
                    {
                        this.props.evoPaths.map((evolutions) => (
                         <img key={evolutions.name} alt="pokemon sprite" src={evolutions.spritePath} />
                        ))
                    }
                </div>
            );
    }
}

export default Evolutions;
