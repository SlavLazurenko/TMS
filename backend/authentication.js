const bcrypt = require('bcrypt')
const datastore = require('./datastore')
const jwt = require('jsonwebtoken')
require('dotenv').config();
/**
 * @memberof DataStore 
 */
class Authentication{

    constructor(){
        this.users = []
    }
    
    
    /**
     * 
     * @param {Object} username 
     * @param {Object} password 
     * @returns information of the user account
     */
    async storeCredentials(username, password){
        try{
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = {username: username, password: hashedPassword}
           await datastore.account.add(user)
           return true;
          }catch{
            return false;
          }
    }
    /**
     * 
     * @param {Object} username 
     * @param {Object} password 
     * @returns the user if found or send a message otherwise 
     */
    async validateCredentials(username,password){
        try{
            const user = await datastore.account.findByUsername(username)
            if(user != null) {
               if(await bcrypt.compare(password, user.password)){
                    return this.generateToken({
                        username: username
                      })
               }     
            }
            return false;
        } 
         catch{
           return false;
         }
       
    }
    /**
     * 
     * @param {Object} userData the information of the user
     * @returns all the information
     */
    generateToken(userData){
        return jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET)
    }
    /**
     * 
     * @param {Object} token the user object
     * @returns the information 
     */
    validateToken(token){
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userData) => {
            if (err) return false
            return userData
          })
    }
}

module.exports = new Authentication();








