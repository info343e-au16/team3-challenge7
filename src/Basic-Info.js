import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class BasicInfo extends React.Component {
    render() {
            return (
                <div> 
                    <h2>No. {this.props.id} | {this.props.name}</h2>
                
                    <img alt={this.props.name + " sprite"} src={this.props.spritePath} />
                
                    <div>
                    {
                        this.props.types.map((types) => (
                         <img key={this.props.id + types.type.name} alt={types.type.name + " type"} src={"https://veekun.com/dex/media/types/en/" + types.type.name + ".png"} />
                        ))
                    }
                    </div>

                    <p>Height: {this.props.height} | Weight: {this.props.weight}</p>
                    
                    <audio controls src={"https://veekun.com/dex/media/pokemon/cries/" + this.props.id + ".ogg"}></audio>
                    <div>
                     <RaisedButton secondary={true} label="Catch!"
                            onClick={(e) => this.catch(e)} />
                     </div>
                </div>
            );
    }

    catch(e) {
        this.props.onCatch(this.props.name);
    }
}

export default BasicInfo;
