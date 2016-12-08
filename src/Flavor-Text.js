// shows flavor text for a pokemon

import React from 'react';

class FlavorText extends React.Component {
    render() {
            return (
                <div className="container"> 
                    <p>{this.props.flavorText}</p>
                </div>
            );
    }
}

export default FlavorText;
