import express from 'express';
import { Express, Request, Response, NextFunction } from 'express';

const app: Express = express();


//-------------------------------
//      SETUP ACCESS CONTROL
//-------------------------------

app.use(function (inRequest: Request, inResponse: Response, inNext: NextFunction) {
    inResponse.header("Access-Control-Allow-Origin", "*");      //allows requests from any domain
    inResponse.header("Access-Control-Allow-Methods", "GET,POST");   //allows these methods
    inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");   //allows these headers
    inNext();
});

app.use(express.json());
app.use(express.urlencoded());


//-------------------------------
//      TEST ENDPOINT     
//-------------------------------
app.get("/test", (req, res) => {
    res.send("hello world");
});


//-------------------------------
//      EXPORT SERVER     
//-------------------------------
export default app;