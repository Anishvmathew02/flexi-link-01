// var db=require('../../config/connection')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const gymownerSchema = new Schema({
    email : String,
    username : String,
    password : String

  });

const gymowner= mongoose.model('owner', gymownerSchema);

function register(userData){
    console.log(userData)
    return new Promise(async(resolve,reject)=>{
        
        userData.password=await bcrypt.hash(userData.password,10)
        const newowner = new gymowner();
        newowner.email=userData.email;
        newowner.username=userData.username;
        newowner.password=userData.password;
        newowner.save();
        resolve(newowner);
    })

}

function login(userdata){
    return new Promise(async(resolve,reject)=>{
        let response={};
        const eml=userdata.email;
        const psd=userdata.password;
        const filter={email:eml}
        const val=await gymowner.findOne(filter).exec();
        if(val){

            bcrypt.compare(psd, val.password, function(err, result) {
                if(result){
                    //console.log(val)
                    response.val=val;
                    response.status=true;
                    resolve(response)
                }else{
                    console.log("wrong password");
                    resolve({status:false})
                }
            });
        }
        else{
           //console.log("seen");
           resolve({status:false})
        }
    }
    )

   

    // async function fnd(){
    //     const filter={email:eml}
    //     const val=await user.findOne(filter).exec();
    //     if(val){

    //         bcrypt.compare(psd, val.password, function(err, result) {
    //             if(result){
    //                 console.log("success");
    //             }else{
    //                 console.log("wrong password");
    //             }
    //         });
    //     }
    //     else{
    //        console.log("seen");
    //     }
    // }

    // fnd();
}

module.exports = {
    register,
    login
}
  