import express from "express"
import dotenv from "dotenv"
import { initApp } from "./src/app.router.js";
// import moment from "moment";
dotenv.config();
// moment().format();
const app = express()
const port = 5001;


initApp(app,express);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`));