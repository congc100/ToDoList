import Api from './api'

class TodoApi extends Api {
    add(data) {
        let path = '/add'
        let p = this.post(path, data)
        return p
    }

    delete(todoId) {
        let path = '/delete/' + String(todoId)
        let p = this.get(path)
        return p
    }

    update(todoId, data) {
        let path = '/update/' + String(todoId)
        let p = this.post(path, data)
        return p
    }

    all() {
        let path = '/all'
        let p = this.get(path)
        return p
    }

    detail(todoId) {
        let path = '/' + String(todoId)
        let p = this.get(path)
        return p
    }
}

export default TodoApi
