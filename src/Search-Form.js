import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

// https://github.com/sindresorhus/pokemon
import PokemonNames from './pokemon-names.json';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: PokemonNames
        };
    }
    
    render() {
            return (
                <div>
                <AutoComplete
                  hintText="Search by Name"
                  dataSource={this.state.dataSource}
                  onUpdateInput={this.handleUpdateInput}
                  filter={AutoComplete.caseInsensitiveFilter}
                  maxSearchResults={5}
                  onNewRequest={(queryValue) => this.onSearch(queryValue)}
                /> 
                <RaisedButton primary={true} label="Go!" type="submit" />
                </div>
            );
    }

    onSearch(queryValue){
        //var queryValue = this.refs.query.value;

        this.props.onSearch(queryValue.toLowerCase() + "/"); 
    }
}

export default SearchForm;
