var r = require('rethinkdb')
var rethinkdbClient = {}
rethinkdbClient.connect = ()=> r.connect()
module.exports = rethinkdbClient
