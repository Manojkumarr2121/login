const userModel=require("./../model/user");
const errorHandler=require("./../util/error.handler");
const { Aggregate } = require("mongoose");


class UserController{

constructor(){}

async register(username,password){
                
    try{
    let userInfo=await userModel.create({username:username,password:password});
    return{
        status:"sucess",
        msg:'User Created',
        result:userInfo 
    };
    }catch(error)
    {
    console.log(error);
    return{
        status:"error",
        error:errorHandler.parseMongoError(error)
        };
      }
} 

async login(username,password){
                
    try{
    let userInfo=await userModel.findOne({username:username,password:password});

    if(!userInfo){
        throw new error('invalid creditional');
    }
        let token=this.createToken();
        this.saveToken(userInfo._id,token);
    return{
        status:"sucess",
        msg:'sucessfully login',
        result:userInfo, 
       token
    };
    }catch(error)
    {
    console.log(error);
    return{
        status:"error",
        msg:'username/password invalid',
        error:errorHandler.parseMongoError(error)
        };
      }
} 

async saveToken(id,token){
    try{
        await userModel.update({_id:id},{token:token});
        return{
            status:"sucess",
        };
        }catch(error)
        {
        console.log(error);
        return{
            status:"token error",
            error:errorHandler.parseMongoError(error)
            };
          }
}


createToken(){
    let tmestapm=new Date().getTime()+'';
    return require('crypto').createHash('md5').update(tmestapm).digest('hex')
}


async validateToken(res,token){
    try{
      let user= await userModel.findOne({token:token});

      if(!user){
        throw new error('invalid token');
    }
        global.userSession=user;
        }catch(error)
        {
        console.log(error);
        res.send({
            status:"token error",
            error:errorHandler.parseMongoError(error)
            });
          }
}

}


module.exports=new UserController();