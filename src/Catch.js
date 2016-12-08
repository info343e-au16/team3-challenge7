import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Row, Col } from 'react-materialize';

class Catch extends React.Component {
    render() {

        if(this.props.catch.length === 0){
            return null;
        }

        return (
            <div className="container">
                <ul>
                <h2>My Pokemon</h2>
                <Row>
                    {
                        this.props.catch.map((name) => (
                            <Col s={4} m={6}>
                            <li key={name}>
                                <img src="https://veekun.com/dex/media/items/poke-ball.png" alt="pokeball"/> 
                                <div>
                                    <a href="#" onClick={(e) => this.onSaveClick(e, name)}>
                                        {name}
                                    </a>
                                </div>
                                <RaisedButton secondary={true} className="button" label="Release" onClick={(e) => this.onDeleteClick(name)} />
                            </li></Col>
                        ))
                    }
                    </Row>
                </ul>
            </div>
        );
    }

    onSaveClick(e, name) {
            e.preventDefault();

            this.props.onClick(name);
    }

     onDeleteClick(name) {
         this.props.onDeleteClick(name);
     }
}
export default Catch;
