var client = require('./rethinkdb_client')
if(process.argv.length == 3) {
    client.connect().then((conn)=>{
        var tableFetchUtil = require('./table_fetch_util')(conn)
        tableFetchUtil.getAll(process.argv[2]).then((result)=>{
            console.log(result)
            conn.close()
        }).catch((err)=>{

            if(err.message != undefined) {
                console.log(err.message)
            }
            else {
                console.log(err)
            }
            conn.close()
        })
    }).catch((err)=>{
        console.log(err)
        conn.close()
    })
}
