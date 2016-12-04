import React from 'react';

class Catch extends React.Component {
    render() {
        return (
            <ul>
                {
                    this.props.catch.map((name) => (
                        <li key={name}>
                            <a href="#" onClick={(e) => this.onSaveClick(e, name)}>
                                {name}
                            </a>
                        </li>
                    ))
                }
            </ul>
        );
    }


    onSaveClick(e, name) {
            e.preventDefault();

            this.props.onClick(name);
    }
}
export default Catch;
