const cors=require('cors');
const mysql = require('mssql');
const dboperation=require('./dboperation.js');

const config=require('./dbconfig.js');

async function getUserData() {
   try {
       let pool = await mysql.connect(config);
       let userDetails = await pool.request().query("SELECT * from [UserData]");
       return userDetails.recordsets;
   }
   catch (error) {
       console.log(error);
   }
}
async function addUserData(UserData) {
   try {       
       let pool = await mysql.connect(config);
       let insertUserData = await pool.request()
           .input('UserName', mysql.NVarChar, UserData.UserName)
           .input('Email', mysql.NVarChar, UserData.Email)
           .input('ProfilePictureUrl', mysql.NVarChar, UserData.ProfilePictureUrl)
           .input('Password', mysql.NVarChar, UserData.Password)
           .execute('InsertUser');
           console.log("db record status"+JSON.stringify(insertUserData))
       return insertUserData.returnValue;
   }
   catch (err) {
       console.log(err);
   }

}
module.exports={
   getUserData: getUserData,
   addUserData:addUserData
}