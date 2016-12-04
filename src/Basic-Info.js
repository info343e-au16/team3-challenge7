import React from 'react';
class BasicInfo extends React.Component {
    render() {
            return (
                <div> 
                    <h2>No. {this.props.id} | {this.props.name}</h2>
                
                    <img alt={this.props.name + " sprite"} src={this.props.spritePath} />
                
                    <div>
                    {
                        this.props.types.reverse().map((types) => (
                         <img key={this.props.id + types.type.name} alt={types.type.name + " type"} src={"https://veekun.com/dex/media/types/en/" + types.type.name + ".png"} />
                        ))
                    }
                    </div>

                    <p>Height: {this.props.height} | Weight: {this.props.weight}</p>
                    
                    <audio controls src={"https://veekun.com/dex/media/pokemon/cries/" + this.props.id + ".ogg"}></audio>

                     <button onClick={(e) => this.catch(e)}>
                        Catch!
                    </button>
                        
                </div>
            );
    }
    
    catch(e) {
        this.props.onCatch(this.props.name);
    }
}
export default BasicInfo;
