const http = require('https')
const app = require('./app')
const fs = require('fs')

const port = 3000

const server = http.createServer({
    /*https://www.geeksforgeeks.org/node-js-fs-readfilesync-method/
    The readFileSync reads the privatekey and certificate files synchronously, GeeksforGeeks (2021) explains.*/
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
}, app)

server.listen(port)