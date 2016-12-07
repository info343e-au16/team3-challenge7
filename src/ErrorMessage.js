import React from 'react';

class ErrorMessage extends React.Component {
    render() {
        return (
            <div className='error'> 
                <p>{this.props.message}</p>
            </div>
        );
    }
}

export default ErrorMessage;
