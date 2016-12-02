import React from 'react';

class BasicInfo extends React.Component {
    render() {
            return (
                <div> 
                    <h2>NO. {this.props.id} | {this.props.name}</h2>
                    <img alt="pokemon sprite" src={this.props.spritePath} />
                    <p>Height: {this.props.height} | Weight: {this.props.weight}</p>
                    <audio autoPlay controls src={"https://veekun.com/dex/media/pokemon/cries/" + this.props.id + ".ogg"}></audio>
                </div>
            );
    }
}

export default BasicInfo;
