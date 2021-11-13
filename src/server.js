import app from "./init.js"

const PORT = 4000;

const handleListening = () =>{
    console.log(`Access to ${PORT} port`);
}
app.listen(PORT, handleListening)