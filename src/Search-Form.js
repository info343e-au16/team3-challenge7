import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class SearchForm extends React.Component {
    render() {
            return (
                <form onSubmit={(e) => this.onSearch(e)}>  
                    <div className="col-lg-6">
                        <div className="input-group">
                            <input type="text" ref="query" className="form-control" placeholder="Search for Pokemon"/>
                            <div className="input-group-btn">
                                <RaisedButton label="Go!" type="submit" />
                            </div>
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
