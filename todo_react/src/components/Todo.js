import React, { Component } from 'react'
import Menu from './Menu'
import TodoList from './TodoList'
import TodoCounter from './TodoCounter'
import TodoApi from '../api/todo'

import './todo.css'

// Todo 组件是我们的主要组件
// 用来渲染 todo 相关内容
class Todo extends Component {
    constructor(props) {
        super(props)
        this.api = new TodoApi()
        this.state = {
            todos: [],
            text: '',
        }
        // 提前绑定好四个方法的 this
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onUpdate = this.onUpdate.bind(this)
        this.onDelete = this.onDelete.bind(this)
    }

    // ajax 请求要放在 componentDidMount 生命周期中
    // 这样获取数据后就可以调用 setState 更新 UI
    componentDidMount() {
        this.api.all().then(r => {
            // 获取数据后在回调函数中更新 todos 的值
            this.setState({
                todos: r,
            })
        })
    }

    onUpdate(todo) {
        let todos = this.state.todos
        let t = todos.find(e => e.id === todo.id)
        t.done = todo.done
        this.setState({
            todos: todos,
        })
    }

    onDelete(id) {
        let todos = this.state.todos
        let index = todos.findIndex(e => e.id === id)
        todos.splice(index, 1)
        this.setState({
            todos: todos,
        })
    }

    render() {
        let todos = this.state.todos
        let path = this.props.match.path
        return (
            <div>
                <Menu path={path}/>
                <h3>TODO</h3>
                {/*onUpdate 和 onDelete 是用来解决组件间通信的方案*/}
                <TodoList todos={todos} onUpdate={this.onUpdate} onDelete={this.onDelete}/>
                {/*下面这个组件用来处理 todo 相关统一信息*/}
                <TodoCounter todos={todos}/>
                <form onSubmit={this.onSubmit}>
                    {/*for 是 js 关键字, jsx 里面要使用 htmlFor 属性*/}
                    <label htmlFor="new-todo">
                        输入事项
                    </label>
                    <input
                        id="new-todo"
                        onChange={this.onChange}
                        value={this.state.text}
                    />
                    <button>
                        添加第 {todos.length + 1} 个 todo
                    </button>
                </form>
            </div>
        )
    }

    onChange(e) {
        this.setState({
            text: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.state.text.length === 0) {
            return
        }
        let task = this.state.text
        let data = {
            task,
        }
        let todos = this.state.todos
        this.api.add(data).then((r) => {
            todos.push(r)
            this.setState({
                todos: todos,
                text: '',
            })
        })
    }
}

export default Todo
