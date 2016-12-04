import React, { Component } from 'react';
import './App.css';
import Heading from './Heading.js';
import SearchForm from './Search-Form.js';
import BasicInfo from './Basic-Info.js';
import Catch from './Catch.js';

var BEGINNING_URL = 'http://pokeapi.co/api/v2/pokemon/';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            catch: []
        };
    }

    componentDidMount() {
        var catchJSON = localStorage.getItem('catch');
        var catchPokemon = JSON.parse(catchJSON);


        if (catchPokemon) {
            this.setState({
                catch: catchPokemon
            });
        }
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
                        onCatch={(name) => this.catchPokemon(name)}
                    />
                ) : null
            }

            {
                this.state.name ? (
                    <Catch
                        catch={this.state.catch}
                        onClick={(name) => this.searchPokemon(name.toLowerCase())}
                    /> 
                ) : null
            }
      </div>

    );
  }
  
    catchPokemon(name){
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
            console.log(this.state);
        });
    }

    //http://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
  
}

export default App;
