import React, { Component } from 'react';

class TodoItem extends Component{

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <div
                onClick={this.handleClick}
                key={this.props.index}
            >
                {this.props.content}
            </div>
        )
    }

    handleClick() {
        this.props.handleDeleteItem(this.props.index);
    }
}
export default TodoItem;