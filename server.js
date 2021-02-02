const app = require('http').createServer(handle)
const io  = require('socket.io')(app)
const fs  = require('fs')

const raw = fs.readFileSync('./server.json')
const cfg = JSON.parse(raw)

const port = (cfg.port ? cfg.port :         80)
const addr = (cfg.addr ? cfg.addr :  '0.0.0.0')
const motd = (cfg.motd ? cfg.motd.trim() : 'Welcome to KND!')

const root = './public'
const home = '/client.html'

let mode = (cfg.mode ? cfg.mode :           1);
let mask = (cfg.mask ? cfg.mask : -2147483607);

const clients = new Map();

function uid32() {
    let lsb = mode & 1;
    mode >>= 1;
    if(lsb == 1)
        mode ^= mask;
    return mode;
}

app.listen(port, addr, () => {
    console.log('Listening on /' + addr + ':' + port)
})

io.on('connect', (socket) => {
    if(motd !== '')
        socket.emit('rx_message', motd)
    socket.on('uid32', (_uid32) => {
        if(!clients.has(_uid32)) {
            console.log("invalid uid32 " + _uid32)
            console.log(clients)

            let new_uid32 = uid32()
            clients.set(new_uid32, 1)        
            socket.emit('uid32', new_uid32)
            
        } else {
            socket.emit('uid32', _uid32)
        }
    })    
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