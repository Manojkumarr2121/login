const server = require("express")();
const mongoose = require("mongoose");
const bodyParser=require('body-parser');
const config=require("./../config/config.json")
const userController = require('./../controller/user');
const cors = require('cors');
server.use(bodyParser.json());
server.use(cors());
server.use("/", (req, res, next) => {
	let { protocal, host, port, name } = config.app.db;
	mongoose.connect(`${protocal}${host}:${port}/${name}`, { useNewUrlParser: true, useUnifiedTopology: true });
	next();
});

server.use("/contact", async(req, res, next) => {
	console.log(req.headers.authorization);
	if(!req.headers.authorization){
	return res.send({
			status:"token error",
			msg:'invalid Token'
		})
		
	}

	await userController.validateToken(res,req.headers.authorization);
	next();
});
module.exports= server;
