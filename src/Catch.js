import React from 'react';

class Catch extends React.Component {
    render() {

        if(this.props.catch.length === 0){
            return null;
        }

        return (
            <ul>
            <h2>Pokedex</h2>
                {
                    this.props.catch.map((name) => (
                        <li key={name}>
                            <img src="https://veekun.com/dex/media/items/poke-ball.png" alt="pokeball"/> 
                            <div>
                                <a href="#" onClick={(e) => this.onSaveClick(e, name)}>
                                    {name}
                                </a>
                            </div>
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
}
export default Catch;
