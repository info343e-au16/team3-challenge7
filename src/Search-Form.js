import React from 'react';

class SearchForm extends React.Component {
    render() {
            return (
                <form onSubmit={(e) => this.onSearch(e)}>  
                    <div>
                        <input type="text" ref="query" placeholder="Search for Pokemon"/>
                        <div>
                            <button type="submit">Go!</button>
                        </div>
                    </div>
                </form>
            );
    }

    onSearch(e){
        e.preventDefault();

        var queryValue = this.refs.query.value;

        this.props.onSearch(queryValue); 
    }
}

export default SearchForm;
