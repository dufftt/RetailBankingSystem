import React, {Component} from 'react';

class Card extends Component {
    render() {
        return (
            <div className="border border-gray-500 rounded p-5">
                {this.props.children}
            </div>
        );
    }
}

export default Card;