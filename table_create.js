var r = require('rethinkdb')
var client = require('./rethinkdb_client')
if(process.argv.length == 3)  {
  client.connect().then((conn)=>{
      r.db('test').tableCreate(process.argv[2]).run(conn,(err,res)=>{
          if(err == null) {
              console.log(res)
              conn.close()
          }
          else {
              console.log(res)
          }
      })
    }).catch((err)=>{
        console.log(err)
    })
}
