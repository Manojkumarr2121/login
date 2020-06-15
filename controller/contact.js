const contactModel=require("./../model/contact");
const errorHandler=require("./../util/error.handler");
const { Aggregate } = require("mongoose");


class ContactController {

     async add(users){
           users={...users,...{userId:userSession._id}}     
          try{
          let userInfo=await contactModel.create(users);
          return{
              status:"sucess",
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

    async update(id,update){
                
        try{
        let userInfo=await contactModel.update({_id:id,userId:userSession._id},update);
        return{
            status:"sucess",
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
  async fetch(){
  try{
    let userInfo=await contactModel.find({userId:userSession._id});
    return{
        status:"sucess",
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

async delete(id){        
    try{
    let userInfo=await contactModel.deleteOne({_id:id});
    return{
        status:"sucess",
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

async aggregation(){
    try{
// return await userModel.count([{

//         $match:{
//       city:"salam"
//     }
// },
//     {
//     $group:{
//         _id:'$city',
//         count:{$sum:1}
//     }
// }
// ])
//let result= await userModel.count({city:'tirupur'});

let result= await contactModel.distinct('city');
return {result:result};
    }catch{
        return{
            status:"error",
            error:errorHandler.parseMongoError(error)
            }
    }
}

}

       

module.exports=new ContactController();