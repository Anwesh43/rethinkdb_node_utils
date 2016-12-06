var arguments = process.argv
var argLen = arguments.length
var fs = require('fs')

var client = require('./rethinkdb_client')
var insertUtil = require('./insert_util')
if(argLen == 4) {
    var rs = fs.createReadStream(arguments[argLen-1])
    var msg = ""
    rs.on('data',(data)=>{
        msg = msg+data.toString()
    })
    rs.on('end',()=>{
        var insertData = JSON.parse(msg)
        client.connect().then((conn)=>{
            insertUtil(conn,arguments[argLen-2],insertData).then((data)=>{
                console.log(data)
                conn.close()
            }).catch((err)=>{
                console.log(err)
            })
        })
    })
}
