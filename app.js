var BEGINNING_URL = 'http://pokeapi.co/api/v2/';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            saved: []
        };
    }
    
    componentDidMount() {
        var savedPokemonJSON = localStorage.getItem('saveCart');
        var savedPokemon = JSON.parse(saveCartJSON);

        if (saveCart) {
            this.setState({
                saved: savedPokemon
            });
        }
    }

    render() {
        return (

        );
    }
    
    searchPokemon() {
        var url = BEGINNING_URL;

        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {

            this.setState({

            });
        });
}

}

var app = document.getElementById('app');

ReactDOM.render(<App />, app);
