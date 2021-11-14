import * as mdbConn from "../mariaDBConn";
import "dotenv/config";
import app from "./server.js"


mdbConn.getUserList()
    .then((rows)=> {
        console.log(rows);
    })
    .catch((errMsg)=> {
        console.log(errMsg);
    });

const PORT = process.env.PORT || 4000 ;
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})