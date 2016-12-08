import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class Catch extends React.Component {
    render() {

        if(this.props.catch.length === 0){
            return null;
        }

        return (
            <div className="container">
                <ul>
                <h2>My Pokemon</h2>
                    {
                        this.props.catch.map((name) => (
                            <li key={name}>
                                <img src="https://veekun.com/dex/media/items/poke-ball.png" alt="pokeball"/> 
                                <div>
                                    <a href="#" onClick={(e) => this.onSaveClick(e, name)}>
                                        {name}
                                    </a>
                                </div>
                                <RaisedButton label="Release" onClick={(e) => this.onDeleteClick(name)} />
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }

    onSaveClick(e, name) {
            e.preventDefault();

            this.props.onClick(name);
    }

     onDeleteClick(name) {
         this.props.onDeleteClick(name);
     }
}
export default Catch;
