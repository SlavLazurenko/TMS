const bcrypt = require('bcrypt')
const datastore = require('./datastore')
const jwt = require('jsonwebtoken')
require('dotenv').config();

/**
 * Class used by Logic classes to authenticate incoming requests
 * @memberof Security 
 */
class Authentication{
    
    /**
     * Save user account data
     * @param {Object} username unique identifier of a user
     * @param {Object} password password used to login into account
     * @returns {string} unique user token
     */
    static async storeCredentials(username, password){
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
     * Validates account information provided by the user
     * @param {Object} username username provided by the user
     * @param {Object} password password provided by the user
     * @returns {string|undefined} unique user token if credentials are valid, null otherwise
     */

    static async validateCredentials(username,password){
        try{
            const user = await datastore.account.findByUsername(username)
            if(user != null) {
                let temp = await bcrypt.compare(password, user.password)
               if(temp){
                    return Authentication.generateToken({
                        username: username
                      })
               }     
            }
            return false;
        } 
         catch(e){
             
           return false;
         }
       
    }

    /**
     * Generates unique user token from user data
     * @private
     * @param {Object} userData data about the user that will be stored inside token
     * @returns {string} unique token which can be used to quickly authenticate
     */
    static generateToken(userData){
        return jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET)
    }

    /**
     * Extract user information form token
     * @param {Object} token token provided by the user
     * @returns {Object|undefined} user data if token is valid, null otherwise
     */
    static validateToken(token){
        let userName
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userData) => {
            if (err){
                userName = false
            }
            else{
                userName = userData
            } 
          })
          return userName;
    }
}

module.exports = Authentication;
