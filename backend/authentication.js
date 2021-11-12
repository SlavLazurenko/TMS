const bcrypt = require('bcrypt')

/**
 * Classes related to security
 * @namespace Security
 */

/**
 * Class used by Logic classes to authenticate incoming requests
 * @memberof Security 
 */
class Authentication{

    constructor() {
        this.users = []
    }
    
    /**
     * Save user account data
     * @param {Object} username unique identifier of a user
     * @param {Object} password password used to login into account
     * @returns {string} unique user token
     */
    async storeCredentials(username, password){
        try{
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = {name: req.body.name, password: hashedPassword}
            users.push(user)
            res.status(201).send()
        } catch {
            res.status(500).send()
        }
        console.log('The user credentials')
        return 
    }

    /**
     * Validates account information provided by the user
     * @param {Object} username username provided by the user
     * @param {Object} password password provided by the user
     * @returns {string|undefined} unique user token if credentials are valid, null otherwise
     */
    async validateCredentials(username,password){
        const user = users.find(user => user.name = req.body.name)
        if(user == null) {
           return res.status(400).send('Cannot find user')
        }
        try{
            if(await bcrypt.compare(req.body.password, user.password)){
            res.send('Success')
         }else{
           res.send('Not Allowed')
         }
         }catch{
            res.status(500).send()
         }
        console.log('Validation of user credentials')
        return 
    }

    /**
     * Generates unique user token from user data
     * @private
     * @param {Object} userData data about the user that will be stored inside token
     * @returns {string} unique token which can be used to quickly authenticate
     */
    generateToken(userData) {
        console.log('Generates the user token')
        return 
    }

    /**
     * Extract user information form token
     * @param {Object} token token provided by the user
     * @returns {Object|undefined} user data if token is valid, null otherwise
     */
    validateToken(token) {
        console.log('Validates the user token')
        return
    }
}

module.exports= Authentication;
