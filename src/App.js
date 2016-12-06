import React, { Component } from 'react';
import './App.css';
import Heading from './Heading.js';
import SearchForm from './Search-Form.js';
import BasicInfo from './Basic-Info.js';
import Evolutions from './Evolutions.js';
import FlavorText from './Flavor-Text.js';
import Stats from './Stats.js';
import Catch from './Catch.js';
import Footer from './Footer.js'

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';

var BASE_URL = 'http://pokeapi.co/api/v2/';
var BEGINNING_URL = BASE_URL + 'pokemon/';
var SPECIES_URL = BASE_URL + 'pokemon-species/';

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500,
    },
});

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            catch: [],
            flavorText: null,
            evoPaths: null
        };
    }
    
    componentDidMount() {
        var catchJSON = localStorage.getItem('catchPokemon');
        var catchPokemon = JSON.parse(catchJSON);

        if (catchPokemon) {
            this.setState({
                catch: catchPokemon
            });
        }
    }
    
    render() {
        return (
        <MuiThemeProvider muiTheme={muiTheme}>
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
                            onCatch={(name) => this.catchPokemon(name)}
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
                    this.state.stats ? (
                        <Stats
                            id={this.state.id}
                            stats={this.state.stats}
                        />
                    ) : null
                }
                {
                    this.state.evoPaths ? (
                        <Evolutions
                            id={this.state.id} 
                            name={this.state.name}
                            evoPaths={this.state.evoPaths}
                            onPokeClick={(name) => this.searchPokemon(name)}
                        />
                    ) : null
                }
               
                        <Catch
                            catch={this.state.catch}
                            onClick={(name) => this.searchPokemon(name.toLowerCase())}
                        /> 
                
            
                {
                    this.state.name ? (
                        <Footer />
                    ) : null
                }
          </div>
      </MuiThemeProvider>
        );
    }
  
    catchPokemon(name) {
        var catched = this.state.catch;
                
        if (catched.indexOf(name) < 0) {
            catched.push(name);

            this.setState({
                catch: catched
            });

            var catchedJson = JSON.stringify(catched);
            localStorage.setItem('catchPokemon', catchedJson);
        }
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
            var stats = this.calculateTotalStats(json.stats);
            console.log(stats);
            this.setState({
                id: id,
                name: name,
                spritePath: spritePath,
                types: types,
                height: height,
                weight: weight,
                stats: stats 
            });
        });
    }

    // Returns an array with all of the stats from the api, plus value of all the stats
    calculateTotalStats(stats) {
        var totalValue = 0;
        
        // Calculates the total stat value of the pokemon
        for (var i=0; i < stats.length; i++) {
            totalValue += stats[i].base_stat;
        }
        
        // Creates new object to be added to stats array
        var totalStat = {
            "base_stat": totalValue,
            "effort": 0,
            "stat": {"name": "total" }
        }
        
        // Adds the total stat object to the start of the stats array
        stats.unshift(totalStat);
        return stats;
    }

    addSprite(url) {
        return fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            var spritePath = json.sprites.front_default;
            var name = json.forms[0].name;

            // pichu case since name is weird in API
            if (name === 'pichu-spiky-eared') {
                name = 'pichu';
            }

            return {
                spritePath: spritePath,
                name: name
            }
        });
    }

    findEvolutions(chain) {
        var evoPaths = [];
        if (chain.species) {
            if (chain.species.name) {
                var first = BEGINNING_URL + chain.species.name;

                this.addSprite(first)
                .then((path) => {
                    evoPaths.push(path);
                }).then(() => {
                    // check for 2nd evolution
                    if (chain.evolves_to) {
                        if (chain.evolves_to[0].species) {
                            var second = BEGINNING_URL + chain.evolves_to[0].species.name;

                            return this.addSprite(second)
                            .then((path) => {
                                evoPaths.push(path);
                            });
                        }
                    }
                }).then(() => {
                    // check for 3rd evolution
                    if (chain.evolves_to[0].evolves_to) {
                        if (chain.evolves_to[0].evolves_to[0].species) {
                            var third = BEGINNING_URL + chain.evolves_to[0].evolves_to[0].species.name;

                            return this.addSprite(third)
                            .then((path) => {
                                evoPaths.push(path);
                            });
                        }
                    }
                }).then(() => {
                    this.setState({
                        evoPaths: evoPaths
                    });
                })
            }
        }
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
        console.log(url);
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
        this.setState({
            evoPaths: null
        })

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
