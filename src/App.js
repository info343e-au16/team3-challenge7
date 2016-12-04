import React, { Component } from 'react';
import './App.css';
import Heading from './Heading.js';
import SearchForm from './Search-Form.js';
import BasicInfo from './Basic-Info.js';

var BEGINNING_URL = 'http://pokeapi.co/api/v2/pokemon/';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null
        };
    }
    
  render() {
    return (
      <div className="App">
        <div className="App-header">
            <Heading />
        </div>
            <SearchForm 
                onSearch={(pokemon) => this.searchPokemon(pokemon)}
            />
            {
                this.state.name ? (
                    <BasicInfo
                        id={this.state.id} 
                        name={this.state.name}
                        spritePath={this.state.spritePath}
                        types={this.state.types}
                        height={this.state.height}
                        weight={this.state.weight}
                    />
                ) : null
            }
      </div>
    );
  }
  
    searchPokemon(pokemon) {
        var url = BEGINNING_URL + pokemon;

        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            console.log(json);
            var id = json.id;
            var name = this.capitalizeFirstLetter(json.forms[0].name);
            var spirtePath = json.sprites.front_default;
            var types = json.types;
            var height = (json.height / 10) + "m";
            var weight = (json.weight / 10) + "kg";
            this.setState({
                id: id,
                name: name,
                spritePath: spirtePath,
                types: types,
                height: height,
                weight: weight
            });
        });
    }

    //http://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
  
}

export default App;
