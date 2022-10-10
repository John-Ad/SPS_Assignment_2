"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
//-------------------------------
//      SETUP ACCESS CONTROL
//-------------------------------
app.use(function (inRequest, inResponse, inNext) {
    inResponse.header("Access-Control-Allow-Origin", "*"); //allows requests from any domain
    inResponse.header("Access-Control-Allow-Methods", "GET,POST"); //allows these methods
    inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization"); //allows these headers
    inNext();
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
//-------------------------------
//      TEST ENDPOINT     
//-------------------------------
app.get("/test", (req, res) => {
    res.send("hello world");
});
//-------------------------------
//      EXPORT SERVER     
//-------------------------------
exports.default = app;
//# sourceMappingURL=server.js.map