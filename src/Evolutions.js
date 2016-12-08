// shows evolutions for a pokemon

import React from 'react';

class Evolutions extends React.Component {
    render() {
            return (
                <div className="container"> 
                    <h2>Evolutions of {this.props.name}</h2>
                    {
                        this.props.evoPaths.map((evolutions) => (
                            <img key={evolutions.name} className='evoSprite' onClick={(e) => this.onPokeClick(e, evolutions.name)} alt="pokemon sprite" src={evolutions.spritePath} />
                        ))
                    }
                </div>
            );
    }

    onPokeClick(e, name){
        e.preventDefault();

        this.props.onPokeClick(name); 
    }
}

export default Evolutions;
