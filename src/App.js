import React, { Component } from 'react';
import './App.css';
import Heading from './Heading.js';
import SearchForm from './Search-Form.js';
import BasicInfo from './Basic-Info.js';
import Evolutions from './Evolutions.js';
import FlavorText from './Flavor-Text.js';

var BASE_URL = 'http://pokeapi.co/api/v2/';
var BEGINNING_URL = BASE_URL + 'pokemon/';
var SPECIES_URL = BASE_URL + 'pokemon-species/';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            flavorText: null,
            evoPaths: null
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
                {
                    this.state.flavorText ? (
                        <FlavorText
                            flavorText={this.state.flavorText}
                        />
                    ) : null
                }
                {
                    this.state.evoPaths ? (
                        <Evolutions
                            id={this.state.id} 
                            name={this.state.name}
                            evoPaths={this.state.evoPaths}
                        />
                    ) : null
                }
        </div>
        );
    }

    fetchUrl(url) {
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            var id = json.id;
            var name = this.capitalizeFirstLetter(json.forms[0].name);
            var spritePath = json.sprites.front_default;
            var types = json.types;
            var height = (json.height / 10) + "m";
            var weight = (json.weight / 10) + "kg";
            this.setState({
                id: id,
                name: name,
                spritePath: spritePath,
                types: types,
                height: height,
                weight: weight
            });
        });
    }

    addSprite(url, paths) {
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            var spritePath = json.sprites.front_default;
            var name = json.forms[0].name;
            paths.push({spritePath: spritePath, name: name});
        });
        return paths;
    }

    findEvolutions(chain) {
        var evoPaths = [];
        if (chain.species) {
            if (chain.species.name) {
                var first = BEGINNING_URL + chain.species.name;
                this.evoPaths = this.addSprite(first, evoPaths);
                // check for 2nd evolution
                if (chain.evolves_to) {
                    if (chain.evolves_to[0].species) {
                        var second = BEGINNING_URL + chain.evolves_to[0].species.name;
                        this.evoPaths = this.addSprite(second, evoPaths);
                        // check for 3rd evolution
                        if (chain.evolves_to.evolves_to) {
                            if (chain.evolves_to.evolves_to[0].species) {
                                var third = BEGINNING_URL + chain.evolves_to.evolves_to[0].species.name;
                                this.evoPaths = this.addSprite(third, evoPaths);
                                // check for 4th generation {
                                if (chain.evolves_to.evolves_to.evolves_to) {
                                    if (chain.evolves_to.evolves_to.evolves_to[0].species) {
                                        var fourth = BEGINNING_URL + chain.evolves_to.evolves_to.evolves_to[0].species.name;
                                        this.evoPaths = this.addSprite(fourth, evoPaths);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        this.setState({
            evoPaths: evoPaths
        });
        console.log(evoPaths);
        console.log(evoPaths[0]);
    }
    
    fetchEvoUrl(url) {
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            if (json.chain) {
                this.findEvolutions(json.chain);
            }
        });
    }

    fetchSpeciesUrl(url) {
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            if (json.flavor_text_entries[1]) {
                var flavorText = json.flavor_text_entries[1].flavor_text;
                this.setState({
                    flavorText: flavorText
                });
            }
            if (json.evolution_chain) {
                var evoUrl = json.evolution_chain.url;
                this.fetchEvoUrl(evoUrl);
            }
        });
    }
  
    searchPokemon(pokemon) {
        var url = BEGINNING_URL + pokemon;
        var speciesUrl  = SPECIES_URL + pokemon;

        this.fetchUrl(url);
        this.fetchSpeciesUrl(speciesUrl);

    }

    //http://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
  
}

export default App;
