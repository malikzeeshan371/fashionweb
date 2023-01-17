const mysql = require ("mysql");
 

const pool = mysql.createPool({
    host:"sql.freedb.tech",
    user:"freedb_fashion user",
    password:"S#zhfT2WttuVd3z",
    database:"freedb_fashion website"
});

pool.getConnection((err,conn)=>{
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('DATABASE_CONNECTION_WAS_CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERRORS') {
            console.log('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED') {
            console.log('DATABASE CONNECTION WAS REFUSED');
        }
    }
    
    if (conn) conn.release();
    console.log('DB is Connected');
    return;
})

module.exports = pool; 