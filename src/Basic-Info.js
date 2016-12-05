import React from 'react';

class BasicInfo extends React.Component {
    render() {
            return (
                <div> 
                    <h2>NO. {this.props.id} | {this.props.name}</h2>
                
                    <img alt="pokemon sprite" src={this.props.spritePath} />
                
                    {
                        this.props.types.map((types) => (
                         <img key={this.props.id + types.type.name} alt="pokemon type" src={"https://veekun.com/dex/media/types/en/" + types.type.name + ".png"} />
                        ))
                    }

                    <p>Height: {this.props.height} | Weight: {this.props.weight}</p>
                    
                    <audio autoPlay controls src={"https://veekun.com/dex/media/pokemon/cries/" + this.props.id + ".ogg"}></audio>
                    <div>
                     <button
                            onClick={(e) => this.catch(e)}
                        >Catch!</button>
                     </div>
                </div>
            );
    }

    catch(e) {
        this.props.onCatch(this.props.name);
    }
}

export default BasicInfo;
