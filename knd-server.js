const http = require('http')
const fs   = require('fs')

const port = 80
const addr = '0.0.0.0'
const home = '/index.html'

const server = http.createServer((req, res) => {
    var file = './knd-client'
    if(req.url === '/')
        file += home
    else
        file += req.url

    fs.readFile(file, (err, out) => {
        if(err) {
            res.writeHead(404)
            res.end()
            return
        } else {
            res.writeHead(200)
            res.write(out)
            res.end()
        }
    })
})

server.listen(port, addr, () => {

})