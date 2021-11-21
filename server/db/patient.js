import mysql from "mysql";
import "dotenv/config";


const connect = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'patient_db',
    dateStrings: 'date'
})


connect.connect((err)=> {
    if(err){
        console.log(err.message);
    }
    console.log('PATIENT_DB ' + connect.state);
})

export default connect;