var client = require('./rethinkdb_client')
var fetchUtil = require('./table_fetch_util')
var arguments = process.argv
if(arguments.length == 5)
client.connect().then((conn)=>{
    fetchUtil(conn).getFilteredResult(arguments[2],arguments[3],arguments[4]).then((result)=>{
        console.log(result)
        conn.close()
    }).catch((err)=>{
        console.log(err)
        conn.close()
    })
}).catch((err)=>{
    console.log(err)

})
