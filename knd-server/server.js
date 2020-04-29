const http = require('http')
const fs   = require('fs'  )

const port = 80
const addr = '0.0.0.0'

const server = http.createServer((req, res) => {
    fs.readFile('../knd-client/index.html', (err, out) => {
        if(err)
            console.log(err)
        else {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(out)
            res.end()
        }
    })
})

server.listen(port, addr, () => {

})