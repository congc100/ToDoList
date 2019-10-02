import React, { Component } from 'react'
import TodoItem from './TodoItem'

class TodoList extends Component {
    render() {
        let todos = this.props.todos
        return (
            <ul>
                {todos.map(t => (
                    <li key={t.id}>
                        {/*实际上对于每一个 Todo, 都通过 TodoItem 来处理*/}
                        <TodoItem todo={t} onUpdate={this.props.onUpdate} onDelete={this.props.onDelete}/>
                    </li>
                ))}
            </ul>
        )
    }
}

export default TodoList
