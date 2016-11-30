import React, { Component } from 'react';
import './App.css';
import Heading from './Heading.js';
import SearchForm from './Search-Form.js';

var BEGINNING_URL = 'http://pokeapi.co/api/v2/pokemon/';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
            <Heading />
        </div>
            <SearchForm 
                onSearch={(pokemon) => this.searchPokemon(pokemon)}
            />
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
            this.setState({

            });
        });
    }
  
}

export default App;
