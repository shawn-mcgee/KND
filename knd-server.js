const app = require('http').createServer(handle)
const io  = require('socket.io')(app)
const fs  = require('fs')

var raw = fs.readFileSync('./knd-server.json')
var cfg = JSON.parse(raw)

const port = (cfg.port ? cfg.port :        80)
const addr = (cfg.addr ? cfg.addr : '0.0.0.0')
const home = '/knd-client.html'

app.listen(port, addr, () => {
    console.log('Listening on /' + addr + ':' + port)
})

io.on('connection', (socket) => {
    socket.emit('message', 'Hello World')
})

function handle (req, res) {
    var path = '.'
    if(req.url === '/')
        path += home
    else
        path += req.url
    fs.readFile(path, (err, out) => {
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