import React, {Component, Fragment} from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            list: []
        }
    }

    render() {
        return (
            <Fragment>
                <div>
                    {/*这是注释*/}
                    <label htmlFor="insertArea">点我一下</label>
                    <input type="text" id={'insertArea'} value={this.state.inputValue}
                           onChange={this.handleInputChange.bind(this)}/>
                    <button onClick={this.handleBtnClick.bind(this)}>提交</button>
                </div>
                <ul>
                    {
                        this.state.list.map((item, index) => {
                            return (
                                <TodoItem
                                    content={item}
                                    index={index}
                                    handleDeleteItem={this.handleItemDelete.bind(this)}
                                />
                            )
                        })
                    }
                </ul>
            </Fragment>
        )
    }

    handleInputChange(e) {
        this.setState({
            // 这是注释
            inputValue: e.target.value
        })
    }

    handleItemDelete(index) {
        const list = [...this.state.list];
        console.log(list);
        list.splice(index, 1);
        console.log(list);
        this.setState({
            list: list,
        })
    }

    handleBtnClick() {
        this.setState({
            list: [...this.state.list, this.state.inputValue]
        })
    }
}


export default TodoList;