import mariadb from "mariadb";
import "dotenv/config";




export const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    connectionLimit: 5
})

const GetUserList = async() => {
    let conn, rows;
    try{
        conn = await pool.getConnection();
        conn.query('USE nodejs_test');
        rows = await conn.query('SELECT * FROM users');
    }catch(err){
        if (err.code === 'PROTOCOL_CONNECTION-LOST'){
            console.error('Database connetion lost');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Database has too many connection');
        }
        if (err.code === 'ENCONNREFUSED'){
            console.error('Database connection was refused');
        }
    }
    finally{
        if (conn) conn.end();
        return rows[0];
    }
}

export { GetUserList as getUserList };