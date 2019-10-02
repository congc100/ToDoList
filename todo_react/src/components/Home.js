import React, { Component } from 'react'
import Menu from './Menu'

class Home extends Component {
    render() {
        let path = this.props.match.path
        return (
            <div>
                {/*Home 组件中渲染 Menu 组件*/}
                <Menu path={path}/>
                点击上面的链接
            </div>
        )
    }
}

export default Home
