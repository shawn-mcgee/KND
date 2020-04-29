const server = require('http').createServer(handle)
const io     = require('socket.io')(server)
const fs     = require('fs')

const port = 80
const addr = '0.0.0.0'

server.listen(port, addr, () => {
    
})

io.on('connection', (socket) => {
    socket.emit('message', 'Hello World')
})

function handle (req, res) {
    fs.readFile('.' + req.url, (err, out) => {
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
}