const app = require('http').createServer(handle)
const io  = require('socket.io')(app)
const fs  = require('fs')

var raw = fs.readFileSync('./server.json')
var cfg = JSON.parse(raw)

const port = (cfg.port ? cfg.port :         80)
const addr = (cfg.addr ? cfg.addr :  '0.0.0.0')
const motd = (cfg.motd ? cfg.motd.trim() : 'Welcome to KND!')

const root = './public'
const home = '/client.html'

app.listen(port, addr, () => {
    console.log('Listening on /' + addr + ':' + port)
})

io.on('connection', (socket) => {
    if(motd !== '')
        socket.emit('rx_message', motd)
    socket.on('tx_message', (message) => {
        socket.          emit('tx_message', message)
        socket.broadcast.emit('rx_message', message)
    })
})

function handle (req, res) {
    var path = root
    if(req.url === '/')
        path += home
    else
        path += req.url

    if(path.includes("..") || path.includes("~")) {
        res.writeHead(404)
        res.end()
        return
    }

    fs.readFile(path, (err, out) => {
        if(err) {
            res.writeHead(404)
            res.end()
        } else {
            res.writeHead(200)
            res.write(out)
            res.end()
        }
    })
}