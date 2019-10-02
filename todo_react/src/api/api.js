const _ajax = (method, url, data) => {
    let p = new Promise((resolve) => {
        let r = new XMLHttpRequest()
        r.open(method, url, true)
        r.setRequestHeader('Content-Type', 'application/json')
        r.onreadystatechange = () => {
            if (r.readyState === 4) {
                resolve(r.response)
            }
        }
        if (method === 'POST') {
            data = JSON.stringify(data)
        }
        console.log('data', data, typeof data)
        r.send(data)
    })
    return p
}


class Api {
    constructor(baseUrl) {
        this.baseUrl = baseUrl || 'http://localhost:8000/api/todo'
    }

    get(path) {
        let method = 'GET'
        let url = this.baseUrl + path
        let p = _ajax(method, url, '').then((r) => {
            let t = JSON.parse(r)
            return t
        })
        return p
    }

    post(path, data) {
        let method = 'POST'
        let url = this.baseUrl + path
        let p = _ajax(method, url, data).then((r) => {
            let t = JSON.parse(r)
            return t
        })
        return p
    }
}

export default Api
