const express=require('express');
const server=express();
const middleware=require('./middleware/middleware')


const contactRoute=require('./router/contact');
const userRoute=require('./router/user');

const config=require('./config/config.json');
server.use(middleware);
server.use('/contact',contactRoute); 
server.use('/user',userRoute); 


server.listen(config.app.port, () => {
	console.log(`Service is listening to ${config.app.port}`);
});