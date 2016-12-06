var r = require('rethinkdb')
var q = require('q')
module.exports = (conn,table,data) => {
    var defer = q.defer()
    r.table(table).insert(data).run(conn,(err,data)=>{
        if(err == null) {
            defer.resolve(data)
        }
        else {
            defer.reject(err)
        }
    })
    return defer.promise
}
