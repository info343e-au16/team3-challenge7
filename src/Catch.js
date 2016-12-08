import React from 'react';

class Catch extends React.Component {
    render() {

        if(this.props.catch.length === 0){
            return null;
        }

        return (
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
                            <button id="delete-button" onClick={() => this.onDeleteClick(name)}>Delete</button>
                        </li>
                    ))
                }
            </ul>
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
