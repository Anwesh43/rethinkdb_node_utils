var r = require('rethinkdb')
var q = require('q')
var fetchUtil = {}

module.exports = (conn) => {
    fetchUtil.runOnConnection = function(query) {
        var defer = q.defer()
        query.run(conn,function(err,cursor){
            if(err == null) {
                defer.resolve(cursor)
            }
            else {
                defer.reject(err)
            }
        })
        return defer.promise
    }
    fetchUtil.runQuery = function(query) {
        var defer = q.defer()
        this.runOnConnection(query).then((cursor)=>{
            cursor.toArray((err,result)=>{
                if(err == null) {
                    defer.resolve(result)
                }
                else {
                    defer.reject(err)
                }
            })
        }).catch(function(err){
            defer.reject(err)
        })
        return defer.promise
    }
    fetchUtil.getAll = function(table){
        var defer = q.defer()
        this.runQuery(r.table(table)).then((result)=>{
            defer.resolve(result)
        }).catch((err)=>{
            defer.reject(err)
        })
        return defer.promise
    }
    fetchUtil.getFilteredResult = function(table,column,value) {
        var defer = q.defer()
        this.runQuery(r.table(table).filter(r.row(column).eq(value))).then((result)=>{
           defer.resolve(result)
        }).catch((err)=>{
            defer.reject(err)
        })
        return defer.promise
    }
    return fetchUtil
}
