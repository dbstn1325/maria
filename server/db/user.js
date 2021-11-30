import mysql from "mysql";
import "dotenv/config";
import MySQLStore from "express-mysql-session";


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'user_database'
})
export const sessionStore = new MySQLStore(db);

db.connect((err)=> {
    if(err) {
        console.log(err.message);
    }
    console.log('DB ' + db.state);
});

// class DbService {
//     static getDbServiceInstance() {
//         return instance ? instance : new DbService();
//     }
// }

export default db;