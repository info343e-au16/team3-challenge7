var BEGINNING_URL = 'http://pokeapi.co/api/v2/pokemon/';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            saved: []
        };
    }
    
    componentDidMount() {
        var savedPokemonJSON = localStorage.getItem('saveCart');
        var savedPokemon = JSON.parse(savedPokemonJSON);

        if (savedPokemon) {
            this.setState({
                saved: savedPokemon
            });
        }
    }

    render() {
        return (
            <div className="container">
                <SearchForm 
                    onSearch={(pokemon) => this.searchPokemon(pokemon)}

                />
            </div>
        );
    }
    
    onSearch(e) {
         e.preventDefault();
        
         var queryValue = this.refs.query.value;
        
         this.searchPokemon(queryValue);
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

var app = document.getElementById('app');

ReactDOM.render(<App />, app);
